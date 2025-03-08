import AsyncStorage from '@react-native-async-storage/async-storage';
import { Word, LearningStats } from '../types';
import { REVIEW_INTERVALS } from '../constants';
import { getLastAvailableDay } from '../utils/wordUtils';

// Chaves para o AsyncStorage
const STORAGE_KEYS = {
  WORDS: 'vocabulary_words',
  STATS: 'vocabulary_stats',
};

/**
 * Inicializa o banco de dados
 */
export const initDatabase = async (): Promise<void> => {
  try {
    console.log('Initializing database using AsyncStorage...');
    // Verificar se já temos palavras armazenadas
    const wordsStr = await AsyncStorage.getItem(STORAGE_KEYS.WORDS);
    if (!wordsStr) {
      // Se não houver palavras, inicializar com um array vazio
      await AsyncStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify([]));
    }
    
    // Verificar se já temos estatísticas armazenadas
    const statsStr = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
    if (!statsStr) {
      // Se não houver estatísticas, inicializar com valores padrão
      const initialStats: LearningStats = {
        totalWords: 0,
        learnedWords: 0,
        wordsToReview: 0,
        lastCompletedDay: 0
      };
      await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initialStats));
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

/**
 * Obtém todas as palavras do AsyncStorage
 */
const getAllWords = async (): Promise<Word[]> => {
  try {
    const wordsStr = await AsyncStorage.getItem(STORAGE_KEYS.WORDS);
    if (!wordsStr) return [];
    
    // Garantir que as datas sejam convertidas corretamente
    const words = JSON.parse(wordsStr) as Word[];
    return words.map(word => ({
      ...word,
      learningDate: word.learningDate ? new Date(word.learningDate) : null,
      nextReviewDate: word.nextReviewDate ? new Date(word.nextReviewDate) : null
    }));
  } catch (error) {
    console.error('Error getting all words:', error);
    return [];
  }
};

/**
 * Salva todas as palavras no AsyncStorage
 */
const saveAllWords = async (words: Word[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words));
  } catch (error) {
    console.error('Error saving all words:', error);
    throw error;
  }
};

/**
 * Obtém as estatísticas de aprendizado
 */
export const getStats = async (): Promise<LearningStats> => {
  try {
    const statsStr = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
    if (!statsStr) {
      return {
        totalWords: 0,
        learnedWords: 0,
        wordsToReview: 0,
        lastCompletedDay: 0
      };
    }
    return JSON.parse(statsStr) as LearningStats;
  } catch (error) {
    console.error('Error getting stats:', error);
    return {
      totalWords: 0,
      learnedWords: 0,
      wordsToReview: 0,
      lastCompletedDay: 0
    };
  }
};

/**
 * Salva as estatísticas de aprendizado
 */
export const saveStats = async (stats: LearningStats): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats:', error);
    throw error;
  }
};

/**
 * Salva uma palavra
 */
export const saveWord = async (word: Word): Promise<void> => {
  try {
    console.log(`Saving word: ${word.word}`);
    const words = await getAllWords();
    
    // Verificar se a palavra já existe
    const index = words.findIndex(w => w.id === word.id);
    
    if (index !== -1) {
      // Atualizar palavra existente
      words[index] = word;
    } else {
      // Adicionar nova palavra
      words.push(word);
    }
    
    await saveAllWords(words);
    console.log(`Word saved successfully: ${word.word}`);
  } catch (error) {
    console.error(`Error saving word ${word.word}:`, error);
    throw error;
  }
};

/**
 * Obtém palavras para um dia específico que ainda não foram aprendidas
 */
export const getWordsForDay = async (day: number): Promise<Word[]> => {
  try {
    const words = await getAllWords();
    const dayWords = words.filter(word => word.day === day && !word.learned);
    console.log(`Retrieved ${dayWords.length} words for day ${day}`);
    return dayWords;
  } catch (error) {
    console.error(`Error getting words for day ${day}:`, error);
    throw error;
  }
};

/**
 * Obtém palavras que ainda não foram aprendidas
 * (todas as palavras ou limitadas a um dia específico)
 */
export const getWordsToLearn = async (limit: number, day?: number): Promise<Word[]> => {
  try {
    const words = await getAllWords();
    let wordsToLearn;
    
    if (day) {
      // Filtrar palavras para um dia específico
      wordsToLearn = words.filter(word => word.day === day && !word.learned);
    } else {
      // Obter todas as palavras não aprendidas
      wordsToLearn = words.filter(word => !word.learned);
    }
    
    // Aplicar o limite se necessário
    if (limit > 0) {
      wordsToLearn = wordsToLearn.slice(0, limit);
    }
      
    console.log(`Retrieved ${wordsToLearn.length} words to learn${day ? ` for day ${day}` : ''}`);
    return wordsToLearn;
  } catch (error) {
    console.error('Error getting words to learn:', error);
    throw error;
  }
};

/**
 * Obtém palavras que precisam ser revisadas hoje
 */
export const getWordsToReview = async (): Promise<Word[]> => {
  try {
    const words = await getAllWords();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const wordsToReview = words.filter(word => {
      return (
        word.learned &&
        word.nextReviewDate &&
        new Date(word.nextReviewDate) <= today
      );
    });
    
    console.log(`Retrieved ${wordsToReview.length} words to review`);
    return wordsToReview;
  } catch (error) {
    console.error('Error getting words to review:', error);
    throw error;
  }
};

