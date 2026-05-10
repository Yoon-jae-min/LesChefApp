// 웹 구조를 기반으로 새로 구성한 App
import React, { useCallback, useState, useEffect } from 'react';
import { Alert, BackHandler, Linking, Platform, ToastAndroid } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { AppInitProvider } from './src/context/AppInitContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { setTokens } from './src/api/tokenStorage';
import { persistUserSession } from './src/lib/session';
import { consumeLoginReturnTarget } from './src/lib/authGuard';
import StartupSplash from './src/components/common/StartupSplash';

const navigationRef = createNavigationContainerRef();
const EXIT_BACK_PRESS_DELAY_MS = 2000;
let lastBackPressedAt = 0;

function parseFragmentParams(url: string): Record<string, string> {
  const fragment = url.split('#')[1] || '';
  return fragment.split('&').reduce<Record<string, string>>((acc, pair) => {
    if (!pair) {
      return acc;
    }
    const [rawKey, rawValue = ''] = pair.split('=');
    if (!rawKey) {
      return acc;
    }
    acc[decodeURIComponent(rawKey)] = decodeURIComponent(rawValue);
    return acc;
  }, {});
}

async function handleSocialCallbackUrl(url: string): Promise<void> {
  if (!url.startsWith('leschefapp://social/callback')) {
    return;
  }

  const params = parseFragmentParams(url);
  if (params.linkStatus) {
    Alert.alert(
      params.linkStatus === 'success' ? '연동 완료' : '연동 실패',
      params.linkStatus === 'success'
        ? '소셜 계정이 연동되었습니다.'
        : params.message || '소셜 계정 연동에 실패했습니다.',
    );
    return;
  }

  const { accessToken, refreshToken, userId, name = '', nickName = '', tel = '' } = params;
  if (!accessToken || !refreshToken || !userId) {
    return;
  }

  await setTokens({ accessToken, refreshToken });
  await persistUserSession({
    text: 'login Success',
    id: userId,
    name,
    nickName,
    tel,
  });

  const returnTo = await consumeLoginReturnTarget();
  if (navigationRef.isReady()) {
    const navigation = navigationRef as ReturnType<typeof createNavigationContainerRef> & {
      navigate: (name: string, params?: object) => void;
    };
    if (returnTo) {
      navigation.navigate(returnTo.name, returnTo.params);
    } else {
      navigation.navigate('Main');
    }
  }
}

function App(): React.JSX.Element {
  const [showStartupSplash, setShowStartupSplash] = useState(true);

  const handleStartupSplashFinish = useCallback(() => {
    setShowStartupSplash(false);
  }, []);

  useEffect(() => {
    if (showStartupSplash) {
      return undefined;
    }

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleSocialCallbackUrl(url);
      }
    });

    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleSocialCallbackUrl(url);
    });

    return () => subscription.remove();
  }, [showStartupSplash]);

  useEffect(() => {
    if (showStartupSplash || Platform.OS !== 'android') {
      return undefined;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      const now = Date.now();
      if (now - lastBackPressedAt < EXIT_BACK_PRESS_DELAY_MS) {
        BackHandler.exitApp();
        return true;
      }

      lastBackPressedAt = now;
      ToastAndroid.show('한 번 더 누르면 종료됩니다.', ToastAndroid.SHORT);
      return true;
    });

    return () => subscription.remove();
  }, [showStartupSplash]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {showStartupSplash ? (
          <StartupSplash onFinish={handleStartupSplashFinish} />
        ) : (
          <Provider store={store}>
            <AppInitProvider isAppInitialized={false}>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
              </NavigationContainer>
            </AppInitProvider>
          </Provider>
        )}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
