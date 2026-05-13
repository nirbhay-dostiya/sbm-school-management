import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Activity,
  UserCheck,
  ClipboardList
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const mockPerformanceData = [
  { name: 'Sem 1', gpa: 3.2 },
  { name: 'Sem 2', gpa: 3.5 },
  { name: 'Sem 3', gpa: 3.4 },
  { name: 'Sem 4', gpa: 3.8 },
  { name: 'Sem 5', gpa: 3.7 },
  { name: 'Sem 6', gpa: 3.9 },
];

const mockAttendanceData = [
  { day: 'Mon', rate: 95 },
  { day: 'Tue', rate: 88 },
  { day: 'Wed', rate: 92 },
  { day: 'Thu', rate: 85 },
  { day: 'Fri', rate: 98 },
];

export default function Overview() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const stats = [
    { label: 'Total Students', value: '2,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Courses Active', value: '48', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Faculty Members', value: '124', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Upcoming Events', value: '12', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const studentStats = [
    { label: 'GPA', value: '3.82', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Attendance', value: '94%', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-100' },
    { label: 'Credits Earned', value: '102', icon: TrendingUp, color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { label: 'Assignments', value: '4 Pending', icon: ClipboardList, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const displayStats = isAdmin ? stats : studentStats;

  return (
    <div className="space-y-5 pb-8 overflow-hidden">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col justify-between h-24"
          >
            <span className="label-xs">{stat.label}</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
              <div className={cn("p-1.5 rounded", stat.bg, stat.color)}>
                <stat.icon size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Analytics Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Performance Analytics</h3>
              <p className="text-[10px] text-slate-400">Student score progression across departments</p>
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 text-[10px] font-bold border border-slate-200 rounded uppercase">Weekly</button>
              <button className="px-2 py-1 text-[10px] font-bold bg-slate-100 border border-slate-200 rounded uppercase">Monthly</button>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    fontSize: '11px',
                    fontWeight: 600
                  }} 
                />
                <Bar dataKey="gpa" fill="#6366f1" radius={[2, 2, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-3 border-t border-slate-100 pt-4 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-800">8.4 GPA</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Campus Avg</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">12% Higher</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Vs Last Sem</div>
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-600">A+ Grade</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Department</div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-lg flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Live Activity Feed</h3>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">Real-time</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {[
              { type: 'class', title: 'James Miller', action: 'checked into', target: 'Library Central', time: '2m ago', id: '#4492', icon: '👤', color: 'bg-slate-100' },
              { type: 'submission', title: 'Sophia Chen', action: 'submitted', target: 'CS201 Assignment', time: '14m ago', id: 'Grade Pending', icon: '📄', color: 'bg-emerald-100 text-emerald-700' },
              { type: 'issue', title: 'Room 402B', action: 'reported', target: 'Hostel Maintenance', time: '1h ago', id: 'Block C', icon: '🏢', color: 'bg-amber-100 text-amber-700' },
              { type: 'admin', title: 'Admissions Desk', action: 'approved', target: '14 applications', time: '2h ago', id: 'Fall 2024', icon: '🎓', color: 'bg-blue-100 text-blue-700' },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-3">
                <div className={cn("w-8 h-8 rounded flex items-center justify-center text-xs shrink-0", activity.color)}>
                  {activity.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{activity.title} <span className="font-normal text-slate-500">{activity.action}</span> {activity.target}</div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{activity.time} • {activity.id}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center shrink-0">
            <button className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider hover:underline">View All Activity</button>
          </div>
        </div>

        {/* Calendar / Deadlines (Dark Row) */}
        <div className="col-span-12 bg-slate-900 rounded-lg p-5 flex flex-col md:flex-row gap-6 text-white h-auto md:h-32">
          <div className="w-full md:w-32 md:border-r border-slate-700 md:pr-6 shrink-0 flex flex-col justify-center">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 text-center md:text-left">Upcoming Events</div>
            <div className="text-3xl font-bold text-center md:text-left leading-none tracking-tighter mb-1">24</div>
            <div className="text-[11px] text-slate-400 font-bold uppercase text-center md:text-left">October 2026</div>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-slate-800 rounded p-3 flex flex-col justify-center border border-slate-700/50">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">In 2 Days</div>
              <div className="text-xs font-bold leading-tight">Mid-Term Assessment Phase</div>
              <div className="text-[9px] text-slate-400 mt-2 italic font-medium">Applied to All Depts</div>
            </div>
            <div className="flex-1 bg-slate-800 rounded p-3 flex flex-col justify-center border border-slate-700/50">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Oct 28</div>
              <div className="text-xs font-bold leading-tight">Annual Alumni Homecoming</div>
              <div className="text-[9px] text-slate-400 mt-2 italic font-medium">Main Hall, 6:00 PM</div>
            </div>
            <div className="flex-1 bg-indigo-600 rounded p-3 flex flex-col justify-center shadow-lg shadow-indigo-500/20">
              <div className="text-[9px] text-white/60 font-bold uppercase tracking-widest mb-1">Today</div>
              <div className="text-xs font-bold leading-tight text-white">Maintenance Shutdown</div>
              <div className="text-[9px] text-white/80 mt-2 italic font-medium text-white/80">Systems @ 11:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick fix for the missing icon import in the map
import { MessageSquare as MessageSquareIcon } from 'lucide-react';
