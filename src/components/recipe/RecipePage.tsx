// 웹의 레시피 페이지를 React Native로 변환
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';
import TabNavigation from '../common/TabNavigation';
import FilterTabs from '../common/FilterTabs';

const CUISINE_TABS = ['한식', '일식', '중식', '양식', '기타'] as const;
const CATEGORY_TO_DISPLAY: Record<string, string> = {
  korean: '한식',
  japanese: '일식',
  chinese: '중식',
  western: '양식',
  etc: '기타',
};

const DISPLAY_TO_CATEGORY: Record<string, string> = {
  한식: 'korean',
  일식: 'japanese',
  중식: 'chinese',
  양식: 'western',
  기타: 'etc',
};

const CUISINE_TO_SUBFILTERS: Record<string, readonly string[]> = {
  한식: ['전체', '국, 찌개', '밥, 면', '반찬', '기타'],
  일식: ['전체', '국, 전골', '면', '밥', '기타'],
  중식: ['전체', '튀김, 찜', '면', '밥', '기타'],
  양식: ['전체', '스프, 스튜', '면', '빵', '기타'],
  기타: [],
} as const;

type RecipeListItem = {
  _id?: string;
  recipeName: string;
  cookTime?: number;
  cookLevel?: string;
  majorCategory?: string;
  subCategory?: string;
  recipeImg?: string;
  viewCount?: number;
};

