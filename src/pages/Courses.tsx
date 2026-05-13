import React, { useState } from 'react';
import { Search, GraduationCap, Clock, Users, BookOpen } from 'lucide-react';

const mockCourses = [
  { id: '1', code: 'CS101', name: 'Introduction to Programming', faculty: 'Dr. Emily Smith', credits: 4, students: 120, time: 'Mon, Wed 10:00 AM' },
  { id: '2', code: 'MAT202', name: 'Linear Algebra', faculty: 'Prof. Michael Brown', credits: 3, students: 85, time: 'Tue, Thu 02:00 PM' },
  { id: '3', code: 'PHY105', name: 'Classical Mechanics', faculty: 'Dr. Sarah Wilson', credits: 4, students: 60, time: 'Fri 09:00 AM' },
  { id: '4', code: 'ART110', name: 'History of Modern Art', faculty: 'Prof. David Lee', credits: 2, students: 45, time: 'Wed 04:00 PM' },
  { id: '5', code: 'ECO301', name: 'Macroeconomics', faculty: 'Dr. Robert Garcia', credits: 3, students: 110, time: 'Tue, Thu 11:00 AM' },
];

export default function Courses() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Academic Courses</h1>
          <p className="text-slate-500 mt-1">Explore and manage available course listings.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, code or faculty..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCourses.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())).map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen size={24} />
              </div>
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full">{course.code}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{course.name}</h3>
            <p className="text-sm text-slate-500 mb-6">{course.faculty}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={16} />
                <span className="text-xs">{course.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users size={16} />
                <span className="text-xs">{course.students} Students</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-sm font-semibold text-slate-700">{course.credits} Credits</span>
              <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
