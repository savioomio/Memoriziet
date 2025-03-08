// Definição dos tipos principais do aplicativo

export interface Word {
  id: string;
  word: string;
  translation: string;
  learned: boolean;
  learningDate: Date | null;
  reviewInterval: number;
  nextReviewDate: Date | null;
}

export interface LearningStats {
  totalWords: number;
  learnedWords: number;
  wordsToReview: number;
}