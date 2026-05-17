// 웹의 Top 컴포넌트를 React Native로 변환
import React, { useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, Platform, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, borderRadius, shadows } from '../../styles/theme';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { logout as apiLogout } from '../../api/auth/logout';
import { clearUserSession } from '../../lib/session';
import { Images } from '../../assets/images';

function Top(): React.JSX.Element {
  const navigation = useNavigation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkLogin = async () => {
        try {
          const loggedIn = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
          setIsLoggedIn(loggedIn);
        } catch (error) {
          console.error('로그인 상태 확인 실패:', error);
        }
      };
      
      checkLogin();
    }, [])
  );

  const performLogout = async () => {
    try {
      try {
        await apiLogout();
      } catch {
        /* 네트워크 실패 시에도 로컬 세션은 정리 */
      }
      await clearUserSession();
      setIsLoggedIn(false);
      (navigation as any).navigate('Main', { screen: 'Home' });
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleAuthAction = async () => {
    if (!isLoggedIn) {
      // 로그인 페이지로 이동
      (navigation as any).navigate('Login');
      return;
    }

    Alert.alert('로그아웃', '로그아웃하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: performLogout },
    ]);
  };

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* 로고 */}
            <Pressable
              onPress={() => {
                (navigation as any).navigate('Main', { screen: 'Home' });
              }}
              style={styles.logoContainer}
            >
              <Image source={Images.LesChef_AppIconMark} style={styles.logoMark} resizeMode="contain" />
            </Pressable>

            {/* 주요 섹션 이동은 하단 탭에서 처리 — 헤더는 검색·계정만 */}
            <View style={styles.actionsContainer}>
              <Pressable 
                onPress={handleAuthAction}
                style={styles.iconButton}
              >
                {isLoggedIn ? (
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray700} strokeWidth="1.5">
                    <Path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" strokeLinecap="round"/>
                    <Path d="M14 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M19 12H9" strokeLinecap="round"/>
                  </Svg>
                ) : (
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray700} strokeWidth="1.5">
                    <Path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" strokeLinecap="round"/>
                    <Path d="M10 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M5 12h10" strokeLinecap="round"/>
                  </Svg>
                )}
              </Pressable>

              {/* 검색 아이콘 - 모바일에서만 표시 */}
              {Platform.OS !== 'web' && (
                <Pressable 
                  onPress={() => setIsSearchExpanded(!isSearchExpanded)}
                  style={styles.searchIconButton}
                >
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray700} strokeWidth="1.5">
                    <Circle cx="11" cy="11" r="8"/>
                    <Path d="m21 21-4.35-4.35"/>
                  </Svg>
                </Pressable>
              )}
            </View>

            {/* 검색바 - 데스크톱에서만 표시 (웹에서만) */}
            {Platform.OS === 'web' && (
              <View style={styles.searchContainerDesktop}>
                <View style={styles.searchInputWrapper}>
                  <TextInput 
                    placeholder="검색..." 
                    style={styles.searchInput}
                    placeholderTextColor={colors.gray500}
                  />
                  <View style={styles.searchIconContainer}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.gray400} strokeWidth="1.5">
                      <Circle cx="11" cy="11" r="8"/>
                      <Path d="m21 21-4.35-4.35"/>
                    </Svg>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* 확장된 검색바 - 모바일에서만 표시 */}
      {isSearchExpanded && Platform.OS !== 'web' && (
        <View style={styles.expandedSearchContainer}>
          <View style={styles.expandedSearchWrapper}>
            <View style={styles.expandedSearchInputWrapper}>
              <TextInput 
                placeholder="검색..." 
                style={styles.expandedSearchInput}
                placeholderTextColor={colors.gray500}
                autoFocus
              />
              <View style={styles.expandedSearchIconContainer}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.gray400} strokeWidth="1.5">
                  <Circle cx="11" cy="11" r="8"/>
                  <Path d="m21 21-4.35-4.35"/>
                </Svg>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    ...shadows.header,
  },
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingVertical: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    paddingLeft: 0,
    paddingRight: 16,
    maxWidth: 1152, // max-w-6xl = 1152px
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  logoMark: {
    width: 96,
    height: 56,
    marginLeft: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    gap: 10,
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  searchIconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  searchContainerDesktop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 12,
  },
  searchInputWrapper: {
    position: 'relative',
    width: 192, // w-48 = 192px (기본), md:w-56, lg:w-72
  },
  searchInput: {
    width: '100%',
    height: 40,
    paddingLeft: 40,
    paddingRight: 16,
    backgroundColor: colors.stone100,
    borderRadius: borderRadius.xl,
    borderWidth: 0,
    fontSize: 14,
    color: colors.gray900,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedSearchContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...shadows.header,
  },
  expandedSearchWrapper: {
    maxWidth: 1152,
    alignSelf: 'center',
    width: '100%',
  },
  expandedSearchInputWrapper: {
    position: 'relative',
    width: '100%',
  },
  expandedSearchInput: {
    width: '100%',
    height: 48,
    paddingLeft: 48,
    paddingRight: 16,
    backgroundColor: colors.stone100,
    borderRadius: borderRadius.xl,
    borderWidth: 0,
    fontSize: 14,
    color: colors.gray900,
  },
  expandedSearchIconContainer: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Top;

