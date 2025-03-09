import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

/**
 * Hook personalizado para gerenciar notificações
 */
export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Configura os ouvintes de notificação
    const setupNotificationListeners = async () => {
      // Configura o comportamento das notificações recebidas
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Obtém o token de push (para uso futuro, se necessário)
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);

      // Ouvinte para notificações recebidas enquanto o app está em primeiro plano
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      // Ouvinte para resposta do usuário às notificações
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // Aqui você pode adicionar lógica para lidar com a interação do usuário
        console.log('Notificação respondida:', response);
      });
    };

    setupNotificationListeners();

    // Limpa os ouvintes quando o componente é desmontado
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  /**
   * Agenda uma notificação diária para revisão de palavras
   */
  const scheduleReviewNotification = async (
    wordsCount: number
  ): Promise<void> => {
    try {
      // Obtém as configurações de notificação do armazenamento
      const enabledSetting = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_ENABLED);
      const notificationsEnabled = enabledSetting !== 'false';
      
      if (!notificationsEnabled || wordsCount === 0) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        return;
      }
      
      const timeSetting = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_TIME);
      let notificationTime = new Date();
      
      if (timeSetting) {
        notificationTime = new Date(timeSetting);
      } else {
        // Horário padrão: 9:00
        notificationTime.setHours(9, 0, 0, 0);
      }
      
      // Cancela notificações agendadas anteriormente
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      // Agenda a nova notificação usando o trigger DailyTriggerInput
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hora de revisar seu vocabulário!',
          body: `Você tem ${wordsCount} palavras para revisar hoje.`,
          sound: true,
        },
        trigger: {
          hour: notificationTime.getHours(),
          minute: notificationTime.getMinutes(),
          repeats: true,
        }        
      });
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  };

  return {
    expoPushToken,
    notification,
    scheduleReviewNotification,
  };
};

/**
 * Registra o dispositivo para receber notificações push
 */
async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  if (Platform.OS !== 'web') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.warn('Permissão para notificações não concedida!');
      return;
    }
    
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }
}