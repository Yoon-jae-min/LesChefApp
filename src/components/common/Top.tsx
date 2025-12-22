// 웹의 Top 컴포넌트를 React Native로 변환
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors, borderRadius, shadows } from '../../styles/theme';
import { Images } from '../../assets/images';

function Top(): React.JSX.Element {
  const navigation = useNavigation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkLogin = async () => {
        try {
          const loggedIn = await AsyncStorage.getItem('leschef_is_logged_in') === 'true';
          setIsLoggedIn(loggedIn);
        } catch (error) {
          console.error('로그인 상태 확인 실패:', error);
        }
      };
      
      checkLogin();
    }, [])
  );

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      // 로그아웃
      try {
        await AsyncStorage.removeItem('leschef_is_logged_in');
        setIsLoggedIn(false);
        // 홈으로 이동
        (navigation as any).navigate('Home');
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    } else {
      // 로그인 페이지로 이동
      (navigation as any).navigate('Login');
    }
  };

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* 로고 */}
            <Pressable 
              onPress={async () => {
                // 로고 클릭 플래그 설정
                await AsyncStorage.setItem('fromLogoClick', 'true');
                (navigation as any).navigate('Home', { fromLogoClick: true });
              }}
              style={styles.logoContainer}
            >
              <Text style={styles.logoText}>LesChef</Text>
            </Pressable>

            {/* 아이콘들 */}
            <View style={styles.iconsContainer}>
              {/* 요리 아이콘 */}
              <Pressable 
                onPress={() => navigation.navigate('Recipe' as never)}
                style={styles.iconButton}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray600} strokeWidth="1.5">
                  {/* 네모 몸체 - 아래 두 모서리만 라운드 처리 */}
                  <Path d="M4 13h14v6c0 1-1 2-2 2H6c-1 0-2-1-2-2v-6z" strokeLinecap="round"/>
                  {/* 오른쪽 선분 위로 연장 후 오른쪽 위로 늘림 */}
                  <Path d="M18 13v-2l2-4" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* 수증기 - 물결표를 90도로 돌린 모양, 거리 띄움 */}
                  <Path d="M6 9c1-1 1-2 1-3c1-1 1-2 1-3" strokeLinecap="round"/>
                  <Path d="M10 9c1-1 1-2 1-3c1-1 1-2 1-3" strokeLinecap="round"/>
                  <Path d="M14 9c1-1 1-2 1-3c1-1 1-2 1-3" strokeLinecap="round"/>
                </Svg>
              </Pressable>

              {/* 마이페이지 아이콘 */}
              <Pressable 
                onPress={async () => {
                  const loggedIn = await AsyncStorage.getItem('leschef_is_logged_in') === 'true';
                  if (loggedIn) {
                    (navigation as any).navigate('MyPage');
                  } else {
                    (navigation as any).navigate('Login');
                  }
                }}
                style={styles.iconButton}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray600} strokeWidth="1.5">
                  {/* 외부 원 */}
                  <Circle cx="12" cy="12" r="10"/>
                  {/* 내부 원 (머리) */}
                  <Circle cx="12" cy="9" r="3"/>
                  {/* 어깨선 */}
                  <Path d="M7 20c2.5-2.5 7.5-2.5 10 0" strokeLinecap="round"/>
                </Svg>
              </Pressable>

              {/* 게시판 아이콘 */}
              <Pressable 
                onPress={() => navigation.navigate('Board' as never)}
                style={styles.iconButton}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray600} strokeWidth="1.5">
                  {/* 문서 외곽선 */}
                  <Rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  {/* 텍스트 라인들 */}
                  <Path d="M7 8h10M7 12h8M7 16h6" strokeLinecap="round"/>
                </Svg>
              </Pressable>

              {/* 로그인/로그아웃 아이콘 */}
              <Pressable 
                onPress={handleAuthAction}
                style={styles.iconButton}
              >
                {isLoggedIn ? (
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray600} strokeWidth="1.5">
                    <Path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" strokeLinecap="round"/>
                    <Path d="M14 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M19 12H9" strokeLinecap="round"/>
                  </Svg>
                ) : (
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray600} strokeWidth="1.5">
                    <Path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" strokeLinecap="round"/>
                    <Path d="M10 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M5 12h10" strokeLinecap="round"/>
                  </Svg>
                )}
              </Pressable>
            </View>

            {/* 검색 아이콘 - 모바일에서만 표시 (별도로 분리) */}
            {Platform.OS !== 'web' && (
              <Pressable 
                onPress={() => setIsSearchExpanded(!isSearchExpanded)}
                style={styles.searchIconButton}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray600} strokeWidth="1.5">
                  <Circle cx="11" cy="11" r="8"/>
                  <Path d="m21 21-4.35-4.35"/>
                </Svg>
              </Pressable>
            )}

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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 12,
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
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.gray900,
    marginLeft: 8,
    marginRight: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    gap: 12,
    flexShrink: 1,
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
    marginLeft: 12,
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
    backgroundColor: colors.gray100,
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
    paddingVertical: 12,
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
    backgroundColor: colors.gray100,
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

