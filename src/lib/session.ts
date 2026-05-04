import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';
import type { LoginResponse } from '../api/auth/types';

export async function persistUserSession(result: LoginResponse): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
  await AsyncStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify({
      id: result.id,
      name: result.name,
      nickName: result.nickName,
      tel: result.tel,
    }),
  );
}

export async function clearUserSession(): Promise<void> {
  await AsyncStorage.multiRemove([STORAGE_KEYS.IS_LOGGED_IN, STORAGE_KEYS.CURRENT_USER]);
}
