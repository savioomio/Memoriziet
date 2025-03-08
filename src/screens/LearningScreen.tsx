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
import { 
  getWordsToLearn, 
  markWordAsLearned, 
  getNextLearningDay,
  checkDayCompletion,
  getWordsForDay
} from '../services/database';
import WordCard from '../components/WordCard';
import { DAILY_WORDS_COUNT } from '../constants';
import { Word } from '../types';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

type LearningScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Learning'>;

const LearningScreen: React.FC = () => {
  const navigation = useNavigation<LearningScreenNavigationProp>();
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(1);

  useEffect(() => {
    const loadWords = async () => {
      try {
        // Determinar qual é o próximo dia a ser aprendido
        const nextDay = await getNextLearningDay();
        setCurrentDay(nextDay);
        
        // Carregar palavras para esse dia
        const dayWords = await getWordsForDay(nextDay);
        
        if (dayWords.length === 0) {
          Alert.alert(
            'Sem Palavras',
            `Não há palavras disponíveis para o dia ${nextDay}! Você concluiu todos os dias disponíveis.`,
            [{ text: 'Voltar', onPress: () => navigation.goBack() }]
          );
          return;
        }
        
        setWords(dayWords);
      } catch (error) {
        console.error('Erro ao carregar palavras:', error);
        Alert.alert('Erro', 'Falha ao carregar palavras para aprender.');
      } finally {
        setLoading(false);
      }
    };
    
    loadWords();
  }, [navigation]);

  // Função para lidar quando o usuário lembra da palavra
  const handleWordRemembered = async () => {
    try {
      const wordToMark = words[currentIndex];
      await markWordAsLearned(wordToMark);
      
      // Avança para a próxima palavra ou conclui
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Verificar se todas as palavras do dia foram aprendidas
        const dayCompleted = await checkDayCompletion(currentDay);
        setCompleted(true);
      }
    } catch (error) {
      console.error('Erro ao marcar palavra como aprendida:', error);
      Alert.alert('Erro', 'Falha ao salvar seu progresso.');
    }
  };

  // Função para lidar quando o usuário não lembra da palavra
  const handleWordForgotten = () => {
    // Avança para a próxima palavra sem marcar como aprendida
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
        <Text style={styles.loadingText}>Carregando palavras...</Text>
      </View>
    );
  }

  if (completed) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.completedTitle}>Sessão de Aprendizado Concluída!</Text>
        <Text style={styles.dayText}>Dia {currentDay}</Text>
        <Text style={styles.completedText}>
          Você completou a sessão de aprendizado para o dia {currentDay}.
          Continue praticando para fixar as palavras!
        </Text>
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
      <Text style={styles.dayText}>Dia {currentDay}</Text>
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
        <Text style={styles.skipButtonText}>Encerrar Sessão</Text>
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
  dayText: {
    fontSize: SIZES.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.primary.main,
    marginTop: SIZES.spacing.small,
    marginBottom: SIZES.spacing.small,
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
    color: COLORS.primary.main,
    marginBottom: SIZES.spacing.small,
  },
  completedText: {
    fontSize: SIZES.fontSize.medium,
    color: COLORS.text.secondary,
    marginBottom: SIZES.spacing.xl,
    textAlign: 'center',
    paddingHorizontal: SIZES.spacing.medium,
  },
  homeButton: {
    backgroundColor: COLORS.primary.main,
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

export default LearningScreen;