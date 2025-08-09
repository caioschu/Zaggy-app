import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configuração das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface NotificationData {
  title: string;
  body: string;
  data?: any;
  categoryId?: string;
  priority?: 'low' | 'normal' | 'high' | 'max';
  sound?: string;
}

export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'web') {
    return { status: 'granted' };
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return { status: finalStatus };
};

export const getExpoPushToken = async () => {
  if (Platform.OS === 'web') {
    return null;
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    });
    return token.data;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
};

export const scheduleLocalNotification = async (notification: NotificationData, trigger?: any) => {
  if (Platform.OS === 'web') {
    // Web fallback - could use browser notifications
    return null;
  }

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        data: notification.data || {},
        sound: notification.sound || 'default',
        priority: notification.priority || 'normal',
      },
      trigger: trigger || null,
    });
    return id;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

// Tipos específicos de notificações
export const notificationTypes = {
  CNH_VENCENDO: {
    title: '⚠️ CNH Vencendo!',
    body: 'Sua CNH vence em {dias} dias. Renove agora!',
    categoryId: 'critical',
    priority: 'high' as const,
    sound: 'urgent.wav'
  },
  MULTA_VENCENDO: {
    title: '🚨 Multa Vencendo',
    body: 'Multa de R$ {valor} vence amanhã. Pague com desconto!',
    categoryId: 'warning',
    priority: 'high' as const,
    sound: 'warning.wav'
  },
  DAS_VENCENDO: {
    title: '📋 DAS MEI Vencendo',
    body: 'DAS de {mes} vence em {dias} dias - R$ {valor}',
    categoryId: 'info',
    priority: 'normal' as const
  },
  VAGA_DISPONIVEL: {
    title: '🎯 Nova Vaga Disponível!',
    body: '{restaurante} - R$ {valor} • {distancia}m de você',
    categoryId: 'opportunity',
    priority: 'high' as const,
    sound: 'opportunity.wav'
  },
  COMBUSTIVEL_BAIXO: {
    title: '⛽ Combustível Baixo',
    body: 'Apenas {nivel}% restante. Posto barato a {distancia}m',
    categoryId: 'info',
    priority: 'normal' as const
  },
  OFERTA_PERSONALIZADA: {
    title: '🎁 Oferta Especial para Você!',
    body: '{desconto}% OFF em {categoria} • Válido até {validade}',
    categoryId: 'offer',
    priority: 'normal' as const
  }
};

export const sendCriticalNotification = async (type: keyof typeof notificationTypes, data: any) => {
  const template = notificationTypes[type];
  
  let body = template.body;
  Object.keys(data).forEach(key => {
    body = body.replace(`{${key}}`, data[key]);
  });

  return await scheduleLocalNotification({
    title: template.title,
    body,
    categoryId: template.categoryId,
    priority: template.priority,
    sound: template.sound,
    data: { type, ...data }
  });
};

// Configurar categorias de notificação
export const setupNotificationCategories = async () => {
  if (Platform.OS === 'web') {
    return;
  }

  await Notifications.setNotificationCategoryAsync('critical', [
    {
      identifier: 'view',
      buttonTitle: 'Ver Detalhes',
      options: { opensAppToForeground: true },
    },
    {
      identifier: 'dismiss',
      buttonTitle: 'Dispensar',
      options: { opensAppToForeground: false },
    },
  ]);

  await Notifications.setNotificationCategoryAsync('opportunity', [
    {
      identifier: 'accept',
      buttonTitle: 'Aceitar Vaga',
      options: { opensAppToForeground: true },
    },
    {
      identifier: 'view',
      buttonTitle: 'Ver Detalhes',
      options: { opensAppToForeground: true },
    },
  ]);
};

// Agendar notificações recorrentes
export const scheduleRecurringChecks = async () => {
  // Verificação diária de documentos às 9h
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔍 Verificação Diária',
      body: 'Verificando seus documentos...',
      data: { type: 'daily_check' },
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });

  // Lembrete de lançar receitas às 20h
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💰 Lançar Receitas',
      body: 'Não esqueça de lançar as receitas de hoje!',
      data: { type: 'daily_finance_reminder' },
    },
    trigger: {
      hour: 20,
      minute: 0,
      repeats: true,
    },
  });
};