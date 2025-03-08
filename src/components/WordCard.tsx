import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Word } from '../types';

interface WordCardProps {
  word: Word;
  onRemembered: () => void;
  onForgotten: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, onRemembered, onForgotten }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  // Função para virar o cartão
  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: showTranslation ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowTranslation(!showTranslation);
    });
  };

  // Interpolações para a animação de virar
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
    backfaceVisibility: 'hidden' as 'hidden',
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
    backfaceVisibility: 'hidden' as 'hidden',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
        <View style={styles.cardContainer}>
          {/* Frente do cartão (palavra em inglês) */}
          <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
            <Text style={styles.wordText}>{word.word}</Text>
            <Text style={styles.hintText}>Toque para ver a tradução</Text>
          </Animated.View>
          
          {/* Verso do cartão (tradução) */}
          <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
            <Text style={styles.translationText}>{word.translation}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Botões de feedback (aparecem quando a tradução é mostrada) */}
      {showTranslation && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.forgotButton]} 
            onPress={onForgotten}
          >
            <Text style={styles.buttonText}>Não Lembrei</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.rememberedButton]} 
            onPress={onRemembered}
          >
            <Text style={styles.buttonText}>Lembrei</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  cardContainer: {
    width: 300,
    height: 200,
    marginBottom: 16,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardFront: {
    backgroundColor: '#fff',
  },
  cardBack: {
    backgroundColor: '#e0f7fa',
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  translationText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  hintText: {
    fontSize: 14,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  forgotButton: {
    backgroundColor: '#ffcdd2',
  },
  rememberedButton: {
    backgroundColor: '#c8e6c9',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WordCard;