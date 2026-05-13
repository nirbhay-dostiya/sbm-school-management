import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  MapPin, 
  Users, 
  Calendar, 
  MessageSquare, 
  Library, 
  GraduationCap, 
  ClipboardCheck,
  UserCircle,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Admissions', href: '/admissions', icon: ClipboardCheck, roles: ['admin'] },
    { name: 'Courses', href: '/courses', icon: GraduationCap },
    { name: 'Attendance', href: '/attendance', icon: BookOpen },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'Hostel', href: '/hostel', icon: MapPin },
    { name: 'Alumni', href: '/alumni', icon: Users },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Forums', href: '/forums', icon: MessageSquare },
    { name: 'Performance', href: '/performance', icon: GraduationCap, roles: ['student', 'admin'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    !item.roles || (profile && item.roles.includes(profile.role))
  );

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-y-0 left-0 z-40 w-60 bg-sidebar text-slate-300 border-r border-slate-700/50 lg:static lg:block"
          >
            <div className="h-full flex flex-col">
              <div className="p-5 flex items-center gap-3 border-b border-slate-700/50">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
                  <GraduationCap size={18} />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">SBM School</span>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                <div className="label-xs px-3 pb-2 pt-2">Main Navigation</div>
                {filteredNavItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) => cn(
                      "sidebar-nav-item hover:text-white",
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-slate-400 hover:bg-slate-800"
                    )}
                  >
                    <item.icon size={16} />
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-700/50">
                <div className="flex items-center gap-3 mb-4 px-1">
                  <div className="w-8 h-8 rounded bg-indigo-400 shrink-0 overflow-hidden">
                    {profile?.profileImageUrl ? (
                      <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                        {profile?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{profile?.name}</p>
                    <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider">{profile?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-xs text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-500"
            >
              <Menu size={18} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campus Live System Online</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 relative transition-colors">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-sm">
              Generate Report
            </button>

            <NavLink 
              to="/profile"
              className="flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded bg-slate-100 overflow-hidden border border-slate-200 group-hover:border-primary transition-colors">
                {profile?.profileImageUrl ? (
                  <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <UserCircle size={14} />
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
