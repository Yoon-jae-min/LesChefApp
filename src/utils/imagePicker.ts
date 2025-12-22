// 이미지 선택 유틸리티 - Expo Go와 에뮬레이터 모두 지원
// require를 사용하지 않고 정적 import만 사용

import { Platform } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';

// react-native-image-picker는 Expo Go에서 작동하지 않으므로
// Expo Go 환경에서는 expo-image-picker만 사용
// 에뮬레이터 환경에서는 react-native-image-picker를 별도로 import 필요

// 이미지 선택 방법 타입
export type ImagePickerMethod = 'expo' | 'react-native' | 'auto';

// 환경 감지 함수
export const detectEnvironment = (): 'expo' | 'native' => {
  try {
    // Expo Go 환경 감지
    if (typeof (global as any).__DEV__ !== 'undefined' && 
        (global as any).__DEV__ && 
        (typeof (global as any).Expo !== 'undefined' || 
         typeof (global as any).expo !== 'undefined')) {
      return 'expo';
    }
    return 'native';
  } catch {
    return 'native';
  }
};

// 선택된 이미지 결과 타입 (통합)
export interface UnifiedImageResult {
  uri: string;
  type?: string;
  fileName?: string;
  fileSize?: number;
  width?: number;
  height?: number;
}

// Expo Image Picker 사용 (Expo Go와 Development Build 모두 지원)
const pickImageExpo = async (source: 'camera' | 'library'): Promise<UnifiedImageResult | null> => {
  try {
    // 권한 요청
    if (source === 'camera') {
      const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('카메라 권한이 필요합니다.');
      }
    } else {
      const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('갤러리 권한이 필요합니다.');
      }
    }

    // 이미지 선택
    const result = source === 'camera'
      ? await ExpoImagePicker.launchCameraAsync({
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        })
      : await ExpoImagePicker.launchImageLibraryAsync({
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });

    if (result.canceled) {
      return null;
    }

    const asset = result.assets[0];
    return {
      uri: asset.uri,
      type: asset.type || undefined,
      fileName: asset.fileName || undefined,
      fileSize: asset.fileSize || undefined,
      width: asset.width || undefined,
      height: asset.height || undefined,
    };
  } catch (error: any) {
    throw new Error(error.message || '이미지 선택 중 오류가 발생했습니다.');
  }
};

// React Native Image Picker 사용 (에뮬레이터용)
// Expo Go에서는 사용 불가
const pickImageReactNative = async (source: 'camera' | 'library'): Promise<UnifiedImageResult | null> => {
  // 동적 import 사용 (런타임에만 로드)
  const RNImagePicker = await import('react-native-image-picker');
  
  try {
    const result = source === 'camera'
      ? await RNImagePicker.launchCamera({ mediaType: 'photo' })
      : await RNImagePicker.launchImageLibrary({ mediaType: 'photo' });

    if (result.didCancel) {
      return null;
    }

    if (result.errorCode) {
      let errorMessage = '이미지를 선택할 수 없습니다.';
      switch (result.errorCode) {
        case 'camera_unavailable':
          errorMessage = '카메라를 사용할 수 없습니다.';
          break;
        case 'permission':
          errorMessage = '카메라 또는 갤러리 접근 권한이 필요합니다.';
          break;
        case 'others':
          errorMessage = result.errorMessage || errorMessage;
          break;
      }
      throw new Error(errorMessage);
    }

    if (!result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];
    return {
      uri: asset.uri || '',
      type: asset.type || undefined,
      fileName: asset.fileName || undefined,
      fileSize: asset.fileSize || undefined,
      width: asset.width || undefined,
      height: asset.height || undefined,
    };
  } catch (error: any) {
    throw new Error(error.message || '이미지 선택 중 오류가 발생했습니다.');
  }
};

// 통합 이미지 선택 함수
export const pickImage = async (
  source: 'camera' | 'library',
  method: ImagePickerMethod = 'auto'
): Promise<UnifiedImageResult | null> => {
  let selectedMethod: 'expo' | 'react-native' = 'expo';

  // 방법 선택
  if (method === 'auto') {
    const env = detectEnvironment();
    // Expo Go 환경이면 expo만 사용, 그 외에는 expo 우선 시도
    selectedMethod = env === 'expo' ? 'expo' : 'expo';
  } else if (method === 'expo') {
    selectedMethod = 'expo';
  } else {
    // react-native 선택 시 Expo Go 환경이면 expo로 폴백
    const env = detectEnvironment();
    selectedMethod = env === 'expo' ? 'expo' : 'react-native';
  }

  // 선택된 방법으로 이미지 선택
  try {
    if (selectedMethod === 'expo') {
      return await pickImageExpo(source);
    } else {
      return await pickImageReactNative(source);
    }
  } catch (error: any) {
    // 실패 시 다른 방법으로 폴백
    if (selectedMethod === 'expo') {
      const env = detectEnvironment();
      if (env !== 'expo') {
        // Expo Go가 아닌 경우에만 react-native로 폴백 시도
        console.warn('Expo Image Picker 실패, React Native Image Picker로 시도합니다.');
        try {
          return await pickImageReactNative(source);
        } catch (fallbackError: any) {
          throw new Error(fallbackError.message || '이미지 선택 중 오류가 발생했습니다.');
        }
      }
    }
    throw error;
  }
};

// 현재 사용 가능한 이미지 선택 방법 확인
export const getAvailableMethods = (): ('expo' | 'react-native')[] => {
  const methods: ('expo' | 'react-native')[] = [];
  const env = detectEnvironment();
  
  // Expo Image Picker는 항상 사용 가능
  methods.push('expo');
  
  // React Native Image Picker는 Expo Go가 아닌 경우에만 사용 가능
  if (env !== 'expo') {
    methods.push('react-native');
  }
  
  return methods;
};
