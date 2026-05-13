import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/Layout/DashboardLayout';

// Lazy load pages for better performance
const Overview = React.lazy(() => import('./pages/Overview'));
const Admissions = React.lazy(() => import('./pages/Admissions'));
const Courses = React.lazy(() => import('./pages/Courses'));
const Attendance = React.lazy(() => import('./pages/Attendance'));
const Library = React.lazy(() => import('./pages/Library'));
const Hostel = React.lazy(() => import('./pages/Hostel'));
const Alumni = React.lazy(() => import('./pages/Alumni'));
const Events = React.lazy(() => import('./pages/Events'));
const Forums = React.lazy(() => import('./pages/Forums'));
const Performance = React.lazy(() => import('./pages/Performance'));
const Profile = React.lazy(() => import('./pages/Profile'));
import RootContainer from './components/RootContainer';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<RootContainer />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/library" element={<Library />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/events" element={<Events />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
