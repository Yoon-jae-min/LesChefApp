// 웹 구조를 기반으로 새로 구성한 App
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

// Components
import HomePage from './src/components/Home/HomePage';
import RecipePage from './src/components/recipe/RecipePage';
import RecipeDetailPage from './src/components/recipe/RecipeDetailPage';
import BoardPage from './src/components/Board/BoardPage';
import MyPage from './src/components/myPage/MyPage';
import MyPageInfo from './src/components/myPage/InfoPage';
import MyPageStorage from './src/components/myPage/StoragePage';
import LoginPage from './src/components/Auth/LoginPage';
import SignUpPage from './src/components/Auth/SignUpPage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  useEffect(() => {
    // 앱이 처음 시작될 때만 true로 설정
    // 이 값은 앱이 완전히 종료된 후 재시작될 때도 true가 됨
    setIsAppInitialized(true);
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home">
              {(props) => <HomePage {...props} isAppInitialized={isAppInitialized} />}
            </Stack.Screen>
            <Stack.Screen 
              name="Recipe" 
              component={RecipePage}
              initialParams={{ category: 'korean' }}
            />
            <Stack.Screen 
              name="RecipeDetail" 
              component={RecipeDetailPage}
            />
            <Stack.Screen 
              name="Board" 
              component={BoardPage}
              initialParams={{ category: 'notice' }}
            />
            <Stack.Screen name="MyPage" component={MyPage} />
            <Stack.Screen name="MyPageInfo" component={MyPageInfo} />
            <Stack.Screen name="MyPageStorage" component={MyPageStorage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
          </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
