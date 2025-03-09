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

/**
 * Converte uma cor hexadecimal para componentes RGB
 * @param hex A cor em formato hexadecimal (#RRGGBB)
 * @returns Objeto com componentes r, g, b
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remover o # do início, se presente
  const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  
  // Converter para números decimais
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Converte componentes RGB para formato hexadecimal
 * @param r Componente vermelho (0-255)
 * @param g Componente verde (0-255)
 * @param b Componente azul (0-255)
 * @returns Cor no formato hexadecimal (#RRGGBB)
 */
function rgbToHex(r: number, g: number, b: number): string {
  // Garantir que os valores estejam na faixa 0-255
  r = Math.max(0, Math.min(255, Math.round(r)));
  g = Math.max(0, Math.min(255, Math.round(g)));
  b = Math.max(0, Math.min(255, Math.round(b)));
  
  // Converter para formato hexadecimal e garantir que tenha 2 dígitos
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Escurece uma cor hexadecimal por uma quantidade específica
 * @param color Cor em formato hexadecimal (#RRGGBB)
 * @param amount Quantidade de escurecimento (0-1)
 * @returns Cor escurecida em formato hexadecimal
 */
function darkenColor(color: string, amount: number): string {
  const { r, g, b } = hexToRgb(color);
  
  // Reduzir os componentes RGB pela quantidade especificada
  const factor = 1 - amount;
  const newR = r * factor;
  const newG = g * factor;
  const newB = b * factor;
  
  return rgbToHex(newR, newG, newB);
}

/**
 * Clareia uma cor hexadecimal por uma quantidade específica
 * @param color Cor em formato hexadecimal (#RRGGBB)
 * @param amount Quantidade de clareamento (0-1)
 * @returns Cor clareada em formato hexadecimal
 */
function lightenColor(color: string, amount: number): string {
  const { r, g, b } = hexToRgb(color);
  
  // Aumentar os componentes RGB pela quantidade especificada
  const newR = r + (255 - r) * amount;
  const newG = g + (255 - g) * amount;
  const newB = b + (255 - b) * amount;
  
  return rgbToHex(newR, newG, newB);
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
