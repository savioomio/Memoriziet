import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  color?: string;
  height?: number;
  showPercentage?: boolean;
  showFraction?: boolean;
}

/**
 * Componente de barra de progresso personalizado
 * @param current - Valor atual do progresso
 * @param total - Valor total para completar o progresso
 * @param label - Texto opcional para exibir acima da barra
 * @param color - Cor personalizada para a barra (usa a cor primária por padrão)
 * @param height - Altura da barra de progresso (padrão: 10)
 * @param showPercentage - Se deve mostrar a porcentagem (padrão: false)
 * @param showFraction - Se deve mostrar a fração atual/total (padrão: false)
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  color = COLORS.primary.main,
  height = 10,
  showPercentage = false,
  showFraction = false,
}) => {
  // Calcula a porcentagem de progresso
  const percentage = Math.min(100, Math.round((current / total) * 100)) || 0;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[styles.progressContainer, { height }]}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%`, backgroundColor: color, height }
          ]}
        />
      </View>
      
      {showPercentage && (
        <Text style={styles.percentageText}>{percentage}%</Text>
      )}
      
      {showFraction && (
        <Text style={styles.fractionText}>
          {current} / {total}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SIZES.spacing.small,
  },
  label: {
    fontSize: SIZES.fontSize.medium,
    marginBottom: SIZES.spacing.xs,
    color: COLORS.text.secondary,
  },
  progressContainer: {
    backgroundColor: COLORS.neutral.light,
    borderRadius: 20, // Forma mais arredondada para a barra
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 20,
  },
  percentageText: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.text.secondary,
    textAlign: 'right',
    marginTop: SIZES.spacing.xs,
  },
  fractionText: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.text.secondary,
    textAlign: 'right',
    marginTop: SIZES.spacing.xs,
  }
});

export default ProgressBar;