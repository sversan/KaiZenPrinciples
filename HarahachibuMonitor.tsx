
import React, { useState } from 'react';

const HarahachibuMonitor: React.FC = () => {
  const [effort, setEffort] = useState(60);

  const getStatus = (val: number) => {
    if (val < 40) return { label: 'Replenishing', color: 'text-blue-600', advice: 'Take small steps to warm up.' };
    if (val < 75) return { label: 'Sustainable Flow', color: 'text-emerald-600', advice: 'You are in the sweet spot of effort.' };
    if (val < 85) return { label: 'Harahachibu Limit', color: 'text-amber-600', advice: 'Ideal balance. Do not exceed this to stay consistent.' };
    return { label: 'Risk of Burnout', color: 'text-rose-600', advice: 'Stop immediately. Balance effort with rest.' };
  };

  const status = getStatus(effort);

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-slate-800">Harahachibu (腹八分)</h2>
        <p className="text-slate-500 mt-2">Eat until 80% full, work until 80% exhausted. Consistency > Intensity.</p>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-12">
        <div className="text-center">
          <span className={`text-4xl font-bold ${status.color}`}>{effort}%</span>
          <p className={`text-xl font-serif mt-2 ${status.color}`}>{status.label}</p>
          <p className="text-slate-500 text-sm mt-4">{status.advice}</p>
        </div>

        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="100"
            value={effort}
            onChange={(e) => setEffort(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            <span>Rest</span>
            <span>80% Sweet Spot</span>
            <span>Burnout</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs mb-2">Rest Tokens</h4>
            <div className="flex space-x-1">
              {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-emerald-500 shadow-sm" />)}
              <div className="w-6 h-6 rounded-full bg-slate-200" />
              <div className="w-6 h-6 rounded-full bg-slate-200" />
            </div>
            <p className="text-[10px] text-slate-500 mt-2">3 of 5 used today</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs mb-2">Today's Balance</h4>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[60%]" />
            </div>
            <p className="text-[10px] text-slate-500 mt-2">6.5h worked / 1.5h rested</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarahachibuMonitor;
