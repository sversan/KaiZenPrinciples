
import React, { useEffect, useState } from 'react';
import { geminiService } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [quote, setQuote] = useState("Loading your daily wisdom...");

  useEffect(() => {
    const fetchQuote = async () => {
      const q = await geminiService.getDailyZenQuote();
      setQuote(q);
    };
    fetchQuote();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="relative h-64 rounded-3xl overflow-hidden bg-emerald-900 flex items-center px-12 text-white">
        <img 
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200" 
          alt="Zen Forest" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-serif italic mb-4 leading-tight">{quote}</h2>
          <p className="text-emerald-100/70 text-sm">— Focus on the path, not just the destination.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-emerald-600 mb-4 text-2xl">📈</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Kaizen Spirit</h3>
          <p className="text-slate-500 text-sm">You've logged 5 small improvements this week. You're 5% better than last week.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-amber-600 mb-4 text-2xl">🧘</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Shinrin-yoku</h3>
          <p className="text-slate-500 text-sm">Last nature break was 2 days ago. Maybe a walk in the park today?</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-rose-600 mb-4 text-2xl">🍱</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Harahachibu</h3>
          <p className="text-slate-500 text-sm">Work energy is at 70%. Remember to rest before you reach empty.</p>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Ready to find your flow?</h3>
          <p className="text-emerald-700 text-sm">Start a Pomodoro session and focus on one task at a time.</p>
        </div>
        <button className="mt-4 md:mt-0 px-8 py-3 bg-emerald-700 text-white rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-800 transition-colors">
          Begin Session
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
