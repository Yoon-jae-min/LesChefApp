// 웹의 홈 페이지를 React Native로 변환
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Animated, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';
import { Images } from '../../assets/images';

interface HomePageProps {
  isAppInitialized?: boolean;
}

function HomePage({ isAppInitialized = false }: HomePageProps): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const hasShownSplash = useRef(false);
  
  // 애니메이션 값들
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    const checkAndShowSplash = async () => {
      try {
        // 로고 클릭으로 온 경우 확인 (route params 또는 AsyncStorage)
        const fromLogoClick = (route.params as any)?.fromLogoClick === true;
        const storedFromLogo = await AsyncStorage.getItem('fromLogoClick');
        
        if (fromLogoClick || storedFromLogo === 'true') {
          // 로고 클릭으로 온 경우 스플래시 표시 안 함
          await AsyncStorage.removeItem('fromLogoClick');
          setIsLoading(false);
          return;
        }

        // 앱이 처음 시작될 때만 스플래시 표시
        // 다른 페이지에서 돌아올 때는 표시 안 함
        if (!isAppInitialized || hasShownSplash.current) {
          setIsLoading(false);
          return;
        }

        hasShownSplash.current = true;
        
        const showSplash = () => {
          setIsLoading(true);
          
          // 로고 페이드 인 및 스케일 애니메이션
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
              toValue: 1,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            }),
          ]).start();

          // 회전 애니메이션 (셰프 모자)
          Animated.loop(
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
            })
          ).start();

          // 점 애니메이션
          const createDotAnimation = (animValue: Animated.Value, delay: number) => {
            return Animated.loop(
              Animated.sequence([
                Animated.delay(delay),
                Animated.timing(animValue, {
                  toValue: 1,
                  duration: 600,
                  useNativeDriver: true,
                }),
                Animated.timing(animValue, {
                  toValue: 0,
                  duration: 600,
                  useNativeDriver: true,
                }),
              ])
            );
          };

          createDotAnimation(dotAnim1, 0).start();
          createDotAnimation(dotAnim2, 200).start();
          createDotAnimation(dotAnim3, 400).start();

          // 2초 후 로딩 완료
          timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setIsLoading(false);
            });
          }, 2000);
        };

        showSplash();
      } catch (error) {
        console.error('스플래시 확인 실패:', error);
        setIsLoading(false);
      }
    };

    checkAndShowSplash();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isAppInitialized, route.params]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dot1TranslateY = dotAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const dot2TranslateY = dotAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const dot3TranslateY = dotAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.loadingContainer}>
        <Animated.View 
          style={[
            styles.loadingContent,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          {/* 로고 */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            <Image 
              source={Images.LesChef_Logo} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* 아이콘들 */}
          <View style={styles.iconsContainer}>
            <Animated.View
              style={[
                styles.iconWrapper,
                {
                  transform: [{ rotate: rotateInterpolate }],
                }
              ]}
            >
              <Text style={styles.iconEmoji}>👨‍🍳</Text>
            </Animated.View>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconEmoji}>❄️</Text>
            </View>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconEmoji}>🍳</Text>
            </View>
          </View>

          {/* 로딩 점들 */}
          <View style={styles.dotsContainer}>
            <Animated.View
              style={[
                styles.dot,
                styles.dot1,
                {
                  transform: [{ translateY: dot1TranslateY }],
                }
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                styles.dot2,
                {
                  transform: [{ translateY: dot2TranslateY }],
                }
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                styles.dot3,
                {
                  transform: [{ translateY: dot3TranslateY }],
                }
              ]}
            />
          </View>

          {/* 로딩 텍스트 */}
          <Text style={styles.loadingText}>
            요리와 식재료의 모든 것을{'\n'}준비하고 있습니다
          </Text>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 히어로 섹션 */}
          <View style={[styles.heroSection, shadows.card, { backgroundColor: colors.orange50 }]}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                나만의 요리 여정을 시작하세요
              </Text>
              <Text style={styles.heroDescription}>
                냉장고 속 재료로 만들 수 있는 레시피를 찾고, 유통기한을 관리하며, 
                요리의 모든 것을 LesChef와 함께하세요.
              </Text>
              <View style={styles.heroButtons}>
                <Pressable 
                  style={styles.heroButton}
                  onPress={() => navigation.navigate('Recipe' as never)}
                >
                  <Text style={styles.heroButtonText}>레시피 둘러보기 →</Text>
                </Pressable>
                <Pressable 
                  style={styles.heroButton}
                  onPress={() => navigation.navigate('MyPage' as never)}
                >
                  <Text style={styles.heroButtonText}>내 냉장고 관리 →</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* 뉴스/소식 영역 */}
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

          {/* 식재료 물가 관련 영역 */}
          <View style={[styles.section, shadows.card]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>식재료 물가 정보</Text>
              <Text style={styles.sectionSubtitle}>
                최신 식재료 가격 정보를 확인하세요
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
          </View>

          {/* 빠른 링크 */}
          <View style={[styles.section, shadows.card]}>
            <Text style={styles.sectionTitle}>빠른 링크</Text>
            <View style={styles.linkGrid}>
              {[
                { name: '한식 레시피', route: 'Recipe', emoji: '🍲' },
                { name: '일식 레시피', route: 'Recipe', emoji: '🍱' },
                { name: '중식 레시피', route: 'Recipe', emoji: '🥟' },
                { name: '양식 레시피', route: 'Recipe', emoji: '🍝' },
              ].map((link) => (
                <Pressable
                  key={link.name}
                  style={styles.linkCard}
                  onPress={() => navigation.navigate(link.route as never)}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.orange50, // bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 4,
    marginBottom: spacing.xl,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dot1: {
    backgroundColor: colors.orange400,
  },
  dot2: {
    backgroundColor: colors.red500,
  },
  dot3: {
    backgroundColor: colors.yellow200,
  },
  loadingText: {
    fontSize: fontSize.base,
    color: colors.gray600,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: fontSize.base * 1.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  content: {
    maxWidth: 1152, // max-w-6xl
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.xl,
  },
  heroSection: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.xl,
  },
  heroContent: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  heroTitle: {
    fontSize: fontSize['4xl'],
    fontWeight: '700',
    color: colors.gray900,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: fontSize.lg,
    color: colors.gray600,
    textAlign: 'center',
    maxWidth: 672, // max-w-2xl
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  heroButton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  heroButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray900,
  },
  section: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
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
    color: colors.gray500,
  },
  newsGrid: {
    gap: spacing.lg,
  },
  newsCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
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
    color: colors.gray400,
  },
  newsCardContent: {
    fontSize: fontSize.sm,
    color: colors.gray600,
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
    borderColor: colors.gray200,
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
    color: colors.gray600,
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
    borderColor: colors.gray200,
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

