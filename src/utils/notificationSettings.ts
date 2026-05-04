import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export interface NotificationSettings {
  enabled: boolean;
  showExpired: boolean;
  showUrgent: boolean;
  showWarning: boolean;
  showNotice: boolean;
  autoClose: boolean;
  autoCloseDuration: number;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  showExpired: true,
  showUrgent: true,
  showWarning: true,
  showNotice: false,
  autoClose: true,
  autoCloseDuration: 5000,
};

const SETTINGS_KEY = STORAGE_KEYS.NOTIFICATION_SETTINGS;

export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const stored = await AsyncStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<NotificationSettings>;
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

export async function saveNotificationSettings(settings: Partial<NotificationSettings>): Promise<void> {
  const current = await getNotificationSettings();
  const updated = { ...current, ...settings };
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
}

export async function resetNotificationSettings(): Promise<void> {
  await AsyncStorage.removeItem(SETTINGS_KEY);
}
