import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications are handled when received
export const initializeNotifications = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('tasks-default', {
      name: 'Task Reminders',
      importance: Notifications.AndroidImportance.MAX,
      sound: 'default',
      enableVibrate: true,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
      vibrationPattern: [250, 250, 500, 250],
      lightColor: '#0d9488',
    });
  }
};

export const requestPermissionsIfNeeded = async (): Promise<boolean> => {
  const settings = await Notifications.getPermissionsAsync();
  let granted = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;

  if (!granted) {
    const req = await Notifications.requestPermissionsAsync();
    granted = req.granted || req.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;
  }
  return !!granted;
};

export const scheduleTaskReminder = async (
  title: string,
  body: string,
  fireDate: Date,
): Promise<string> => {
  // Ensure we schedule only for future times
  const now = Date.now();
  if (fireDate.getTime() <= now + 5000) {
    // if within 5s or in the past, add slight delay
    fireDate = new Date(now + 5000);
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {
      channelId: Platform.OS === 'android' ? 'tasks-default' : undefined,
      date: fireDate,
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    } as any,
  });
  return id;
};

export const cancelScheduledNotification = async (notificationId?: string) => {
  if (!notificationId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (e) {
    // no-op if not found
  }
};
