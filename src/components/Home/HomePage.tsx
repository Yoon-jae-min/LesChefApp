// 웹의 홈 페이지를 React Native로 변환
import React, { useRef, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';

function HomePage(): React.JSX.Element {
  const navigation = useNavigation();
  const lastBackPressAt = useRef(0);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        const now = Date.now();

        if (now - lastBackPressAt.current < 2000) {
          BackHandler.exitApp();
          return true;
        }

        lastBackPressAt.current = now;
        ToastAndroid.show('한 번 더 누르면 종료됩니다.', ToastAndroid.SHORT);
        return true;
      });

      return () => {
        lastBackPressAt.current = 0;
        subscription.remove();
      };
    }, []),
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
          <View style={[styles.heroSection, shadows.card]}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                내 식재료를{'\n'}
                <Text style={styles.heroTitleAccent}>스마트하게</Text> 관리하세요
              </Text>
              <Text style={styles.heroDescription}>
                유통기한 알림으로 낭비를 줄이고,{'\n'}
                검색으로 레시피를 찾아보세요
              </Text>
              <View style={styles.heroButtons}>
                <Pressable
                  style={[styles.heroButton, styles.heroButtonPrimary, shadows.orangeButton]}
                  onPress={() => navigation.navigate('MyPage' as never)}
                >
                  <Text style={styles.heroButtonPrimaryText}>식재료 관리하기</Text>
                </Pressable>
                <Pressable
                  style={[styles.heroButton, styles.heroButtonSecondary]}
                  onPress={() => navigation.navigate('Recipe' as never)}
                >
                  <Text style={styles.heroButtonSecondaryText}>레시피 둘러보기</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={[styles.section, shadows.card]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>뉴스 / 소식</Text>
              <Text style={styles.sectionSubtitle}>
                LesChef의 최신 소식과 업데이트를 확인하세요
              </Text>
            </View>
            <View style={styles.newsGrid}>
              {[1, 2].map((item) => (
                <View key={item} style={styles.newsCard}>
                  <View style={styles.newsCardHeader}>
                    <Text style={styles.newsCardTitle}>소식 제목 {item}</Text>
                    <Text style={styles.newsCardDate}>2024.01.01</Text>
                  </View>
                  <Text style={styles.newsCardContent} numberOfLines={2}>
                    소식 내용이 여기에 표시됩니다. LesChef의 새로운 기능이나 업데이트 정보를 확인할 수 있어요.
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Pressable
            onPress={() => (navigation as any).navigate('IngredientPrice')}
            style={[styles.section, shadows.card]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>식재료 물가 정보</Text>
              <Text style={styles.sectionSubtitle}>
                최신 식재료 가격 정보를 확인하세요 · 탭하면 상세
              </Text>
            </View>
            <View style={styles.priceGrid}>
              {['쌀', '돼지고기', '닭고기', '계란'].map((item, idx) => (
                <View key={idx} style={styles.priceCard}>
                  <Text style={styles.priceEmoji}>🥘</Text>
                  <Text style={styles.priceName}>{item}</Text>
                  <Text style={styles.priceLabel}>가격 정보</Text>
                </View>
              ))}
            </View>
          </Pressable>

          <View style={[styles.section, shadows.card]}>
            <Text style={styles.sectionTitle}>빠른 링크</Text>
            <View style={styles.linkGrid}>
              {[
                { name: '한식 레시피', category: 'korean', emoji: '🍲' },
                { name: '일식 레시피', category: 'japanese', emoji: '🍱' },
                { name: '중식 레시피', category: 'chinese', emoji: '🥟' },
                { name: '양식 레시피', category: 'western', emoji: '🍝' },
              ].map((link) => (
                <Pressable
                  key={link.name}
                  style={styles.linkCard}
                  onPress={() =>
                    (navigation as any).navigate('Recipe', {
                      screen: 'RecipeList',
                      params: { category: link.category },
                    })
                  }
                >
                  <Text style={styles.linkEmoji}>{link.emoji}</Text>
                  <Text style={styles.linkName}>{link.name}</Text>
                </Pressable>
              ))}
            </View>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    gap: spacing.xl,
  },
  heroSection: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.orange100,
    backgroundColor: colors.orange50,
    paddingVertical: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  heroContent: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  heroTitle: {
    fontSize: fontSize['4xl'],
    fontWeight: '800',
    color: colors.gray900,
    textAlign: 'center',
    lineHeight: fontSize['4xl'] * 1.18,
    letterSpacing: -0.6,
  },
  heroTitleAccent: {
    color: colors.orange600,
  },
  heroDescription: {
    fontSize: fontSize.lg,
    color: colors.gray700,
    textAlign: 'center',
    maxWidth: 672,
    lineHeight: fontSize.lg * 1.5,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  heroButton: {
    minWidth: 148,
    alignItems: 'center',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  heroButtonPrimary: {
    backgroundColor: colors.orange600,
  },
  heroButtonSecondary: {
    borderWidth: 2,
    borderColor: colors.orange600,
    backgroundColor: colors.white,
  },
  heroButtonPrimaryText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.white,
  },
  heroButtonSecondaryText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.orange600,
  },
  section: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.stone500,
  },
  newsGrid: {
    gap: spacing.lg,
  },
  newsCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.lg,
  },
  newsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  newsCardTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.gray900,
    flex: 1,
  },
  newsCardDate: {
    fontSize: fontSize.xs,
    color: colors.stone500,
  },
  newsCardContent: {
    fontSize: fontSize.sm,
    color: colors.stone700,
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  priceCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.orange100,
    backgroundColor: colors.orange50,
    padding: spacing.md,
    alignItems: 'center',
  },
  priceEmoji: {
    fontSize: fontSize['2xl'],
    marginBottom: spacing.xs,
  },
  priceName: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  priceLabel: {
    fontSize: fontSize.xs,
    color: colors.orange700,
  },
  linkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  linkCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.lg,
    alignItems: 'center',
  },
  linkEmoji: {
    fontSize: fontSize['3xl'],
    marginBottom: spacing.xs,
  },
  linkName: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray900,
  },
});

export default HomePage;
