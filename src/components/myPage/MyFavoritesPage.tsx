import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { borderRadius, colors, fontSize, shadows, spacing } from '../../styles/theme';
import { fetchWishRecipeList } from '../../api/recipe/queries';
import type { RecipeListItem } from '../../types/apiRecipe';
import { API_CONFIG } from '../../config/apiConfig';
import MyPageLayout from './MyPageLayout';

function resolveUrl(u?: string) {
  if (!u) return undefined;
  if (u.startsWith('http')) return u;
  return `${API_CONFIG.BASE_URL}${u.startsWith('/') ? '' : '/'}${u}`;
}

function MyFavoritesPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [list, setList] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWishRecipeList();
      setList(data.wishList || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : '불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, []),
  );

  return (
    <MyPageLayout
      activeTab="찜 레시피"
      scrollProps={{ refreshControl: <RefreshControl refreshing={loading} onRefresh={load} /> }}
    >
      <View style={[styles.sectionCard, shadows.card]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Favorites</Text>
            <Text style={styles.title}>찜한 레시피</Text>
            <Text style={styles.subtitle}>저장해둔 레시피를 웹과 같은 카드 목록으로 확인해요.</Text>
          </View>
          <View style={styles.countPill}>
            <Text style={styles.countPillText}>{list.length} items</Text>
          </View>
        </View>

        {loading && list.length === 0 ? <ActivityIndicator color={colors.orange600} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.list}>
          {list.map((r) => {
            const id = r._id || r.recipeName;
            const uri = resolveUrl(r.recipeImg);
            return (
              <Pressable
                key={id}
                style={styles.recipeCard}
                onPress={() =>
                  (navigation as any).navigate('Recipe', {
                    screen: 'RecipeDetail',
                    params: { id, recipeName: r.recipeName },
                  })
                }
              >
                {uri ? <Image source={{ uri }} style={styles.thumb} /> : <View style={[styles.thumb, styles.ph]} />}
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeName}>{r.recipeName}</Text>
                  <Text style={styles.meta}>{r.subCategory || r.majorCategory || '카테고리 없음'}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {!loading && list.length === 0 && !error ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>찜한 레시피가 없습니다.</Text>
          </View>
        ) : null}
      </View>
    </MyPageLayout>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.stone500,
  },
  title: {
    marginTop: spacing.xs,
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.stone800,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.stone500,
  },
  countPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  countPillText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.stone500,
  },
  list: {
    gap: spacing.md,
  },
  recipeCard: {
    flexDirection: 'row',
    gap: spacing.md,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.md,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
  },
  ph: {
    backgroundColor: colors.stone100,
  },
  recipeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeName: {
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.stone800,
  },
  meta: {
    marginTop: spacing.xs,
    color: colors.stone500,
    fontSize: fontSize.sm,
  },
  emptyBox: {
    borderRadius: 22,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.stone500,
    fontSize: fontSize.sm,
  },
  error: {
    color: colors.red600,
  },
});

export default MyFavoritesPage;
