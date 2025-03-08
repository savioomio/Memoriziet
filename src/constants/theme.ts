/**
 * Sistema de temas para o aplicativo de vocabulário
 * Para mudar a paleta de cores, basta modificar os valores PRIMARY, SECONDARY, etc.
 */

// PALETA BASE - Modifique estes valores para mudar a paleta de cores do app
const PRIMARY = '#359894';    // Azul escuro
const SECONDARY = '#42a5f5';  // Azul claro
const ACCENT = '#ff9800';     // Laranja
const NEUTRAL = '#002d40';    // Cinza azulado
const BACKGROUND = '#fcf9fb'; // Azul muito claro
const DARK_BG = '#003747';        // Azul escuro para o botão de configurações

// Sistema de cores derivado da paleta base - não precisa modificar
export const COLORS = {
  // Cores principais
  primary: {
    main: PRIMARY,
    light: lightenColor(PRIMARY, 0.2),
    dark: darkenColor(PRIMARY, 0.2),
    contrast: '#FFFFFF', // Cor do texto sobre o PRIMARY
    disabled: `${PRIMARY}80`, // Versão com transparência para botões desabilitados
  },
  
  // Cores secundárias
  secondary: {
    main: SECONDARY,
    light: lightenColor(SECONDARY, 0.2),
    dark: darkenColor(SECONDARY, 0.2),
    contrast: '#FFFFFF', // Cor do texto sobre o SECONDARY
    disabled: `${SECONDARY}40`, // Versão mais transparente (40% opaca)
  },
  
  // Cores de destaque/alerta
  accent: {
    main: ACCENT,
    light: lightenColor(ACCENT, 0.2),
    dark: darkenColor(ACCENT, 0.2),
    contrast: '#FFFFFF', // Cor do texto sobre o ACCENT
  },
  
  // Cores neutras
  neutral: {
    main: NEUTRAL,
    light: lightenColor(NEUTRAL, 0.3),
    dark: darkenColor(NEUTRAL, 0.3),
    contrast: '#FFFFFF', // Cor do texto sobre o NEUTRAL
    disabled: `${NEUTRAL}60`, // Versão com transparência para itens desabilitados
  },
  
  // Cores de fundo
  background: {
    main: BACKGROUND,
    card: '#FFFFFF',
    contrast: '#333333', // Cor do texto sobre o BACKGROUND
    dark: DARK_BG, // Azul escuro para o botão de configurações
  },
  
  // Cores de texto
  text: {
    primary: '#333333',   // Texto principal
    secondary: '#666666', // Texto secundário
    hint: '#999999',      // Texto de dica
    disabled: '#aaaaaa',  // Texto desabilitado (cinza mais claro)
    contrast: '#FFFFFF',  // Texto sobre cores escuras
  },
  
  // Cores de estado
  state: {
    success: PRIMARY,
    info: SECONDARY,
    warning: '#ff9800',
    error: ACCENT,
    disabled: '#cccccc',  // Cinza claro para elementos desabilitados
  },
  
  // Cores padrão de UI
  divider: '#e0e0e0',
  shadow: '#000000',
  
  // Estados de botões
  button: {
    primary: PRIMARY,
    secondary: SECONDARY,
    disabled: '#b0bec5', // Usar um cinza azulado para botões desabilitados
    disabledText: '#78909c', // Texto em botões desabilitados
  }
};

// Utilitário para escurecer uma cor (simulação)
function darkenColor(color: string, amount: number): string {
  // Esta é uma implementação simplificada apenas para demonstração
  // Em uma implementação real, você usaria uma biblioteca como color ou polished
  return color;
}

// Utilitário para clarear uma cor (simulação)
function lightenColor(color: string, amount: number): string {
  // Esta é uma implementação simplificada apenas para demonstração
  // Em uma implementação real, você usaria uma biblioteca como color ou polished
  return color;
}

// ESTILOS COMUNS REUTILIZÁVEIS
export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  }
};

// Dimensões e tamanhos padronizados
export const SIZES = {
  // Raios de bordas
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
  },
  
  // Espaçamentos
  spacing: {
    xs: 4,
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
  },
  
  // Tamanhos de fonte
  fontSize: {
    small: 12,
    medium: 14,
    large: 16,
    xl: 18,
    xxl: 24,
    title: 20,
    header: 24,
  }
};
