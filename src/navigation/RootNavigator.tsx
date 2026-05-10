import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

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
import RequireAuth from '../components/Auth/RequireAuth';
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

type TabIconName = 'Home' | 'Recipe' | 'Board' | 'MyPage';

function TabBarIcon({ name, focused }: { name: TabIconName; focused: boolean }): React.JSX.Element {
  const stroke = focused ? colors.orange600 : colors.stone500;
  const commonProps = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
  };
  const strokeProps = {
    stroke,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <View
      style={{
        width: 36,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? colors.orange100 : 'transparent',
      }}
    >
      {name === 'Home' && (
        <Svg {...commonProps}>
          <Path {...strokeProps} d="M3.5 11.5 12 4l8.5 7.5" />
          <Path {...strokeProps} d="M5.5 10.5V20h13v-9.5" />
          <Path {...strokeProps} d="M9.5 20v-5h5v5" />
        </Svg>
      )}
      {name === 'Recipe' && (
        <Svg {...commonProps}>
          <Path {...strokeProps} d="M4 17h16" />
          <Path {...strokeProps} d="M6 17c.6-4.4 3-7 6-7s5.4 2.6 6 7" />
          <Path {...strokeProps} d="M12 7v3" />
          <Path {...strokeProps} d="M10.4 7h3.2" />
          <Path {...strokeProps} d="M8 20h8" />
        </Svg>
      )}
      {name === 'Board' && (
        <Svg {...commonProps}>
          <Rect {...strokeProps} x="5" y="4" width="14" height="16" rx="2" />
          <Path {...strokeProps} d="M8.5 8h7" />
          <Path {...strokeProps} d="M8.5 12h7" />
          <Path {...strokeProps} d="M8.5 16h4" />
        </Svg>
      )}
      {name === 'MyPage' && (
        <Svg {...commonProps}>
          <Circle {...strokeProps} cx="12" cy="8" r="3.5" />
          <Path {...strokeProps} d="M5 20c1.2-3.3 3.5-5 7-5s5.8 1.7 7 5" />
        </Svg>
      )}
    </View>
  );
}

function ProtectedRecipeWritePage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'Recipe', params: { screen: 'RecipeWrite' } } }}>
      <RecipeWritePage />
    </RequireAuth>
  );
}

function ProtectedRecipeEditPage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'Recipe', params: { screen: 'RecipeList' } } }}>
      <RecipeEditPage />
    </RequireAuth>
  );
}

function ProtectedBoardWritePage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'Board', params: { screen: 'BoardWrite' } } }}>
      <BoardWritePage />
    </RequireAuth>
  );
}

function ProtectedBoardEditPage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'Board', params: { screen: 'BoardList' } } }}>
      <BoardEditPage />
    </RequireAuth>
  );
}

function ProtectedMyPage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'MyPage', params: { screen: 'MyPageMain' } } }} fromSource="mypage">
      <MyPage />
    </RequireAuth>
  );
}

function ProtectedMyPageInfo(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'MyPage', params: { screen: 'MyPageInfo' } } }} fromSource="mypage">
      <MyPageInfo />
    </RequireAuth>
  );
}

function ProtectedMyPageStorage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'MyPage', params: { screen: 'MyPageStorage' } } }} fromSource="mypage">
      <MyPageStorage />
    </RequireAuth>
  );
}

function ProtectedMyPageRecipes(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'MyPage', params: { screen: 'MyPageRecipes' } } }} fromSource="mypage">
      <MyRecipesPage />
    </RequireAuth>
  );
}

function ProtectedMyPageFavorites(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'MyPage', params: { screen: 'MyPageFavorites' } } }} fromSource="mypage">
      <MyFavoritesPage />
    </RequireAuth>
  );
}

function ProtectedNotificationSettingsPage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'MyPage', params: { screen: 'NotificationSettings' } } }} fromSource="mypage">
      <NotificationSettingsPage />
    </RequireAuth>
  );
}

function ProtectedExpiryInboxPage(): React.JSX.Element {
  return (
    <RequireAuth returnTo={{ name: 'Main', params: { screen: 'MyPage', params: { screen: 'ExpiryInbox' } } }} fromSource="mypage">
      <ExpiryInboxPage />
    </RequireAuth>
  );
}

function RecipeStackScreen(): React.JSX.Element {
  return (
    <RecipeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <RecipeStackNav.Screen
        name="RecipeList"
        component={RecipePage}
        initialParams={{ category: 'korean' }}
      />
      <RecipeStackNav.Screen name="RecipeDetail" component={RecipeDetailPage} />
      <RecipeStackNav.Screen name="RecipeWrite" component={ProtectedRecipeWritePage} />
      <RecipeStackNav.Screen name="RecipeEdit" component={ProtectedRecipeEditPage} />
    </RecipeStackNav.Navigator>
  );
}

function BoardStackScreen(): React.JSX.Element {
  return (
    <BoardStackNav.Navigator screenOptions={{ headerShown: false }}>
      <BoardStackNav.Screen
        name="BoardList"
        component={BoardPage}
        initialParams={{ category: 'notice' }}
      />
      <BoardStackNav.Screen name="BoardDetail" component={BoardDetailPage} />
      <BoardStackNav.Screen name="BoardWrite" component={ProtectedBoardWritePage} />
      <BoardStackNav.Screen name="BoardEdit" component={ProtectedBoardEditPage} />
    </BoardStackNav.Navigator>
  );
}

function MyStackScreen(): React.JSX.Element {
  return (
    <MyStackNav.Navigator initialRouteName="MyPageMain" screenOptions={{ headerShown: false }}>
      <MyStackNav.Screen name="MyPageMain" component={ProtectedMyPage} />
      <MyStackNav.Screen name="MyPageInfo" component={ProtectedMyPageInfo} />
      <MyStackNav.Screen name="MyPageStorage" component={ProtectedMyPageStorage} />
      <MyStackNav.Screen name="MyPageRecipes" component={ProtectedMyPageRecipes} />
      <MyStackNav.Screen name="MyPageFavorites" component={ProtectedMyPageFavorites} />
      <MyStackNav.Screen name="NotificationSettings" component={ProtectedNotificationSettingsPage} />
      <MyStackNav.Screen name="ExpiryInbox" component={ProtectedExpiryInboxPage} />
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
        tabBarActiveTintColor: colors.orange600,
        tabBarInactiveTintColor: colors.stone500,
        tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: '700', marginTop: 2 },
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPad,
          height: tabBarHeight + 4,
          borderTopWidth: 1,
          borderTopColor: colors.stone200,
          backgroundColor: colors.white,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          return <TabBarIcon name={route.name as TabIconName} focused={focused} />;
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
