import React, { useState, useMemo } from 'react';
import { InsightsIcon } from './icons/NavIcons';
import { Dream } from '../types';
import { generateInsightReport } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { LockIcon } from './icons/ActionIcons';

interface InsightsViewProps {
  dreams: Dream[];
  isPro: boolean;
  onUpgradeClick: () => void;
}

type TimePeriod = '7' | '30' | 'all';

const InsightsView: React.FC<InsightsViewProps> = ({ dreams, isPro, onUpgradeClick }) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('7');
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzedDreams = useMemo(() => dreams.filter(d => d.analysis), [dreams]);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    const now = new Date();
    const filteredDreams = analyzedDreams.filter(dream => {
      if (timePeriod === 'all') return true;
      const dreamDate = new Date(dream.id);
      const daysAgo = (now.getTime() - dreamDate.getTime()) / (1000 * 3600 * 24);
      return daysAgo <= parseInt(timePeriod);
    });

    if (filteredDreams.length < 3) {
      setError(`You need at least 3 analyzed dreams in this period to generate a report. You have ${filteredDreams.length}.`);
      setIsLoading(false);
      return;
    }

    try {
      const generatedReport = await generateInsightReport(filteredDreams);
      setReport(generatedReport);
    } catch (e) {
      setError("Sorry, we couldn't generate your report. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const timePeriods: { id: TimePeriod; label: string; pro: boolean; }[] = [
    { id: '7', label: 'Last 7 Days', pro: false },
    { id: '30', label: 'Last 30 Days', pro: true },
    { id: 'all', label: 'All Time', pro: true },
  ];

  return (
    <div className="py-4 flex flex-col items-center">
      <InsightsIcon className="w-12 h-12 text-[#6C63FF] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Personalized Insight Report</h2>
      <p className="text-md text-gray-400 text-center mb-6">
        Let AI analyze your dream patterns over time to reveal deeper insights.
      </p>

      <div className="w-full max-w-md bg-[#1a1c2e]/50 border border-[#6C63FF]/20 rounded-xl p-6">
        <div className="mb-4">
          <p className="text-sm font-semibold text-center text-gray-300 mb-3">Select Time Period</p>
          <div className="flex justify-center bg-[#0B0C10] rounded-lg p-1">
            {timePeriods.map(({ id, label, pro }) => {
              const isLocked = pro && !isPro;
              return (
                <button
                  key={id}
                  onClick={() => {
                      if (isLocked) {
                          onUpgradeClick();
                      } else {
                          setTimePeriod(id)
                      }
                  }}
                  className={`relative w-full px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-300 flex items-center justify-center gap-1 ${
                    timePeriod === id && !isLocked ? 'bg-[#6C63FF] text-white' : 'text-gray-400 hover:bg-white/5'
                  } ${isLocked ? 'text-gray-500 cursor-pointer' : ''}`}
                >
                  {isLocked && <LockIcon className="w-3 h-3" />}
                  {label}
                </button>
            )})}
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isLoading || analyzedDreams.length === 0}
          className="w-full h-12 bg-gradient-to-r from-[#6C63FF] to-[#00FFF7] text-white font-bold rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isLoading ? <LoadingSpinner /> : 'Generate Report'}
        </button>
         {analyzedDreams.length === 0 && (
             <p className="text-xs text-center mt-2 text-gray-500">Log some dreams first to generate a report.</p>
         )}
      </div>

      {isLoading && (
        <div className="mt-8 text-center">
          <LoadingSpinner />
          <p className="mt-2 text-gray-400">Analyzing your subconscious patterns...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-8 w-full max-w-md p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-center">
          {error}
        </div>
      )}

      {report && !isLoading && (
        <div className="mt-8 w-full max-w-md p-6 bg-[#1a1c2e]/50 border border-[#6C63FF]/20 rounded-xl animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Your Insight Report</h3>
           <div 
             className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap"
             dangerouslySetInnerHTML={{ __html: report.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>').replace(/\n/g, '<br />').replace(/### (.*)/g, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>').replace(/## (.*)/g, '<h2 class="text-xl font-bold text-white mt-6 mb-3">$1</h2>').replace(/\* (.*)/g, '<li class="ml-4">$1</li>') }}
           >
           </div>
        </div>
      )}
    </div>
  );
};

export default InsightsView;