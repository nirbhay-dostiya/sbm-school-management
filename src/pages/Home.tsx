import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, ShieldCheck, Zap, Laptop, Clock, Library } from 'lucide-react';

export default function Home() {
  const { signIn } = useAuth();

  return (
    <div className="min-h-screen bg-background text-slate-800 font-sans selection:bg-primary/20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white shadow-sm">
              <GraduationCap size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">SBM School</span>
          </div>
          <button 
            onClick={signIn}
            className="px-5 py-1.5 bg-primary text-white rounded text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-[0.2em] mb-6 inline-block">
              Institutional Intelligence
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Next-Generation <br />
              <span className="text-primary">SBM School Administration</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              A high-density operational platform for modern universities. 
              Streamline admissions, academics, and campus life with real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                onClick={signIn}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                Launch Unified Portal <ArrowRight size={16} />
              </button>
              <button className="w-full sm:w-auto px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded font-bold text-sm uppercase tracking-wider hover:bg-slate-50 transition-all">
                System Specs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Admissions", desc: "Automated verification and smart enrollment processing." },
              { icon: Zap, title: "Live Activity", desc: "Real-time presence and campus event monitoring via IoT integration." },
              { icon: Laptop, title: "Online Forums", desc: "Collaborative learning environments and project sync tools." },
              { icon: GraduationCap, title: "Performance", desc: "Deep-layer GPA analytics and predictive academic forecasting." },
              { icon: Clock, title: "Scheduling", desc: "Resource-aware timetabling with zero-conflict logic." },
              { icon: Library, title: "Inventory", desc: "Asset tracking for library, hostel, and campus facilities." }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
              >
                <div className="w-10 h-10 bg-slate-50 rounded flex items-center justify-center text-slate-600 mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2026 SBM School Operational Systems.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Compliance</a>
            <a href="#" className="hover:text-primary">System Status</a>
            <a href="#" className="hover:text-primary">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
