export enum ActiveTab {
  Journal = 'JOURNAL',
  Insights = 'INSIGHTS',
  Community = 'COMMUNITY',
  Scribe = 'SCRIBE',
}

export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro';
  trialEndDate?: string; // ISO date string
}

export interface DreamAnalysis {
  themes: string[];
  emotions: Record<string, number>;
  summary: string;
  interpretation: string;
  prompts: string[];
  narrativeStructure?: string;
  characterArchetypes?: {
    nameInDream: string;
    archetype: string;
    description: string;
  }[];
  recurringSymbols?: {
    symbol: string;
    interpretation: string;
    appearances: number;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type DreamMood = 'Happy' | 'Calm' | 'Sad' | 'Fearful';

export interface Dream {
  id: string;
  userId: string; // Associate dream with a user
  text: string;
  mood?: DreamMood;
  timestamp: string;
  analysis: DreamAnalysis | null;
  chatHistory?: ChatMessage[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri:string;
    title: string;
  }
}