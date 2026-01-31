
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const NemawashiSection: React.FC = () => {
  const [decision, setDecision] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateStrategy = async () => {
    if (!decision.trim()) return;
    setLoading(true);
    const result = await geminiService.planNemawashi(decision);
    setSteps(result);
    setLoading(false);
  };

  return (
    <div id="nemawashi" className="scroll-mt-12 space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-serif font-bold text-slate-800">Nemawashi (根回し)</h2>
        <p className="text-slate-500 mt-1">Laying the groundwork. Build consensus before making decisions.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Target Decision / Change</label>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="flex-1 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g., Proposing a new remote-work policy to the management..."
            />
            <button 
              onClick={generateStrategy}
              disabled={loading || !decision}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 disabled:opacity-50"
            >
              {loading ? 'Laying Groundwork...' : 'Generate Steps'}
            </button>
          </div>
        </div>

        {steps.length > 0 && (
          <div className="pt-6 border-t border-slate-50 animate-in slide-in-from-top duration-500">
            <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
              <span className="mr-2">🌱</span> Consensus-Building Strategy
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NemawashiSection;
