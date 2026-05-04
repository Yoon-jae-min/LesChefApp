// 웹의 마이페이지를 React Native로 변환
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';

function MyPage(): React.JSX.Element {
  const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 메뉴 섹션 */}
          <View style={styles.menuGrid}>
            <Pressable 
              style={[styles.menuCard, shadows.card]}
              onPress={() => navigation.navigate('MyPageInfo' as never)}
            >
              <Text style={styles.menuEmoji}>👤</Text>
              <Text style={styles.menuText}>내 정보</Text>
            </Pressable>
            <Pressable 
              style={[styles.menuCard, shadows.card]}
              onPress={() => navigation.navigate('MyPageStorage' as never)}
            >
              <Text style={styles.menuEmoji}>❄️</Text>
              <Text style={styles.menuText}>보관함</Text>
            </Pressable>
            <Pressable 
              style={[styles.menuCard, shadows.card]}
              onPress={() => navigation.navigate('MyPageRecipes' as never)}
            >
              <Text style={styles.menuEmoji}>📝</Text>
              <Text style={styles.menuText}>내 레시피</Text>
            </Pressable>
            <Pressable 
              style={[styles.menuCard, shadows.card]}
              onPress={() => navigation.navigate('MyPageFavorites' as never)}
            >
              <Text style={styles.menuEmoji}>❤️</Text>
              <Text style={styles.menuText}>찜한 레시피</Text>
            </Pressable>
            <Pressable 
              style={[styles.menuCard, shadows.card]}
              onPress={() => navigation.navigate('NotificationSettings' as never)}
            >
              <Text style={styles.menuEmoji}>🔔</Text>
              <Text style={styles.menuText}>알림 설정</Text>
            </Pressable>
            <Pressable 
              style={[styles.menuCard, shadows.card]}
              onPress={() => navigation.navigate('ExpiryInbox' as never)}
            >
              <Text style={styles.menuEmoji}>📥</Text>
              <Text style={styles.menuText}>알림 기록</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  content: {
    maxWidth: 1152,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  menuCard: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  menuEmoji: {
    fontSize: fontSize['4xl'],
  },
  menuText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.gray900,
  },
});

export default MyPage;

