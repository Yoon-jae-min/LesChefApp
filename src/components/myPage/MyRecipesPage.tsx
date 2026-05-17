import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { borderRadius, colors, fontSize, shadows, spacing } from '../../styles/theme';
import { fetchMyRecipeList } from '../../api/recipe/queries';
import { deleteRecipe } from '../../api/recipe/crud';
import type { RecipeListItem } from '../../types/apiRecipe';
import { API_CONFIG } from '../../config/apiConfig';
import { requireLogin } from '../../lib/authGuard';
import MyPageLayout from './MyPageLayout';

function resolveUrl(u?: string) {
  if (!u) return undefined;
  if (u.startsWith('http')) return u;
  return `${API_CONFIG.BASE_URL}${u.startsWith('/') ? '' : '/'}${u}`;
}

function MyRecipesPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [list, setList] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyRecipeList();
      setList(data.list || []);
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

  const handleEdit = (recipeId: string) => {
    (navigation as any).navigate('Recipe', {
      screen: 'RecipeEdit',
      params: { recipeId },
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId || isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await deleteRecipe(deleteTargetId);
      if (response.ok) {
        const result = await response.json();
        if (result.text === 'success') {
          setDeleteTargetId(null);
          await load();
        } else {
          throw new Error('레시피 삭제에 실패했습니다.');
        }
      } else {
        const text = await response.text();
        throw new Error(text || '레시피 삭제에 실패했습니다.');
      }
    } catch (e) {
      Alert.alert('삭제 실패', e instanceof Error ? e.message : '레시피 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <MyPageLayout
      activeTab="나의 레시피"
      scrollProps={{ refreshControl: <RefreshControl refreshing={loading} onRefresh={load} /> }}
    >
      <View style={[styles.sectionCard, shadows.card]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>My Recipes</Text>
            <Text style={styles.title}>나의 레시피</Text>
            <Text style={styles.subtitle}>내가 작성한 레시피를 추가·수정·삭제할 수 있어요.</Text>
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
            const recipeId = r._id;
            const uri = resolveUrl(r.recipeImg);
            return (
              <View key={id} style={styles.recipeCard}>
                <Pressable
                  style={styles.recipeMain}
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
                <View style={styles.cardActions}>
                  <Pressable
                    style={styles.editButton}
                    disabled={!recipeId}
                    onPress={() => recipeId && handleEdit(recipeId)}
                  >
                    <Text style={styles.editButtonText}>수정</Text>
                  </Pressable>
                  <Pressable
                    style={styles.deleteButton}
                    disabled={!recipeId}
                    onPress={() => recipeId && setDeleteTargetId(recipeId)}
                  >
                    <Text style={styles.deleteButtonText}>삭제</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>

        {!loading && list.length === 0 && !error ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>등록한 레시피가 없습니다.</Text>
          </View>
        ) : null}

        <Pressable
          style={[styles.writeButton, shadows.orangeButton]}
          onPress={async () => {
            const target = { name: 'Main', params: { screen: 'Recipe', params: { screen: 'RecipeWrite' } } };
            if (await requireLogin(navigation, target, { fromSource: 'mypage' })) {
              (navigation as any).navigate('Recipe', { screen: 'RecipeWrite' });
            }
          }}
        >
          <Text style={styles.writeButtonText}>레시피 작성하기</Text>
        </Pressable>
      </View>

      <Modal
        visible={Boolean(deleteTargetId)}
        transparent
        animationType="fade"
        onRequestClose={() => !isDeleting && setDeleteTargetId(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>레시피 삭제</Text>
            <Text style={styles.modalMessage}>이 레시피를 삭제할까요? 삭제 후에는 복구할 수 없습니다.</Text>
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalCancel}
                disabled={isDeleting}
                onPress={() => setDeleteTargetId(null)}
              >
                <Text style={styles.modalCancelText}>취소</Text>
              </Pressable>
              <Pressable
                style={[styles.modalDelete, isDeleting && styles.disabledButton]}
                disabled={isDeleting}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.modalDeleteText}>{isDeleting ? '삭제 중…' : '삭제하기'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    overflow: 'hidden',
  },
  recipeMain: {
    flexDirection: 'row',
    gap: spacing.md,
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
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.stone200,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  editButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.stone700,
  },
  deleteButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.red200,
    backgroundColor: colors.red50,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.red600,
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
  writeButton: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.lg,
    backgroundColor: colors.orange600,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  writeButtonText: {
    color: colors.white,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.xl,
    gap: spacing.md,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.stone800,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: fontSize.sm,
    color: colors.stone500,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  modalCancel: {
    flex: 1,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  modalCancelText: {
    fontWeight: '700',
    color: colors.stone700,
  },
  modalDelete: {
    flex: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.red600,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  modalDeleteText: {
    fontWeight: '700',
    color: colors.white,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default MyRecipesPage;
