
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
}

const Navigation: React.FC<NavigationProps> = () => {
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'pomodoro', icon: '⏱️', label: 'Pomodoro' },
    { id: 'kaizen', icon: '🌱', label: 'Kaizen' },
    { id: 'ikigai', icon: '🎯', label: 'Ikigai' },
    { id: 'shinrin_yoku', icon: '🌲', label: 'Shinrin-yoku' },
    { id: 'harahachibu', icon: '⚖️', label: 'Harahachibu' },
    { id: 'nemawashi', icon: '🤝', label: 'Nemawashi' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 w-full md:w-64 bg-white border-r border-slate-200 h-screen flex flex-col p-4 z-50">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-serif font-bold text-emerald-800">ZenMind</h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Productivity Sanctuary</p>
      </div>
      <div className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-lg">
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Focus Mode</p>
          <p className="text-sm font-medium">All systems unified.</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
