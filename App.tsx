// 웹 구조를 기반으로 새로 구성한 App
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { AppInitProvider } from './src/context/AppInitContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  useEffect(() => {
    setIsAppInitialized(true);
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <AppInitProvider isAppInitialized={isAppInitialized}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AppInitProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
