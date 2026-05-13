import React from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Search, Plus } from 'lucide-react';

const mockPosts = [
  { id: '1', title: 'Study tips for Calculus Midterms?', author: 'Alex Chen', content: 'Anyone have good resources for multivariable calculus practice problems?', tags: ['Academic', 'Calculus'], likes: 12, comments: 5, date: '2h ago' },
  { id: '2', title: 'Internship Opportunity at Tech Corp', author: 'Career Services', content: 'Apply now for summer internships in software engineering and data science.', tags: ['Career', 'Opportunity'], likes: 45, comments: 8, date: '5h ago' },
  { id: '3', title: 'Hostel Night Event - Help Needed!', author: 'Student Council', content: 'We need volunteers for the upcoming cultural fest in the boys hostel block A.', tags: ['Events', 'Hostel'], likes: 28, comments: 14, date: '1d ago' },
];

export default function Forums() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Discussion Forums</h1>
          <p className="text-slate-500 mt-1">Connect, collaborate and share knowledge with peers.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Plus size={20} />
          New Thread
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search discussions..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="space-y-6">
        {mockPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                {post.author[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{post.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-slate-700">{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 mb-6 line-clamp-2">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                  <ThumbsUp size={18} />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                  <MessageCircle size={18} />
                  <span className="text-xs font-bold">{post.comments}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
