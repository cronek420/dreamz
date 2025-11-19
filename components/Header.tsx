import React from 'react';
import { User } from '../types';
import { isProOrTrialActive } from '../App';
import { StarIcon } from './icons/ActionIcons';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onUpgradeClick: () => void;
}

const getTrialDaysLeft = (trialEndDate?: string): number | null => {
    if (!trialEndDate) return null;
    const end = new Date(trialEndDate).getTime();
    const now = new Date().getTime();
    const timeLeft = end - now;
    if (timeLeft <= 0) return 0;
    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
};


const Header: React.FC<HeaderProps> = ({ user, onLogout, onUpgradeClick }) => {
  if (!user) return null;

  const isPro = isProOrTrialActive(user);
  const trialDaysLeft = getTrialDaysLeft(user.trialEndDate);

  const renderPlanStatus = () => {
    if (isPro) {
        if (user.plan === 'pro') {
             return <span className="px-2 py-1 bg-gradient-to-r from-[#FFD86B] to-[#ffb800] text-black text-xs font-bold rounded-full">PRO</span>;
        }
        if (trialDaysLeft !== null && trialDaysLeft > 0) {
            return <span className="text-xs text-[#FFD86B] font-semibold">{trialDaysLeft} days of Pro left</span>;
        }
    }
    return (
      <button 
        onClick={onUpgradeClick}
        className="flex items-center gap-1 px-3 py-1.5 bg-[#FFD86B]/20 text-[#FFD86B] rounded-md hover:bg-[#FFD86B]/40 transition-colors font-semibold"
      >
        <StarIcon className="w-4 h-4" />
        Start Free Trial
      </button>
    );
  };
  
  return (
    <header className="container mx-auto px-4 max-w-2xl py-6 flex items-center justify-between">
       <h2 className="text-3xl font-bold text-white">Dream Journal</h2>
       <div className="text-right text-xs">
          <div className="flex items-center justify-end gap-2">
            <p className="text-gray-400">{user.email}</p>
            {renderPlanStatus()}
          </div>
          <button 
            onClick={onLogout}
            className="mt-2 px-3 py-1.5 bg-[#6C63FF]/20 rounded-md hover:bg-[#6C63FF]/40 transition-colors font-semibold"
          >
            Log Out
          </button>
        </div>
    </header>
  );
};

export default Header;