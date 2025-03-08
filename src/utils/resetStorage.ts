import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Limpa todos os dados armazenados no AsyncStorage
 * Use com cuidado - isso irá apagar todo o progresso do usuário!
 */
export const resetAllStorage = async (): Promise<void> => {
  try {
    console.log('Limpando todos os dados do AsyncStorage...');
    await AsyncStorage.clear();
    console.log('AsyncStorage limpo com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar AsyncStorage:', error);
    throw error;
  }
};

/**
 * Limpa apenas os dados do vocabulário, mantendo outras configurações
 */
export const resetVocabularyOnly = async (): Promise<void> => {
  try {
    console.log('Limpando dados de vocabulário...');
    await AsyncStorage.removeItem('vocabulary_words');
    await AsyncStorage.removeItem('vocabulary_stats');
    console.log('Dados de vocabulário limpos com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar dados de vocabulário:', error);
    throw error;
  }
};