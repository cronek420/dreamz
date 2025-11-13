import React, { useState, useEffect, useCallback } from 'react';
import { getCommunityInsights, getGlobalDreamTrends } from '../services/geminiService';
import { GroundingChunk, Dream } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { CommunityIcon } from './icons/NavIcons';
import { GlobeIcon, EyeIcon, MoodIcon } from './icons/AppIcons';

interface CommunityViewProps {
  dreams: Dream[];
}

const CommunityView: React.FC<CommunityViewProps> = ({ dreams }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; groundingChunks: GroundingChunk[] } | null>(null);

  const [globalTrends, setGlobalTrends] = useState<string | null>(null);
  const [isTrendsLoading, setIsTrendsLoading] = useState(false);

  // Fetch proactive global trends on component mount
  useEffect(() => {
    const fetchGlobalTrends = async () => {
      // We need a few dreams to generate meaningful trends
      if (dreams.filter(d => d.analysis).length > 2) {
        setIsTrendsLoading(true);
        try {
          const trends = await getGlobalDreamTrends(dreams);
          setGlobalTrends(trends);
        } catch (e) {
          console.error("Failed to fetch global trends:", e);
          // Non-blocking error
        } finally {
          setIsTrendsLoading(false);
        }
      }
    };
    fetchGlobalTrends();
  }, [dreams]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      () => {
        setError("Geolocation is required to explore community dream trends. Please enable it in your browser settings.");
      }
    );
  }, []);

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || !location) return;

    setIsLoading(true);
    setResult(null);
    try {
      const insights = await getCommunityInsights(query, location);
      setResult(insights);
    } catch (err) {
      setError("Sorry, we couldn't fetch community insights. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [query, location]);
  
  useEffect(() => {
    if(location && !query) {
      setQuery('What are the most common dream themes near me?');
    }
  }, [location]);

  return (
    <div className="py-4 text-center">
       <div className="relative h-48 flex items-center justify-center">
        <GlobeIcon className="w-full h-full absolute -top-4 text-[#6C63FF]" />
       </div>

      <h2 className="text-2xl font-bold text-white mb-4 -mt-4">Community Insights</h2>
      
      {(isTrendsLoading && !globalTrends) && (
        <div className="mb-8 p-4 bg-[#1a1c2e]/50 border border-[#6C63FF]/20 rounded-lg">
          <LoadingSpinner />
          <p className="text-sm mt-2">Analyzing the collective subconscious...</p>
        </div>
      )}

      {globalTrends && (
        <div className="mb-8 p-4 bg-[#1a1c2e]/50 border border-[#6C63FF]/20 rounded-lg text-left animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-3 text-center">Global Dream Feed</h3>
          <div 
             className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap"
             dangerouslySetInnerHTML={{ __html: globalTrends.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>').replace(/\n/g, '<br />').replace(/### (.*)/g, '<h3 class="text-md font-semibold text-white mt-3 mb-1">$1</h3>').replace(/## (.*)/g, '<h2 class="text-lg font-bold text-white mt-4 mb-2">$1</h2>').replace(/\* (.*)/g, '<li class="ml-4">$1</li>') }}
           >
           </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-3 text-center">Explore Trends</h3>
        <p className="text-xs text-gray-500 mb-4 text-center">Ask a specific question about dream patterns.</p>
        {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-center">{error}</div>}
        <form onSubmit={handleSearch} className="flex gap-2 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., What are people dreaming about in Tokyo?"
            className="flex-grow bg-[#1a1c2e] text-gray-200 p-3 rounded-lg border border-[#6C63FF]/50 focus:ring-2 focus:ring-[#00FFF7] focus:border-[#00FFF7] outline-none transition-colors"
            disabled={!location || isLoading}
          />
          <button
            type="submit"
            disabled={!location || isLoading || !query.trim()}
            className="px-4 bg-gradient-to-r from-[#6C63FF] to-[#00FFF7] text-white font-bold rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isLoading ? <LoadingSpinner /> : 'Ask'}
          </button>
        </form>
      </div>
      

      {(isLoading && !result) && 
        <div className="mt-8">
            <LoadingSpinner/>
            <p className="text-sm mt-2">Searching for specific insights...</p>
        </div>
      }

      {result && (
        <div className="mt-8 p-4 bg-[#1a1c2e]/50 border border-[#6C63FF]/20 rounded-lg text-left">
          <p className="whitespace-pre-wrap leading-relaxed">{result.text}</p>
          {result.groundingChunks && result.groundingChunks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#6C63FF]/20">
              <h4 className="font-semibold text-white">Sources:</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                {result.groundingChunks.map((chunk, index) => (
                  (chunk.maps || chunk.web) && (
                    <li key={index}>
                      <a href={chunk.maps?.uri || chunk.web?.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                        {chunk.maps?.title || chunk.web?.title}
                      </a>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityView;