
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const KaizenSection: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLog = () => {
    if (!input.trim()) return;
    setLog([input, ...log]);
    setInput('');
  };

  const getSuggestion = async () => {
    setLoading(true);
    const s = await geminiService.suggestKaizen(log);
    setSuggestion(s);
    setLoading(false);
  };

  return (
    <div id="kaizen" className="scroll-mt-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Kaizen (改善)</h2>
          <p className="text-slate-500 mt-1">Small, continuous improvements lead to greatness.</p>
        </div>
        <button 
          onClick={getSuggestion}
          disabled={loading}
          className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors"
        >
          {loading ? 'Thinking...' : '✨ Get AI Suggestion'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            placeholder="What 1% improvement did you make today?"
          />
          <button 
            onClick={handleLog}
            className="mt-4 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            Log Small Win
          </button>
        </div>

        <div className="space-y-4">
          {suggestion && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-sm text-amber-900 italic">
              " {suggestion} "
            </div>
          )}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[200px] overflow-y-auto">
            <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4">Improvement Log</h4>
            <div className="space-y-3">
              {log.length === 0 ? (
                <p className="text-slate-400 text-xs italic">No entries yet. Start small.</p>
              ) : (
                log.map((entry, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <p className="text-slate-600">{entry}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaizenSection;
