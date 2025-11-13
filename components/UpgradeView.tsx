import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { CloseIcon, StarIcon } from './icons/ActionIcons';
import { User } from '../types';

interface UpgradeViewProps {
  onClose: () => void;
  onUpgrade: () => void;
  isLoading: boolean;
  user: User;
}

const UpgradeView: React.FC<UpgradeViewProps> = ({ onClose, onUpgrade, isLoading, user }) => {
  const hasUsedTrial = !!user.trialEndDate; // Check if they've ever had a trial

  const features = [
    "Unlimited dream entries",
    "Advanced insight reports (30-day & all-time)",
    "HD quality for generated dream art",
    "Export your entire dream journal (coming soon)",
    "Priority support",
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0B0C10] border border-[#FFD86B]/30 rounded-2xl p-6 w-full max-w-md relative shadow-2xl shadow-[#FFD86B]/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors">
          <CloseIcon className="h-6 w-6" />
        </button>
        <div className="text-center">
            <StarIcon className="w-12 h-12 text-[#FFD86B] mx-auto mb-2"/>
            <h2 className="text-2xl font-bold text-white">
            {hasUsedTrial ? "Upgrade to DreamWeaver Pro" : "Unlock DreamWeaver Pro"}
            </h2>
            <p className="text-gray-400 mt-2">
            Go beyond the surface and unlock the full potential of your subconscious mind.
            </p>
        </div>

        <ul className="mt-6 space-y-3">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-[#FFD86B]/20 flex items-center justify-center">
                       <StarIcon className="w-3 h-3 text-[#FFD86B]"/>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>

        <div className="mt-8">
            <button
                onClick={onUpgrade}
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-[#FFD86B] via-[#ffc94a] to-[#ffb800] text-black font-bold rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity text-lg"
            >
                {isLoading ? <LoadingSpinner /> : (hasUsedTrial ? "Subscribe Now" : "Start Your 30-Day Free Trial")}
            </button>
            <p className="text-xs text-center text-gray-500 mt-3">
                {hasUsedTrial
                    ? "Plans start at $4.99/month. Cancel anytime."
                    : "After 30 days, subscribe for $4.99/month to keep Pro features. Cancel anytime."}
            </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeView;
