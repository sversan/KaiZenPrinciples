
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { IkigaiData } from '../types';

const IkigaiSection: React.FC = () => {
  const [data, setData] = useState<IkigaiData>({
    love: [],
    goodAt: [],
    worldNeeds: [],
    paidFor: []
  });
  const [inputs, setInputs] = useState({ love: '', goodAt: '', worldNeeds: '', paidFor: '' });
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addItem = (key: keyof IkigaiData) => {
    if (!inputs[key]) return;
    setData(prev => ({ ...prev, [key]: [...prev[key], inputs[key]] }));
    setInputs(prev => ({ ...prev, [key]: '' }));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await geminiService.analyzeIkigai(data);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div id="ikigai" className="scroll-mt-12 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-slate-800">Your Ikigai (生き甲斐)</h2>
        <p className="text-slate-500 mt-2">Find your reason for being by exploring the intersection of four pillars.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'love', label: 'What You Love', color: 'bg-rose-50 border-rose-100 text-rose-700', icon: '❤️' },
          { key: 'goodAt', label: 'What You are Good At', color: 'bg-blue-50 border-blue-100 text-blue-700', icon: '⭐' },
          { key: 'worldNeeds', label: 'What the World Needs', color: 'bg-emerald-50 border-emerald-100 text-emerald-700', icon: '🌍' },
          { key: 'paidFor', label: 'What You Can be Paid For', color: 'bg-amber-50 border-amber-100 text-amber-700', icon: '💰' },
        ].map((item) => (
          <div key={item.key} className={`p-6 rounded-3xl border-2 ${item.color}`}>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl">{item.icon}</span>
              <h3 className="font-bold uppercase tracking-wider text-sm">{item.label}</h3>
            </div>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={inputs[item.key as keyof IkigaiData]}
                onChange={(e) => setInputs(prev => ({ ...prev, [item.key]: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && addItem(item.key as keyof IkigaiData)}
                placeholder="Add item..."
                className="flex-1 bg-white/50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-current outline-none"
              />
              <button 
                onClick={() => addItem(item.key as keyof IkigaiData)}
                className="bg-white rounded-xl px-4 py-2 shadow-sm font-bold text-lg hover:bg-slate-50"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data[item.key as keyof IkigaiData].map((val, idx) => (
                <span key={idx} className="bg-white/80 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  {val}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-12 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-200"
        >
          {loading ? 'Consulting the Zen Master...' : 'Discover My Ikigai'}
        </button>
      </div>

      {analysis && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl animate-in slide-in-from-bottom duration-500">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">💡</span> Analysis & Suggestions
          </h3>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default IkigaiSection;
