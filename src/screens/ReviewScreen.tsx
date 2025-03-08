import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation';
import { getWordsToReview, updateWordReview } from '../services/database';
import WordCard from '../components/WordCard';
import { Word } from '../types';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

type ReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Review'>;

const ReviewScreen: React.FC = () => {
  const navigation = useNavigation<ReviewScreenNavigationProp>();
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [reviewStats, setReviewStats] = useState({
    remembered: 0,
    forgotten: 0,
  });

  useEffect(() => {
    const loadWords = async () => {
      try {
        // Carregar palavras para revisar
        const wordsToReview = await getWordsToReview();
        
        if (wordsToReview.length === 0) {
          Alert.alert(
            'Sem Revisões',
            'Não há palavras para revisar hoje!',
            [{ text: 'Voltar', onPress: () => navigation.goBack() }]
          );
          return;
        }
        
        setWords(wordsToReview);
      } catch (error) {
        console.error('Erro ao carregar palavras para revisão:', error);
        Alert.alert('Erro', 'Falha ao carregar palavras para revisar.');
      } finally {
        setLoading(false);
      }
    };
    
    loadWords();
  }, [navigation]);

  // Função para lidar quando o usuário lembra da palavra
  const handleWordRemembered = async () => {
    try {
      const wordToUpdate = words[currentIndex];
      await updateWordReview(wordToUpdate, true);
      
      // Atualiza estatísticas
      setReviewStats({
        ...reviewStats,
        remembered: reviewStats.remembered + 1,
      });
      
      // Avança para a próxima palavra ou conclui
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Erro ao atualizar palavra:', error);
      Alert.alert('Erro', 'Falha ao salvar seu progresso.');
    }
  };

  // Função para lidar quando o usuário não lembra da palavra
  const handleWordForgotten = async () => {
    try {
      const wordToUpdate = words[currentIndex];
      await updateWordReview(wordToUpdate, false);
      
      // Atualiza estatísticas
      setReviewStats({
        ...reviewStats,
        forgotten: reviewStats.forgotten + 1,
      });
      
      // Avança para a próxima palavra ou conclui
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Erro ao atualizar palavra:', error);
      Alert.alert('Erro', 'Falha ao salvar seu progresso.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.secondary.main} />
        <Text style={styles.loadingText}>Carregando palavras para revisão...</Text>
      </View>
    );
  }

  if (completed) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.completedTitle}>Revisão Concluída!</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{reviewStats.remembered}</Text>
            <Text style={styles.statLabel}>Lembradas</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{reviewStats.forgotten}</Text>
            <Text style={styles.statLabel}>Esquecidas</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{words.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.homeButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Voltar para Início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.progressText}>
        Palavra {currentIndex + 1} de {words.length}
      </Text>
      
      {words.length > 0 && (
        <WordCard
          word={words[currentIndex]}
          onRemembered={handleWordRemembered}
          onForgotten={handleWordForgotten}
        />
      )}
      
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.skipButtonText}>Encerrar Revisão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background.main,
    padding: SIZES.spacing.medium,
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: SIZES.spacing.medium,
    fontSize: SIZES.fontSize.medium,
    color: COLORS.text.secondary,
  },
  progressText: {
    fontSize: SIZES.fontSize.large,
    color: COLORS.text.secondary,
    marginVertical: SIZES.spacing.medium,
  },
  skipButton: {
    marginTop: SIZES.spacing.xl,
    padding: SIZES.spacing.medium,
  },
  skipButtonText: {
    color: COLORS.text.hint,
    fontSize: SIZES.fontSize.medium,
  },
  completedTitle: {
    fontSize: SIZES.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.secondary.main,
    marginBottom: SIZES.spacing.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: SIZES.spacing.xl,
  },
  statItem: {
    alignItems: 'center',
    padding: SIZES.spacing.medium,
    minWidth: 80,
    backgroundColor: COLORS.background.card,
    borderRadius: SIZES.borderRadius.medium,
    ...SHADOWS.small,
  },
  statValue: {
    fontSize: SIZES.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.secondary.main,
  },
  statLabel: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.text.secondary,
    marginTop: SIZES.spacing.small,
  },
  homeButton: {
    backgroundColor: COLORS.secondary.main,
    borderRadius: SIZES.borderRadius.large,
    padding: SIZES.spacing.medium,
    minWidth: 200,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  buttonText: {
    color: COLORS.text.contrast,
    fontWeight: 'bold',
    fontSize: SIZES.fontSize.large,
  },
});

export default ReviewScreen;