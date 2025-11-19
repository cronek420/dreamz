import React from 'react';
import { PlusIcon } from './icons/ActionIcons';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-5 h-16 w-16 bg-gradient-to-br from-[#6C63FF] to-[#FF00A0] rounded-full flex items-center justify-center shadow-lg shadow-[#6C63FF]/30 hover:scale-105 transition-transform duration-300 ease-in-out z-50"
      aria-label="Add new dream"
    >
      <PlusIcon className="h-8 w-8 text-white" />
    </button>
  );
};

export default FloatingActionButton;
