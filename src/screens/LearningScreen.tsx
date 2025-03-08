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
import { getWordsToLearn, markWordAsLearned } from '../services/database';
import WordCard from '../components/WordCard';
import { DAILY_WORDS_COUNT } from '../constants';
import { Word } from '../types';

type LearningScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Learning'>;

const LearningScreen: React.FC = () => {
  const navigation = useNavigation<LearningScreenNavigationProp>();
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const loadWords = async () => {
      try {
        // Carregar palavras para aprender
        const wordsToLearn = await getWordsToLearn(DAILY_WORDS_COUNT);
        
        if (wordsToLearn.length === 0) {
          Alert.alert(
            'Sem Palavras',
            'Você já aprendeu todas as palavras disponíveis!',
            [{ text: 'Voltar', onPress: () => navigation.goBack() }]
          );
          return;
        }
        
        setWords(wordsToLearn);
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
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Carregando palavras...</Text>
      </View>
    );
  }

  if (completed) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.completedTitle}>Sessão de Aprendizado Concluída!</Text>
        <Text style={styles.completedText}>
          Você completou a sessão de aprendizado de hoje.
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
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  progressText: {
    fontSize: 18,
    color: '#666',
    marginVertical: 16,
  },
  skipButton: {
    marginTop: 32,
    padding: 16,
  },
  skipButtonText: {
    color: '#888',
    fontSize: 16,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 16,
  },
  completedText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#4caf50',
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LearningScreen;