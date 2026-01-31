
import React, { useState } from 'react';

const ShinrinYokuSection: React.FC = () => {
  const [isBathing, setIsBathing] = useState(false);

  return (
    <div id="shinrin_yoku" className="scroll-mt-12 space-y-8 text-center">
      <div>
        <h2 className="text-3xl font-serif font-bold text-slate-800">Shinrin-yoku (森林浴)</h2>
        <p className="text-slate-500 mt-1">Forest bathing. Reconnect with nature to refresh your mind.</p>
      </div>

      <div className={`relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-1000 ${isBathing ? 'ring-[20px] ring-emerald-500/10' : ''}`}>
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200" 
          alt="Deep Forest" 
          className={`w-full h-full object-cover transition-transform duration-[30s] ease-linear ${isBathing ? 'scale-125' : 'scale-100'}`}
        />
        
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${isBathing ? 'bg-black/10' : 'bg-black/30'}`}>
          {!isBathing ? (
            <div className="max-w-md px-6">
              <h3 className="text-white text-3xl font-serif italic mb-6">Leave the digital noise behind.</h3>
              <button 
                onClick={() => setIsBathing(true)}
                className="px-10 py-4 bg-white text-emerald-900 rounded-full font-bold shadow-lg text-lg hover:scale-105 active:scale-95 transition-all"
              >
                Enter the Forest
              </button>
            </div>
          ) : (
            <div className="text-white animate-pulse text-center">
              <p className="text-4xl font-serif italic mb-4">Breathe in...</p>
              <p className="text-sm uppercase tracking-[0.4em] opacity-80 mb-12">Total relaxation active</p>
              <button 
                onClick={() => setIsBathing(false)}
                className="px-8 py-2 border border-white/30 hover:bg-white/10 rounded-full text-xs transition-colors"
              >
                Return to Sanctuary
              </button>
            </div>
          )}
        </div>
        
        {isBathing && (
          <div className="absolute top-8 right-8 flex space-x-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Ambient Mode</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShinrinYokuSection;
