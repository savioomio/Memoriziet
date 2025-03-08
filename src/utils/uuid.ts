/**
 * Gera um id único para uso em React Native (compatível com Expo Go)
 * Implementação simples que não depende de crypto.getRandomValues()
 */
export const generateUUID = (): string => {
  // Implementação de timestamp + número aleatório + contador
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.floor(Math.random() * 10000000000000000).toString(16);
  const counterPart = (counter++).toString(16).padStart(4, '0');

  // Combine as partes para formar um ID único
  return `${timestamp}-${randomPart}-${counterPart}`;
};

// Contador global para garantir unicidade mesmo com timestamps iguais
let counter = 0;