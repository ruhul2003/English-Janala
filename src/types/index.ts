export interface Level {
  id: number;
  level_no: number;
  lessonName: string;
}

export interface Word {
  id: number;
  level: number;
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface WordDetail extends Word {
  sentence?: string;
  points?: number;
  partsOfSpeech?: string;
  synonyms?: string[];
}

export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  } | null;
}

export interface QuizQuestion {
  id: number;
  word: string;
  pronunciation: string;
  correctAnswer: string;
  options: string[];
  level: number;
}

export interface QuizResult {
  score: number;
  total: number;
  correctAnswers: number;
  date: string;
}

export type LearningTab = 'learn' | 'flashcards' | 'quiz' | 'saved' | 'faq';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'lessons' | 'pronunciation' | 'account';
}
