import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Switch, 
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import { STORAGE_KEYS } from '../constants';
import { scheduleReviewNotification } from '../services/notifications';
import { getLearningStats } from '../services/database';

const SettingsScreen: React.FC = () => {
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando configurações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Ativar notificações de revisão</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#81c784' }}
            thumbColor={notificationsEnabled ? '#4caf50' : '#f4f3f4'}
          />
        </View>
        
        {notificationsEnabled && (
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Horário da notificação</Text>
            <TouchableOpacity 
              style={styles.timeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>
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
        <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
        <Text style={styles.aboutText}>
          Este aplicativo utiliza o sistema de repetição espaçada para ajudar você a memorizar palavras em inglês de forma eficiente.
        </Text>
        <Text style={styles.aboutText}>
          Com base na curva de esquecimento de Ebbinghaus, o aplicativo programa revisões em intervalos calculados para otimizar sua retenção.
        </Text>
        <Text style={styles.versionText}>Versão 1.0.0</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4caf50',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  timeButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default SettingsScreen;