/**
 * Marca uma palavra como aprendida e agenda a primeira revisão
 */
export const markWordAsLearned = async (word: Word): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const updatedWord: Word = {
      ...word,
      learned: true,
      learningDate: today,
      reviewInterval: 1,
      nextReviewDate: tomorrow
    };
    
    await saveWord(updatedWord);
    
    // Atualizar as estatísticas
    await updateLearningStats();
    
    console.log(`Word marked as learned: ${word.word}`);
  } catch (error) {
    console.error(`Error marking word as learned: ${word.word}`, error);
    throw error;
  }
};

/**
 * Verifica se todas as palavras de um dia foram aprendidas
 * e atualiza o último dia concluído se necessário
 */
export const checkDayCompletion = async (day: number): Promise<boolean> => {
  try {
    const words = await getAllWords();
    const dayWords = words.filter(word => word.day === day);
    
    if (dayWords.length === 0) return false;
    
    const allLearned = dayWords.every(word => word.learned);
    
    if (allLearned) {
      // Atualizar o último dia concluído
      const stats = await getStats();
      if (day > (stats.lastCompletedDay || 0)) {
        stats.lastCompletedDay = day;
        await saveStats(stats);
        console.log(`Day ${day} completed!`);
      }
    }
    
    return allLearned;
  } catch (error) {
    console.error(`Error checking day completion for day ${day}:`, error);
    return false;
  }
};

/**
 * Atualiza o intervalo de revisão de uma palavra conforme o desempenho do usuário
 */
export const updateWordReview = async (word: Word, remembered: boolean): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let newInterval = 1; // Valor padrão
    
    if (remembered) {
      // Se lembrou, aumenta o intervalo
      const currentIntervalIndex = REVIEW_INTERVALS.indexOf(word.reviewInterval);
      if (currentIntervalIndex !== -1) {
        const nextIntervalIndex = Math.min(currentIntervalIndex + 1, REVIEW_INTERVALS.length - 1);
        newInterval = REVIEW_INTERVALS[nextIntervalIndex];
      } else {
        // Se não encontrou no array, usa o primeiro intervalo maior
        newInterval = REVIEW_INTERVALS.find(interval => interval > word.reviewInterval) || 
                     REVIEW_INTERVALS[REVIEW_INTERVALS.length - 1];
      }
    } else {
      // Se esqueceu, diminui o intervalo
      const currentIntervalIndex = REVIEW_INTERVALS.indexOf(word.reviewInterval);
      if (currentIntervalIndex !== -1 && currentIntervalIndex > 0) {
        newInterval = REVIEW_INTERVALS[currentIntervalIndex - 1];
      } else {
        // Se não encontrou ou é o primeiro, usa o menor intervalo
        newInterval = REVIEW_INTERVALS[0];
      }
    }
    
    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
    
    const updatedWord: Word = {
      ...word,
      reviewInterval: newInterval,
      nextReviewDate: nextReviewDate
    };
    
    await saveWord(updatedWord);
    console.log(`Word review updated: ${word.word}, new interval: ${newInterval}`);
  } catch (error) {
    console.error(`Error updating word review: ${word.word}`, error);
    throw error;
  }
};

/**
 * Atualiza as estatísticas de aprendizado
 */
export const updateLearningStats = async (): Promise<LearningStats> => {
  try {
    const words = await getAllWords();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const totalWords = words.length;
    const learnedWords = words.filter(word => word.learned).length;
    const wordsToReview = words.filter(word => 
      word.learned && 
      word.nextReviewDate && 
      new Date(word.nextReviewDate) <= today
    ).length;
    
    // Obter estatísticas atuais para preservar lastCompletedDay
    const currentStats = await getStats();
    
    const stats: LearningStats = {
      totalWords,
      learnedWords,
      wordsToReview,
      lastCompletedDay: currentStats.lastCompletedDay || 0
    };
    
    await saveStats(stats);
    console.log('Learning stats updated:', stats);
    return stats;
  } catch (error) {
    console.error('Error updating learning stats:', error);
    throw error;
  }
};

/**
 * Obtém estatísticas de aprendizado
 */
export const getLearningStats = async (): Promise<LearningStats> => {
  try {
    // Atualiza e retorna as estatísticas atualizadas
    return await updateLearningStats();
  } catch (error) {
    console.error('Error getting learning stats:', error);
    throw error;
  }
};

/**
 * Verifica se o banco de dados tem palavras
 */
export const hasWords = async (): Promise<boolean> => {
  try {
    const words = await getAllWords();
    return words.length > 0;
  } catch (error) {
    console.error('Error checking if database has words:', error);
    throw error;
  }
};

/**
 * Verifica se o usuário concluiu todos os dias disponíveis
 */
export const hasCompletedAllDays = async (): Promise<boolean> => {
  try {
    const stats = await getStats();
    const lastAvailableDay = getLastAvailableDay();
    return (stats.lastCompletedDay || 0) >= lastAvailableDay;
  } catch (error) {
    console.error('Error checking if all days are completed:', error);
    return false;
  }
};

/**
 * Obtém o próximo dia de palavras que o usuário deve aprender
 */
export const getNextLearningDay = async (): Promise<number> => {
  try {
    const stats = await getStats();
    return (stats.lastCompletedDay || 0) + 1;
  } catch (error) {
    console.error('Error getting next learning day:', error);
    return 1; // Começa do dia 1 em caso de erro
  }
};