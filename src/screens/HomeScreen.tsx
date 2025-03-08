import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  StatusBar,
  Image,
  SafeAreaView,
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
import { resetVocabularyOnly } from '../utils/resetStorage';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [stats, setStats] = useState<LearningStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para inicializar o aplicativo
  const initializeApp = async () => {
    setLoading(true);
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

  // Função para limpar os dados e reiniciar
  const resetAndReload = async () => {
    try {
      Alert.alert(
        'Resetar Dados',
        'Isso irá apagar todo o seu progresso de aprendizado e recarregar as palavras. Esta ação não pode ser desfeita. Deseja continuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Resetar', 
            style: 'destructive',
            onPress: async () => {
              setLoading(true);
              try {
                // Limpa os dados do vocabulário
                await resetVocabularyOnly();
                // Reinicializa o aplicativo
                await initializeApp();
                Alert.alert('Sucesso', 'Dados de vocabulário resetados com sucesso.');
              } catch (error) {
                console.error('Erro ao resetar e recarregar:', error);
                Alert.alert('Erro', 'Falha ao resetar dados.');
              } finally {
                setLoading(false);
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao exibir alerta de reset:', error);
    }
  };

  useEffect(() => {
    initializeApp();
    
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
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
        <Text style={styles.loadingText}>Inicializando aplicativo...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary.main} barStyle="light-content" />

      
      {/* Estatísticas Resumidas */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats?.learnedWords || 0}</Text>
          <Text style={styles.statLabel}>Aprendidas</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats?.wordsToReview || 0}</Text>
          <Text style={styles.statLabel}>Para Revisar</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats?.totalWords || 0}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
      
      {/* Menu de Navegação */}
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>O que você deseja fazer?</Text>
        
        {/* Botão de Aprender */}
        <TouchableOpacity 
          style={[styles.menuItem, styles.learnButton]} 
          onPress={() => navigation.navigate('Learning')}
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuItemTitle}>Aprender Novas Palavras</Text>
            <Text style={styles.menuItemDescription}>
              Aprenda novas palavras do vocabulário em inglês
            </Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão de Revisar */}
        <TouchableOpacity 
          style={[
            styles.menuItem, 
            stats?.wordsToReview === 0 ? styles.disabledButton : styles.reviewButton
          ]} 
          onPress={() => navigation.navigate('Review')}
          disabled={stats?.wordsToReview === 0}
        >
          <View style={styles.menuContent}>
            <Text style={[
              styles.menuItemTitle,
              stats?.wordsToReview === 0 ? styles.disabledText : {}
            ]}>
              Revisar Palavras {stats?.wordsToReview ? `(${stats.wordsToReview})` : ''}
            </Text>
            <Text style={[
              styles.menuItemDescription,
              stats?.wordsToReview === 0 ? styles.disabledText : {}
            ]}>
              {stats?.wordsToReview ? 'Revise palavras que você já aprendeu' : 'Nenhuma palavra para revisar hoje'}
            </Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão de Configurações */}
        <TouchableOpacity 
          style={[styles.menuItem, styles.settingsButton]} 
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuItemTitle}>Configurações</Text>
            <Text style={styles.menuItemDescription}>
              Ajuste as configurações do aplicativo
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Botão de Reset (apenas para desenvolvimento) */}
      {false && (
        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={resetAndReload}
        >
          <Text style={styles.resetButtonText}>Resetar Dados</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.spacing.medium,
    fontSize: SIZES.fontSize.medium,
    color: COLORS.text.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SIZES.spacing.medium,
    backgroundColor: COLORS.background.card,
    borderRadius: SIZES.borderRadius.medium,
    margin: SIZES.spacing.medium,
    ...SHADOWS.small,
  },
  statItem: {
    alignItems: 'center',
    padding: SIZES.spacing.small,
  },
  statValue: {
    fontSize: SIZES.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.primary.main,
  },
  statLabel: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.text.secondary,
  },
  menuContainer: {
    padding: SIZES.spacing.medium,
    flex: 1,
  },
  menuTitle: {
    fontSize: SIZES.fontSize.large,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SIZES.spacing.medium,
  },
  menuItem: {
    borderRadius: SIZES.borderRadius.large,
    marginBottom: SIZES.spacing.medium,
    padding: SIZES.spacing.large,
    ...SHADOWS.small,
  },
  menuContent: {
    flexDirection: 'column',
  },
  menuItemTitle: {
    fontSize: SIZES.fontSize.large,
    fontWeight: 'bold',
    color: COLORS.text.contrast,
    marginBottom: SIZES.spacing.xs,
  },
  menuItemDescription: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.text.contrast,
    opacity: 0.9,
  },
  learnButton: {
    backgroundColor: COLORS.primary.main,
  },
  reviewButton: {
    backgroundColor: COLORS.primary.main,
  },
  settingsButton: {
    backgroundColor: COLORS.background.dark,
  },
  disabledButton: {
    backgroundColor: COLORS.neutral.main,
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.9,
  },
  resetButton: {
    alignSelf: 'center',
    padding: SIZES.spacing.small,
    marginBottom: SIZES.spacing.medium,
  },
  resetButtonText: {
    color: COLORS.text.hint,
    fontSize: SIZES.fontSize.small,
  },
});

export default HomeScreen;