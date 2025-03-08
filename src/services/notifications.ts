import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Registra o dispositivo para receber notificações push
 */
export const registerForPushNotificationsAsync = async (): Promise<string | undefined> => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.error('Falha ao obter permissão para notificações push!');
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
    
    return (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.warn('É necessário um dispositivo físico para notificações push');
  }
};

/**
 * Agenda uma notificação diária para revisão de palavras
 */
export const scheduleReviewNotification = async (
  wordsCount: number,
  notificationTime: { hour: number; minute: number } = { hour: 9, minute: 0 }
): Promise<void> => {
  // Cancela notificações agendadas anteriormente
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  if (wordsCount > 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora de revisar seu vocabulário!',
        body: `Você tem ${wordsCount} palavras para revisar hoje.`,
        sound: true,
      },
      trigger: {
        hour: notificationTime.hour,
        minute: notificationTime.minute,
        repeats: true,
      },
    });
  }
};

/**
 * Configura o tratamento de notificações
 */
export const configureNotifications = (): void => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};