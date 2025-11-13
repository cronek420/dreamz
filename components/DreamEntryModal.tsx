import React, { useState, useRef, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { CloseIcon, LockIcon, MicrophoneIcon } from './icons/ActionIcons';
import { DreamMood } from '../types';
import { HappyIcon, CalmIcon, SadIcon, FearfulIcon } from './icons/AppIcons';
import { AnalysisOptions } from '../services/geminiService';

interface DreamEntryModalProps {
  onClose: () => void;
  onSubmit: (dreamText: string, mood?: DreamMood, options?: AnalysisOptions) => void;
  isLoading: boolean;
  isPro: boolean;
  onUpgradeClick: () => void;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onend: () => void;
  onerror: (event: any) => void;
  onresult: (event: any) => void;
  start: () => void;
  stop: () => void;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const DreamEntryModal: React.FC<DreamEntryModalProps> = ({ onClose, onSubmit, isLoading, isPro, onUpgradeClick }) => {
  const [dreamText, setDreamText] = useState('');
  const [selectedMood, setSelectedMood] = useState<DreamMood | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const textBeforeRecordingRef = useRef('');
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    narrative: false,
    archetypes: false,
    symbols: false,
  });

  const moods: { name: DreamMood; icon: React.FC<any> }[] = [
    { name: 'Happy', icon: HappyIcon },
    { name: 'Calm', icon: CalmIcon },
    { name: 'Sad', icon: SadIcon },
    { name: 'Fearful', icon: FearfulIcon },
  ];

  const analysisOptionsConfig = [
      { id: 'narrative', label: 'Narrative Structure', description: 'Analyze the plot and pacing of your dream.' },
      { id: 'archetypes', label: 'Character Archetypes', description: 'Identify figures like The Mentor or The Shadow.' },
      { id: 'symbols', label: 'Recurring Symbols', description: 'Track symbols across multiple dreams.' },
  ] as const;

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleOptionChange = (option: keyof AnalysisOptions) => {
    if (!isPro) {
        onUpgradeClick();
        onClose();
        return;
    };
    setAnalysisOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }
    textBeforeRecordingRef.current = dreamText;
    const recognition: SpeechRecognitionInstance = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      const separator = textBeforeRecordingRef.current.endsWith(' ') || textBeforeRecordingRef.current === '' ? '' : ' ';
      setDreamText(textBeforeRecordingRef.current + separator + finalTranscript + interimTranscript);
    };
    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dreamText.trim() && !isLoading) {
      if (isRecording) {
        recognitionRef.current?.stop();
      }
      onSubmit(dreamText, selectedMood, analysisOptions);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0B0C10] border border-[#6C63FF]/30 rounded-2xl p-6 w-full max-w-lg relative shadow-2xl shadow-[#6C63FF]/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          New Entry
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="glowing-border">
            <textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="Enter your dream...."
              className="w-full h-48 bg-[#1a1c2e] text-gray-200 p-4 rounded-lg focus:outline-none resize-none"
              disabled={isLoading}
            />
          </div>
          
          <div className="mt-6">
            <p className="text-center text-sm text-gray-400 mb-3">How did it feel?</p>
            <div className="flex justify-around items-center">
                {moods.map(({ name, icon: Icon }) => (
                    <button type="button" key={name} onClick={() => setSelectedMood(name)} className="text-center group">
                        <div className={`p-3 rounded-full transition-all duration-300 ${selectedMood === name ? 'bg-gradient-to-br from-[#6C63FF] to-[#00FFF7]' : 'bg-[#1a1c2e] group-hover:bg-[#6C63FF]/50'}`}>
                           <Icon className="w-8 h-8 text-white"/>
                        </div>
                        <span className={`mt-2 text-xs transition-colors duration-300 ${selectedMood === name ? 'text-white font-semibold' : 'text-gray-400 group-hover:text-white'}`}>{name}</span>
                    </button>
                ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
             <p className="text-center text-sm text-gray-400 mb-3">Advanced Analysis</p>
             <div className="space-y-2">
                 {analysisOptionsConfig.map(opt => {
                     const isChecked = analysisOptions[opt.id];
                     return (
                        <div
                            key={opt.id}
                            onClick={() => handleOptionChange(opt.id)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOptionChange(opt.id); } }}
                            role="checkbox"
                            aria-checked={isPro ? isChecked : false}
                            tabIndex={isPro ? 0 : -1}
                            className={`flex items-center justify-between bg-[#1a1c2e] p-3 rounded-lg transition-all duration-200 ${isPro ? 'cursor-pointer hover:bg-[#1a1c2e]/70' : 'opacity-70'}`}
                        >
                            <div>
                                <span className={`font-semibold flex items-center gap-2 ${isPro ? 'text-gray-200' : 'text-gray-500'}`}>
                                    {opt.label}
                                    {!isPro && <LockIcon className="w-4 h-4 text-yellow-500" />}
                                </span>
                                <p className={`text-xs mt-1 ${isPro ? 'text-gray-400' : 'text-gray-600'}`}>{opt.description}</p>
                            </div>

                            {isPro && (
                                <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all duration-200 flex-shrink-0 ml-4 ${isChecked ? 'bg-[#00FFF7] border-[#00FFF7]' : 'border-gray-500'}`}>
                                    {isChecked && <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                </div>
                            )}
                        </div>
                     )
                 })}
             </div>
          </div>


          <button
            type="submit"
            disabled={isLoading || !dreamText.trim()}
            className="mt-6 w-full h-12 bg-gradient-to-r from-[#6C63FF] via-[#a163ff] to-[#FF00A0] text-white font-bold rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isLoading ? <LoadingSpinner /> : 'Save & Analyze'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DreamEntryModal;