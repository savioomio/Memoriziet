import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Switch, 
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation';
import { STORAGE_KEYS } from '../constants';
import { scheduleReviewNotification } from '../services/notifications';
import { getLearningStats } from '../services/database';
import { resetVocabularyOnly, resetAllStorage } from '../utils/resetStorage';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

// Definição do tipo de navegação para esta tela
type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega as configurações salvas
    const loadSettings = async () => {
      try {
        const notificationEnabledSetting = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_ENABLED);
        if (notificationEnabledSetting !== null) {
          setNotificationsEnabled(notificationEnabledSetting === 'true');
        }

        const notificationTimeSetting = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_TIME);
        if (notificationTimeSetting !== null) {
          setNotificationTime(new Date(notificationTimeSetting));
        } else {
          // Configura hora padrão para 9:00
          const defaultTime = new Date();
          defaultTime.setHours(9, 0, 0, 0);
          setNotificationTime(defaultTime);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Salva as configurações e atualiza as notificações
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_ENABLED, notificationsEnabled.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_TIME, notificationTime.toISOString());
      
      if (notificationsEnabled) {
        const stats = await getLearningStats();
        await scheduleReviewNotification(stats.wordsToReview, {
          hour: notificationTime.getHours(),
          minute: notificationTime.getMinutes()
        });
        Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
      } else {
        // Cancela notificações se estiverem desativadas
        await scheduleReviewNotification(0);
        Alert.alert('Sucesso', 'Notificações desativadas.');
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      Alert.alert('Erro', 'Falha ao salvar configurações.');
    }
  };

  // Manipula alteração no horário da notificação
  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setNotificationTime(selectedDate);
    }
  };

  // Função para resetar o vocabulário
  const handleResetVocabulary = () => {
    Alert.alert(
      'Resetar Vocabulário',
      'Isso irá apagar todo o seu progresso de aprendizado. Esta ação não pode ser desfeita. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Resetar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await resetVocabularyOnly();
              Alert.alert('Sucesso', 'Vocabulário resetado com sucesso. O aplicativo será reiniciado.');
              // Navegar de volta para a tela inicial para forçar o recarregamento
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            } catch (error) {
              console.error('Erro ao resetar vocabulário:', error);
              Alert.alert('Erro', 'Falha ao resetar vocabulário.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
        <Text style={styles.loadingText}>Carregando configurações...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Configurações</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Ativar notificações de revisão</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: COLORS.neutral.light, true: COLORS.primary.light }}
            thumbColor={notificationsEnabled ? COLORS.primary.main : COLORS.neutral.main}
          />
        </View>
        
        {notificationsEnabled && (
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Horário da notificação</Text>
            <TouchableOpacity 
              style={styles.timeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timeText}>
                {notificationTime.getHours().toString().padStart(2, '0')}:
                {notificationTime.getMinutes().toString().padStart(2, '0')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        
        {showTimePicker && (
          <DateTimePicker
            value={notificationTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={saveSettings}
      >
        <Text style={styles.saveButtonText}>Salvar Configurações</Text>
      </TouchableOpacity>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gerenciamento de Dados</Text>
        <Text style={styles.warningText}>
          As opções abaixo irão apagar seus dados. Use com cuidado!
        </Text>
        
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={handleResetVocabulary}
        >
          <Text style={styles.resetButtonText}>Resetar Vocabulário</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
        <Text style={styles.aboutText}>
          Este aplicativo utiliza o sistema de repetição espaçada para ajudar você a memorizar palavras em inglês de forma eficiente.
        </Text>
        <Text style={styles.aboutText}>
          Com base na curva de esquecimento de Ebbinghaus, o aplicativo programa revisões em intervalos calculados para otimizar sua retenção.
        </Text>
        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  contentContainer: {
    padding: SIZES.spacing.medium,
    paddingBottom: SIZES.spacing.xl, // Espaço extra no final para o scroll
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.spacing.medium,
    fontSize: SIZES.fontSize.medium,
    color: COLORS.text.secondary,
  },
  title: {
    fontSize: SIZES.fontSize.header,
    fontWeight: 'bold',
    marginBottom: SIZES.spacing.large,
    color: COLORS.text.primary,
  },
  section: {
    backgroundColor: COLORS.background.card,
    borderRadius: SIZES.borderRadius.large,
    padding: SIZES.spacing.medium,
    marginBottom: SIZES.spacing.large,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: SIZES.fontSize.large,
    fontWeight: 'bold',
    marginBottom: SIZES.spacing.medium,
    color: COLORS.primary.main,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.medium,
    paddingVertical: SIZES.spacing.small,
  },
  settingLabel: {
    fontSize: SIZES.fontSize.medium,
    color: COLORS.text.primary,
  },
  timeButton: {
    backgroundColor: COLORS.background.main,
    paddingHorizontal: SIZES.spacing.medium,
    paddingVertical: SIZES.spacing.small,
    borderRadius: SIZES.borderRadius.medium,
    ...SHADOWS.small,
  },
  timeText: {
    color: COLORS.text.primary,
    fontSize: SIZES.fontSize.medium,
  },
  saveButton: {
    backgroundColor: COLORS.primary.main,
    borderRadius: SIZES.borderRadius.large,
    padding: SIZES.spacing.medium,
    alignItems: 'center',
    marginBottom: SIZES.spacing.large,
    ...SHADOWS.small,
  },
  saveButtonText: {
    color: COLORS.text.contrast,
    fontWeight: 'bold',
    fontSize: SIZES.fontSize.large,
  },
  resetButton: {
    backgroundColor: COLORS.accent.main,
    borderRadius: SIZES.borderRadius.large,
    padding: SIZES.spacing.medium,
    alignItems: 'center',
    marginTop: SIZES.spacing.medium,
    ...SHADOWS.small,
  },
  resetButtonText: {
    color: COLORS.text.contrast,
    fontWeight: 'bold',
    fontSize: SIZES.fontSize.medium,
  },
  warningText: {
    color: COLORS.accent.main,
    fontSize: SIZES.fontSize.small,
    marginBottom: SIZES.spacing.small,
  },
  aboutText: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.text.secondary,
    marginBottom: SIZES.spacing.small,
    lineHeight: 20,
  },
  versionText: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.text.hint,
    marginTop: SIZES.spacing.medium,
    textAlign: 'center',
  },
});

export default SettingsScreen;