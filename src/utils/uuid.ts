import AsyncStorage from '@react-native-async-storage/async-storage';

// Contador global para garantir unicidade mesmo com timestamps iguais
let counter = 0;
const COUNTER_STORAGE_KEY = 'uuid_counter';

// Inicializa o contador a partir do AsyncStorage
const initializeCounter = async (): Promise<void> => {
  try {
    const storedCounter = await AsyncStorage.getItem(COUNTER_STORAGE_KEY);
    if (storedCounter !== null) {
      counter = parseInt(storedCounter, 10);
    }
  } catch (error) {
    console.error('Erro ao inicializar contador UUID:', error);
  }
};

// Salva o valor atual do contador no AsyncStorage
const saveCounter = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(COUNTER_STORAGE_KEY, counter.toString());
  } catch (error) {
    console.error('Erro ao salvar contador UUID:', error);
  }
};

// Chamada imediata para inicializar o contador
initializeCounter().catch(console.error);

/**
 * Gera um id único para uso em React Native (compatível com Expo Go)
 * Implementação simples que não depende de crypto.getRandomValues()
 */
export const generateUUID = async (): Promise<string> => {
  // Incrementa o contador
  counter++;
  
  // Salva o contador atual no AsyncStorage
  // Usamos setTimeout para não bloquear a execução e permitir que o UUID seja retornado imediatamente
  setTimeout(() => {
    saveCounter().catch(console.error);
  }, 0);
  
  // Implementação de timestamp + número aleatório + contador
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.floor(Math.random() * 10000000000000000).toString(16);
  const counterPart = counter.toString(16).padStart(4, '0');

  // Combine as partes para formar um ID único
  return `${timestamp}-${randomPart}-${counterPart}`;
};

/**
 * Versão síncrona do generateUUID para casos onde async/await é inconveniente
 * Não salva o contador no AsyncStorage, mas mantém a unicidade durante a sessão do app
 */
export const generateUUIDSync = (): string => {
  // Incrementa o contador
  counter++;
  
  // Implementação de timestamp + número aleatório + contador
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.floor(Math.random() * 10000000000000000).toString(16);
  const counterPart = counter.toString(16).padStart(4, '0');

  // Combine as partes para formar um ID único
  return `${timestamp}-${randomPart}-${counterPart}`;
};