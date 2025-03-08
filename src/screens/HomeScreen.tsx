import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation';
import { 
  initDatabase, 
  getWordsToLearn, 
  getWordsToReview, 
  getLearningStats,
  saveWord,
  hasWords
} from '../services/database';
import { createInitialWords } from '../utils/wordUtils';
import { configureNotifications, scheduleReviewNotification } from '../services/notifications';
import { LearningStats } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [stats, setStats] = useState<LearningStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Inicializa o banco de dados
        await initDatabase();
        
        // Verifica se temos palavras no banco de dados
        const hasExistingWords = await hasWords();
        
        // Se não há palavras, adiciona palavras iniciais
        if (!hasExistingWords) {
          console.log('No words found, adding initial words');
          const initialWords = createInitialWords();
          for (const word of initialWords) {
            await saveWord(word);
          }
        }
        
        // Obtém estatísticas
        const currentStats = await getLearningStats();
        setStats(currentStats);
        
        // Configura notificações
        configureNotifications();
        if (currentStats.wordsToReview > 0) {
          await scheduleReviewNotification(currentStats.wordsToReview);
        }
      } catch (error) {
        console.error('Erro ao inicializar o app:', error);
        Alert.alert('Erro', 'Falha ao inicializar o aplicativo. Por favor, reinicie.');
      } finally {
        setLoading(false);
      }
    };
    
    initApp();
    
    // Atualiza as estatísticas quando a tela recebe foco
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const currentStats = await getLearningStats();
        setStats(currentStats);
      } catch (error) {
        console.error('Erro ao atualizar estatísticas:', error);
      }
    });
    
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Inicializando aplicativo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.title}>Seu Progresso de Aprendizado</Text>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.learnedWords || 0}</Text>
          <Text style={styles.statLabel}>Palavras Aprendidas</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.wordsToReview || 0}</Text>
          <Text style={styles.statLabel}>Palavras para Revisar</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.totalWords || 0}</Text>
          <Text style={styles.statLabel}>Total de Palavras</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.learnButton]} 
          onPress={() => navigation.navigate('Learning')}
        >
          <Text style={styles.buttonText}>Aprender Novas Palavras</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.reviewButton,
            stats?.wordsToReview === 0 ? styles.disabledButton : {}
          ]} 
          onPress={() => navigation.navigate('Review')}
          disabled={stats?.wordsToReview === 0}
        >
          <Text style={styles.buttonText}>
            Revisar Palavras {stats?.wordsToReview ? `(${stats.wordsToReview})` : ''}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.settingsButton]} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  actionsContainer: {
    marginTop: 16,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  learnButton: {
    backgroundColor: '#4caf50',
  },
  reviewButton: {
    backgroundColor: '#2196f3',
  },
  settingsButton: {
    backgroundColor: '#9e9e9e',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
});

export default HomeScreen;