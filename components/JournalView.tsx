import React from 'react';
import { Dream, ChatMessage } from '../types';
import DreamCard from './DreamCard';

interface JournalViewProps {
  dreams: Dream[];
  onAddChatMessage: (dreamId: string, message: ChatMessage) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ dreams, onAddChatMessage }) => {
  if (dreams.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-300">Your dream journal is empty.</p>
        <p className="text-md text-gray-400 mt-2">Tap the '+' button to log your first dream.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <h3 className="text-xl font-semibold text-gray-100 text-center">Recent Dreams</h3>
      {dreams.map((dream) => (
        <DreamCard key={dream.id} dream={dream} onAddChatMessage={onAddChatMessage} />
      ))}
    </div>
  );
};

export default JournalView;