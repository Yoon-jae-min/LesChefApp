import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { fetchWishRecipeList } from '../../api/recipe/queries';
import type { RecipeListItem } from '../../types/apiRecipe';
import { API_CONFIG } from '../../config/apiConfig';

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
    <View style={styles.container}>
      <Top />
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
      >
        <Text style={styles.title}>찜한 레시피</Text>
        {loading && list.length === 0 ? <ActivityIndicator style={{ marginTop: spacing.lg }} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {list.map((r) => {
          const id = r._id || r.recipeName;
          const uri = resolveUrl(r.recipeImg);
          return (
            <Pressable
              key={id}
              style={[styles.card, shadows.card]}
              onPress={() =>
                (navigation as any).navigate('Recipe', {
                  screen: 'RecipeDetail',
                  params: { id, recipeName: r.recipeName },
                })
              }
            >
              {uri ? <Image source={{ uri }} style={styles.thumb} /> : <View style={[styles.thumb, styles.ph]} />}
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{r.recipeName}</Text>
                <Text style={styles.meta}>{r.subCategory || r.majorCategory || ''}</Text>
              </View>
            </Pressable>
          );
        })}
        {!loading && list.length === 0 && !error ? (
          <Text style={styles.muted}>찜한 레시피가 없습니다.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing['2xl'] },
  title: { fontSize: fontSize['2xl'], fontWeight: '800' },
  card: { flexDirection: 'row', gap: spacing.md, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.gray200, padding: spacing.md },
  thumb: { width: 72, height: 72, borderRadius: borderRadius.md },
  ph: { backgroundColor: colors.gray100 },
  name: { fontSize: fontSize.base, fontWeight: '800', color: colors.gray900 },
  meta: { marginTop: 4, color: colors.gray600, fontSize: fontSize.sm },
  error: { color: colors.red600 },
  muted: { color: colors.gray500 },
});

export default MyFavoritesPage;
