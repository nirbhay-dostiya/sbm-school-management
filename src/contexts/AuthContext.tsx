import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  role: 'student' | 'faculty' | 'admin';
  department?: string;
  year?: number;
  profileImageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      
      try {
        const docRef = doc(db, 'users', firebaseUser.uid);
        let docSnap;
        try {
          docSnap = await getDoc(docRef);
        } catch (error) {
          console.error('Firestore Read Error:', error);
          throw error;
        }
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Create default student profile if not exists
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email || 'User',
            role: 'student',
            profileImageUrl: firebaseUser.photoURL || ''
          };
          
          try {
            await setDoc(docRef, {
              ...newProfile,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            setProfile(newProfile);
          } catch (error) {
            console.error('Firestore Create Error:', error);
            throw error;
          }
        }
      } catch (error) {
        // Detailed error reporting as per integration guidelines
        const errInfo = {
          error: error instanceof Error ? error.message : String(error),
          operationType: 'write',
          path: `users/${firebaseUser.uid}`,
          authInfo: {
            userId: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
          }
        };
        console.error('Detailed Firestore Error:', JSON.stringify(errInfo));
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
