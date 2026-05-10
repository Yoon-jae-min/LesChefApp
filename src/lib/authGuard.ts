import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getAccessToken } from '../api/tokenStorage';

export type LoginReturnTarget = {
  name: string;
  params?: Record<string, unknown>;
};

export async function checkLoggedIn(): Promise<boolean> {
  const [loggedInFlag, accessToken] = await Promise.all([
    AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN),
    getAccessToken(),
  ]);
  return loggedInFlag === 'true' || Boolean(accessToken);
}

export async function requireLogin(
  navigation: any,
  returnTo?: LoginReturnTarget,
  options: { fromSource?: string; showAlert?: boolean } = {},
): Promise<boolean> {
  if (await checkLoggedIn()) {
    return true;
  }

  if (returnTo) {
    await AsyncStorage.setItem(STORAGE_KEYS.RETURN_TO, JSON.stringify(returnTo));
  }
  if (options.fromSource) {
    await AsyncStorage.setItem(STORAGE_KEYS.FROM_SOURCE, options.fromSource);
  } else {
    await AsyncStorage.removeItem(STORAGE_KEYS.FROM_SOURCE);
  }

  if (options.showAlert !== false) {
    Alert.alert('로그인 필요', '로그인 후 이용할 수 있습니다.');
  }
  navigation.navigate('Login', { returnTo, fromSource: options.fromSource });
  return false;
}

export async function consumeLoginReturnTarget(): Promise<LoginReturnTarget | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.RETURN_TO);
  await AsyncStorage.multiRemove([STORAGE_KEYS.RETURN_TO, STORAGE_KEYS.FROM_SOURCE]);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as LoginReturnTarget;
  } catch {
    return null;
  }
}
