import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield, Save } from 'lucide-react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Profile() {
  const { profile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    department: profile?.department || ''
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', profile.uid);
      await updateDoc(userRef, { 
        name: formData.name,
        department: formData.department,
        updatedAt: serverTimestamp()
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile. Please check permissions.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Institutional Profile</h1>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">SBM School Identity Management</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6 text-center shadow-sm">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
                {profile?.profileImageUrl ? (
                   <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-slate-300">{profile?.name?.charAt(0)}</span>
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 p-1.5 bg-primary text-white rounded shadow-md border-2 border-white">
                <Save size={12} />
              </button>
            </div>
            <h2 className="text-sm font-bold text-slate-800">{profile?.name}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{profile?.role}</p>
          </div>

          <div className="bg-slate-900 rounded-lg p-5 text-white">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-4">Account Metadata</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[9px] text-slate-500 font-bold uppercase">System ID</div>
                <div className="text-xs font-mono text-slate-300 truncate">{profile?.uid}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500 font-bold uppercase">Network Status</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold">Secure Connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="col-span-12 lg:col-span-8 bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="label-xs">Full Registry Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="label-xs">Educational Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="email" 
                  readOnly 
                  value={profile?.email || ''} 
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded text-xs text-slate-400 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="label-xs">Assigned Department</label>
              <input 
                type="text" 
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Enter department name"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="label-xs">System Authority</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="text" 
                  readOnly 
                  value={profile?.role || ''} 
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded text-xs text-slate-400 focus:outline-none cursor-not-allowed uppercase font-bold tracking-wider"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <Save size={12} />
              {isSaving ? 'Synchronizing...' : 'Update System Registry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
