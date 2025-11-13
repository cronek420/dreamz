import React from 'react';
import { ActiveTab } from '../types';
import { JournalIcon, InsightsIcon, CommunityIcon, ScribeIcon } from './icons/NavIcons';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: ActiveTab.Journal, label: 'Journal', icon: JournalIcon },
    { id: ActiveTab.Scribe, label: 'Scribe', icon: ScribeIcon },
    { id: ActiveTab.Insights, label: 'Insights', icon: InsightsIcon },
    { id: ActiveTab.Community, label: 'Community', icon: CommunityIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0B0C10]/80 backdrop-blur-sm border-t border-t-[#6C63FF]/20 flex justify-around items-center z-40 max-w-2xl mx-auto rounded-t-2xl">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 w-24 transition-all duration-300 ${
              isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            aria-label={item.label}
          >
            <item.icon className={`h-6 w-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
            <span className={`text-xs font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;