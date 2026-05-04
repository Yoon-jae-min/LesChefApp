import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomePage from '../components/Home/HomePage';
import RecipePage from '../components/recipe/RecipePage';
import RecipeDetailPage from '../components/recipe/RecipeDetailPage';
import RecipeWritePage from '../components/recipe/RecipeWritePage';
import RecipeEditPage from '../components/recipe/RecipeEditPage';
import BoardPage from '../components/Board/BoardPage';
import BoardDetailPage from '../components/Board/BoardDetailPage';
import BoardWritePage from '../components/Board/BoardWritePage';
import BoardEditPage from '../components/Board/BoardEditPage';
import MyPage from '../components/myPage/MyPage';
import MyPageInfo from '../components/myPage/InfoPage';
import MyPageStorage from '../components/myPage/StoragePage';
import MyRecipesPage from '../components/myPage/MyRecipesPage';
import MyFavoritesPage from '../components/myPage/MyFavoritesPage';
import NotificationSettingsPage from '../components/myPage/NotificationSettingsPage';
import ExpiryInboxPage from '../components/myPage/ExpiryInboxPage';
import LoginPage from '../components/Auth/LoginPage';
import SignUpPage from '../components/Auth/SignUpPage';
import FindIdPage from '../components/Auth/FindIdPage';
import FindPasswordPage from '../components/Auth/FindPasswordPage';
import IngredientPricePage from '../components/ingredient/IngredientPricePage';

import { colors, fontSize } from '../styles/theme';

const RecipeStackNav = createNativeStackNavigator();
const BoardStackNav = createNativeStackNavigator();
const MyStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function RecipeStackScreen(): React.JSX.Element {
  return (
    <RecipeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <RecipeStackNav.Screen
        name="Recipe"
        component={RecipePage}
        initialParams={{ category: 'korean' }}
      />
      <RecipeStackNav.Screen name="RecipeDetail" component={RecipeDetailPage} />
      <RecipeStackNav.Screen name="RecipeWrite" component={RecipeWritePage} />
      <RecipeStackNav.Screen name="RecipeEdit" component={RecipeEditPage} />
    </RecipeStackNav.Navigator>
  );
}

function BoardStackScreen(): React.JSX.Element {
  return (
    <BoardStackNav.Navigator screenOptions={{ headerShown: false }}>
      <BoardStackNav.Screen
        name="Board"
        component={BoardPage}
        initialParams={{ category: 'notice' }}
      />
      <BoardStackNav.Screen name="BoardDetail" component={BoardDetailPage} />
      <BoardStackNav.Screen name="BoardWrite" component={BoardWritePage} />
      <BoardStackNav.Screen name="BoardEdit" component={BoardEditPage} />
    </BoardStackNav.Navigator>
  );
}

function MyStackScreen(): React.JSX.Element {
  return (
    <MyStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MyStackNav.Screen name="MyPage" component={MyPage} />
      <MyStackNav.Screen name="MyPageInfo" component={MyPageInfo} />
      <MyStackNav.Screen name="MyPageStorage" component={MyPageStorage} />
      <MyStackNav.Screen name="MyPageRecipes" component={MyRecipesPage} />
      <MyStackNav.Screen name="MyPageFavorites" component={MyFavoritesPage} />
      <MyStackNav.Screen name="NotificationSettings" component={NotificationSettingsPage} />
      <MyStackNav.Screen name="ExpiryInbox" component={ExpiryInboxPage} />
    </MyStackNav.Navigator>
  );
}

function MainTabs(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 10);
  const tabBarHeight = 52 + bottomPad;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.gray900,
        tabBarInactiveTintColor: colors.gray400,
        tabBarLabelStyle: { fontSize: fontSize.sm, fontWeight: '600' },
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: bottomPad,
          height: tabBarHeight,
          borderTopWidth: 1,
          borderTopColor: colors.gray200,
          backgroundColor: colors.white,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = {
            Home: '🏠',
            Recipe: '🍳',
            Board: '📋',
            MyPage: '👤',
          };
          return (
            <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.55 }}>
              {icons[route.name] ?? '·'}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ tabBarLabel: '홈' }} />
      <Tab.Screen name="Recipe" component={RecipeStackScreen} options={{ tabBarLabel: '레시피' }} />
      <Tab.Screen name="Board" component={BoardStackScreen} options={{ tabBarLabel: '게시판' }} />
      <Tab.Screen name="MyPage" component={MyStackScreen} options={{ tabBarLabel: '마이' }} />
    </Tab.Navigator>
  );
}

export function RootNavigator(): React.JSX.Element {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={MainTabs} />
      <RootStack.Screen name="Login" component={LoginPage} />
      <RootStack.Screen name="SignUp" component={SignUpPage} />
      <RootStack.Screen name="FindId" component={FindIdPage} />
      <RootStack.Screen name="FindPassword" component={FindPasswordPage} />
      <RootStack.Screen name="IngredientPrice" component={IngredientPricePage} />
    </RootStack.Navigator>
  );
}