function RecipePage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const category = (route.params as any)?.category || 'korean';
  
  const [activeSub, setActiveSub] = useState<string>('전체');
  const [matchMode, setMatchMode] = useState<'bestMatch' | 'needFew'>('bestMatch');
  const [includeMyInventory, setIncludeMyInventory] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentDisplay = CATEGORY_TO_DISPLAY[category] || '한식';
  const subFiltersForActive = CUISINE_TO_SUBFILTERS[currentDisplay] || [];

  useEffect(() => {
    // 로그인 상태 확인
    // const checkLogin = async () => {
    //   const loggedIn = await AsyncStorage.getItem('leschef_is_logged_in') === 'true';
    //   setIsLoggedIn(loggedIn);
    //   setIncludeMyInventory(loggedIn);
    // };
    // checkLogin();
  }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: API 호출
        // const data = await fetchRecipeList({ category });
        // setRecipes(data.list || []);
        
        // 임시 데이터
        setRecipes([]);
      } catch (err) {
        setError(err instanceof Error ? err.message : '레시피를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, [category]);

  const handleTabChange = (tab: string) => {
    const newCategory = DISPLAY_TO_CATEGORY[tab];
    if (newCategory) {
      navigation.setParams({ category: newCategory } as any);
    }
  };

  const modeLabel = useMemo(
    () =>
      matchMode === 'bestMatch'
        ? '내 재료와 많이 겹치는 순'
        : '부족 재료 1~2개만 사면 되는 순',
    [matchMode]
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
          {/* 상단 카테고리 탭 */}
          <View style={styles.tabContainer}>
            <TabNavigation
              tabs={[...CUISINE_TABS]}
              activeTab={currentDisplay}
              onTabChange={handleTabChange}
            />
          </View>

          {/* 서브 필터 */}
          {subFiltersForActive.length > 0 && (
            <View style={styles.filterContainer}>
              <FilterTabs
                items={[...subFiltersForActive]}
                activeItem={activeSub}
                onItemChange={setActiveSub}
                variant="default"
              />
            </View>
          )}

          {/* 스마트 필터 */}
          <View style={[styles.section, shadows.card]}>
            <Text style={styles.sectionLabel}>Smart Filter</Text>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>내 재료 기반 레시피 추천</Text>
              <Text style={styles.sectionSubtitle}>
                {isLoggedIn ? '보관 재료 정보를 활용해 정렬할 수 있습니다.' : '로그인 후 매칭 옵션을 이용해 보세요.'}
              </Text>
            </View>
          </View>

          {/* 정렬/옵션 툴바 */}
          <View style={[styles.section, shadows.card]}>
            <View style={styles.toolbar}>
              <View style={styles.buttonGroup}>
                <Pressable
                  onPress={() => setMatchMode('bestMatch')}
                  disabled={!isLoggedIn}
                  style={[
                    styles.filterButton,
                    matchMode === 'bestMatch' && styles.filterButtonActive,
                    !isLoggedIn && styles.filterButtonDisabled,
                  ]}
                >
                  <Text style={[
                    styles.filterButtonText,
                    matchMode === 'bestMatch' && styles.filterButtonTextActive,
                  ]}>
                    내 재료 매칭 우선
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setMatchMode('needFew')}
                  disabled={!isLoggedIn}
                  style={[
                    styles.filterButton,
                    matchMode === 'needFew' && styles.filterButtonActive,
                    !isLoggedIn && styles.filterButtonDisabled,
                  ]}
                >
                  <Text style={[
                    styles.filterButtonText,
                    matchMode === 'needFew' && styles.filterButtonTextActive,
                  ]}>
                    부족 재료 1~2개
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.modeLabel}>
                정렬 기준: <Text style={styles.modeLabelBold}>{modeLabel}</Text>
              </Text>
            </View>
          </View>

          {/* 레시피 리스트 */}
          {loading && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={colors.gray500} />
              <Text style={styles.loadingText}>레시피를 불러오는 중입니다...</Text>
            </View>
          )}

          {error && !loading && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!loading && !error && recipes.length === 0 && (
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>레시피가 없습니다.</Text>
            </View>
          )}

          {!loading && !error && recipes.length > 0 && (
            <View style={styles.recipeGrid}>
              {recipes.map((recipe) => {
                const cookTimeLabel = recipe.cookTime ? `${recipe.cookTime}분` : '시간 정보 없음';
                const levelLabel = recipe.cookLevel || '난이도 정보 없음';
                const tags = [recipe.subCategory || recipe.majorCategory || '레시피'];
                const recipeId = recipe._id || recipe.recipeName;

                return (
                  <Pressable
                    key={recipeId}
                    style={[styles.recipeCard, shadows.card]}
                    onPress={() => (navigation as any).navigate('RecipeDetail', { 
                      id: recipeId, 
                      recipeName: recipe.recipeName 
                    })}
                  >
                    {/* 레시피 이미지 */}
                    <View style={styles.recipeImageContainer}>
                      {recipe.recipeImg ? (
                        <Image 
                          source={{ uri: recipe.recipeImg }} 
                          style={styles.recipeImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.recipeImagePlaceholder}>
                          <Text style={styles.recipeImagePlaceholderText}>📷</Text>
                          <Text style={styles.recipeImagePlaceholderLabel}>레시피 이미지</Text>
                        </View>
                      )}
                    </View>

                    {/* 조회수 또는 매칭 정보 */}
                    {isLoggedIn ? (
                      <View style={styles.matchInfo}>
                        <Text style={styles.matchEmoji}>🍳</Text>
                        <View style={styles.matchTextContainer}>
                          <Text style={styles.matchLabel}>View</Text>
                          <Text style={styles.matchValue}>{recipe.viewCount ?? 0}</Text>
                          <Text style={styles.matchSubLabel}>조회수</Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.loginPrompt}>
                        <Text style={styles.loginPromptText}>
                          로그인하면 내 재료와의 매칭 정도를 확인할 수 있어요.
                        </Text>
                      </View>
                    )}

                    {/* 난이도 및 시간 */}
                    <View style={styles.recipeMeta}>
                      <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>{levelLabel}</Text>
                      </View>
                      <Text style={styles.cookTime}>{cookTimeLabel}</Text>
                    </View>

                    {/* 레시피 제목 */}
                    <Text style={styles.recipeTitle} numberOfLines={2}>
                      {recipe.recipeName}
                    </Text>

                    {/* 태그 */}
                    <View style={styles.tagsContainer}>
                      {tags.map((tag) => (
                        <View key={tag} style={styles.tag}>
                          <Text style={styles.tagText}>#{tag}</Text>
                        </View>
                      ))}
                    </View>

                    {/* 상세 보기 */}
                    <View style={styles.recipeFooter}>
                      <Text style={styles.footerText}>레시피 상세 보기</Text>
                      <Text style={styles.footerArrow}>→</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
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
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  tabContainer: {
    marginBottom: spacing.lg,
  },
  filterContainer: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl + 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    padding: spacing.md,
  },
  section: {
    borderRadius: borderRadius.xl + 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.gray400,
  },
  sectionHeader: {
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    color: colors.gray900,
  },
  sectionSubtitle: {
    fontSize: fontSize.xs,
    color: colors.gray500,
    marginTop: spacing.xs,
  },
  toolbar: {
    gap: spacing.md,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  filterButton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  filterButtonActive: {
    borderColor: colors.gray300,
    backgroundColor: colors.gray700,
  },
  filterButtonDisabled: {
    opacity: 0.5,
  },
  filterButtonText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.gray600,
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  modeLabel: {
    fontSize: fontSize.xs,
    color: colors.gray500,
  },
  modeLabelBold: {
    fontWeight: '600',
    color: colors.gray900,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    marginTop: spacing.md,
  },
  errorContainer: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.red200,
    backgroundColor: colors.red50,
    padding: spacing.md,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.red600,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  recipeCard: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.md,
  },
  recipeImageContainer: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    overflow: 'hidden',
    aspectRatio: 5 / 3,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  recipeImagePlaceholderText: {
    fontSize: fontSize['3xl'],
  },
  recipeImagePlaceholderLabel: {
    fontSize: fontSize.xs,
    color: colors.gray400,
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    padding: spacing.md,
  },
  matchEmoji: {
    fontSize: fontSize['4xl'],
  },
  matchTextContainer: {
    alignItems: 'flex-end',
  },
  matchLabel: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.gray600,
  },
  matchValue: {
    fontSize: fontSize['3xl'],
    fontWeight: '600',
    color: colors.black,
  },
  matchSubLabel: {
    fontSize: fontSize.xs,
    color: colors.gray700,
  },
  loginPrompt: {
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    padding: spacing.md,
  },
  loginPromptText: {
    fontSize: fontSize.xs,
    color: colors.gray500,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  levelBadge: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray100,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  levelText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.gray600,
  },
  cookTime: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.gray800,
  },
  recipeTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.gray900,
    marginTop: spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  tag: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.gray600,
  },
  recipeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  footerText: {
    fontSize: 11,
    color: colors.gray500,
  },
  footerArrow: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.gray800,
  },
});

export default RecipePage;

