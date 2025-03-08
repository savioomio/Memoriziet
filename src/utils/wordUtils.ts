import { generateUUID } from './uuid';
import { Word } from '../types';

// Lista de palavras em inglês com traduções para português (amostra inicial)
const sampleWords: { word: string; translation: string }[] = [
  { word: 'apple', translation: 'maçã' },
  { word: 'house', translation: 'casa' },
  { word: 'car', translation: 'carro' },
  { word: 'book', translation: 'livro' },
  { word: 'computer', translation: 'computador' },
  { word: 'phone', translation: 'telefone' },
  { word: 'water', translation: 'água' },
  { word: 'food', translation: 'comida' },
  { word: 'friend', translation: 'amigo' },
  { word: 'family', translation: 'família' },
  { word: 'school', translation: 'escola' },
  { word: 'work', translation: 'trabalho' },
  { word: 'time', translation: 'tempo' },
  { word: 'day', translation: 'dia' },
  { word: 'night', translation: 'noite' },
  { word: 'week', translation: 'semana' },
  { word: 'month', translation: 'mês' },
  { word: 'year', translation: 'ano' },
  { word: 'money', translation: 'dinheiro' },
  { word: 'city', translation: 'cidade' },
  { word: 'country', translation: 'país' },
  { word: 'world', translation: 'mundo' },
  { word: 'animal', translation: 'animal' },
  { word: 'bird', translation: 'pássaro' },
  { word: 'fish', translation: 'peixe' },
  { word: 'dog', translation: 'cachorro' },
  { word: 'cat', translation: 'gato' },
  { word: 'tree', translation: 'árvore' },
  { word: 'flower', translation: 'flor' },
  { word: 'sun', translation: 'sol' },
];

/**
 * Cria um conjunto inicial de palavras para o aplicativo
 */
export const createInitialWords = (): Word[] => {
  return sampleWords.map(({ word, translation }) => ({
    id: generateUUID(),
    word,
    translation,
    learned: false,
    learningDate: null,
    reviewInterval: 0,
    nextReviewDate: null,
  }));
};

/**
 * Formata uma data para exibição
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return date.toLocaleDateString();
};