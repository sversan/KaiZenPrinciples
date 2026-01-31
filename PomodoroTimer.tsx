
import React, { useState, useEffect, useCallback } from 'react';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  const switchMode = useCallback(() => {
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(5 * 60);
    } else {
      setMode('work');
      setTimeLeft(25 * 60);
    }
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      switchMode();
      // Browser notification or sound could be triggered here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, switchMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
      <div className="text-sm font-medium text-emerald-600 mb-4 uppercase tracking-widest">
        {mode === 'work' ? 'Focus Session' : 'Peaceful Break'}
      </div>
      <div className="text-8xl font-serif font-bold text-slate-800 mb-8 tabular-nums">
        {formatTime(timeLeft)}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-full font-semibold transition-all shadow-md active:scale-95 ${
            isActive ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {isActive ? 'Pause' : 'Start Focus'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-slate-100 text-slate-600 rounded-full font-semibold hover:bg-slate-200 transition-all active:scale-95"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-12 w-full max-w-sm">
        <h4 className="text-center text-slate-400 text-xs uppercase tracking-widest mb-6">Zen Atmosphere</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 rounded-2xl flex items-center space-x-3 cursor-pointer hover:bg-emerald-100 transition-colors">
            <span className="text-2xl">🌧️</span>
            <div>
              <p className="text-xs font-bold text-emerald-800">Soft Rain</p>
              <p className="text-[10px] text-emerald-600">Ambient loop</p>
            </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl flex items-center space-x-3 cursor-pointer hover:bg-amber-100 transition-colors">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-xs font-bold text-amber-800">Fireplace</p>
              <p className="text-[10px] text-amber-600">Warm crackle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
