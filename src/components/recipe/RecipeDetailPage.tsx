// 웹의 레시피 상세 페이지를 React Native로 변환
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Image, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';

type Comment = {
  id: number;
  username: string;
  time: string;
  content: string;
};

type IngredientGroup = {
  sortType: string;
  ingredientUnit: Array<{
    ingredientName: string;
    volume: string;
    unit: string;
  }>;
};

type Step = {
  stepNum: number;
  stepImg?: string;
  stepWay: string;
};

function RecipeDetailPage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, recipeName } = (route.params as any) || {};

  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipeMeta, setRecipeMeta] = useState<any>(null);
  const [ingredients, setIngredients] = useState<IngredientGroup[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: '아이디', time: '시간', content: '댓글 내용' },
    { id: 2, username: '아이디', time: '시간', content: '댓글 내용' },
  ]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: API 호출
        // const data = await fetchRecipeDetail(recipeName);
        // setRecipeMeta(data.selectedRecipe);
        // setIngredients(data.recipeIngres || []);
        // setSteps(data.recipeSteps || []);
        
        // 임시 데이터
        setRecipeMeta({
          recipeName: recipeName || '레시피',
          majorCategory: '한식',
          subCategory: '국, 찌개',
          portion: 2,
          portionUnit: '인분',
          cookTime: 30,
          recipeImg: null,
        });
        setIngredients([]);
        setSteps([]);
      } catch (err) {
        setError(err instanceof Error ? err.message : '레시피를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [recipeName]);

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        username: '아이디',
        time: '시간',
        content: comment.trim(),
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleToggleWish = async () => {
    // TODO: API 호출
    setIsLiked(!isLiked);
  };

  const canEdit = isLoggedIn && isAuthor;

  if (loading) {
    return (
      <View style={styles.container}>
        <Top />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.gray500} />
          <Text style={styles.loadingText}>레시피를 불러오는 중입니다...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Top />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
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
          {/* 레시피 제목 */}
          <View style={[styles.titleCard, shadows.card]}>
            <Text style={styles.title}>{recipeMeta?.recipeName || '레시피'}</Text>
            <View style={styles.titleActions}>
              {canEdit && (
                <Pressable 
                  style={styles.editButton}
                  onPress={() => navigation.navigate('RecipeEdit' as never)}
                >
                  <Text style={styles.editButtonText}>편집</Text>
                </Pressable>
              )}
              <Pressable 
                style={[styles.likeButton, isLiked && styles.likeButtonActive]}
                onPress={handleToggleWish}
              >
                <Text style={styles.likeIcon}>{isLiked ? '❤️' : '🤍'}</Text>
              </Pressable>
            </View>
          </View>

          {/* 레시피 이미지 */}
          <View style={[styles.imageContainer, shadows.card]}>
            {recipeMeta?.recipeImg ? (
              <Image 
                source={{ uri: recipeMeta.recipeImg }} 
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>📷</Text>
                <Text style={styles.imagePlaceholderLabel}>레시피 이미지</Text>
              </View>
            )}
          </View>

          {/* 레시피 메타데이터 */}
          <View style={[styles.metaCard, shadows.card, { backgroundColor: colors.orange50 }]}>
            <View style={styles.metaContent}>
              <Text style={styles.metaText}>
                {recipeMeta?.majorCategory || '카테고리'}
                {recipeMeta?.subCategory ? ` > ${recipeMeta.subCategory}` : ''}
              </Text>
              <View style={styles.metaDivider} />
              <Text style={styles.metaText}>
                {recipeMeta?.portion
                  ? `${recipeMeta.portion}${recipeMeta.portionUnit || '인분'}`
                  : '분량 정보 없음'}
              </Text>
              <View style={styles.metaDivider} />
              <Text style={styles.metaText}>
                {recipeMeta?.cookTime ? `${recipeMeta.cookTime}분` : '시간 정보 없음'}
              </Text>
            </View>
          </View>

          {/* 재료 섹션 */}
          <View style={[styles.section, shadows.card]}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleUnderline}>Ingredient</Text>
            </Text>
            {ingredients.length === 0 ? (
              <Text style={styles.emptyText}>재료 정보가 없습니다.</Text>
            ) : (
              ingredients.map((group, idx) => (
                <View key={`${group.sortType}-${idx}`} style={styles.ingredientGroup}>
                  <View style={styles.ingredientTypeButton}>
                    <Text style={styles.ingredientTypeText}>{group.sortType || '재료'}</Text>
                  </View>
                  <View style={styles.ingredientList}>
                    {group.ingredientUnit.map((item, i) => (
                      <View key={`${item.ingredientName}-${i}`} style={styles.ingredientItem}>
                        <Text style={styles.ingredientName}>{item.ingredientName}</Text>
                        <View style={styles.ingredientAmount}>
                          <Text style={styles.ingredientValue}>{item.volume}</Text>
                          <Text style={styles.ingredientValue}>{item.unit}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>

          {/* 단계 섹션 */}
          <View style={[styles.section, shadows.card]}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleUnderline}>Step</Text>
            </Text>
            {steps.length === 0 ? (
              <Text style={styles.emptyText}>조리 단계가 없습니다.</Text>
            ) : (
              steps.map((step) => (
                <View key={step.stepNum} style={styles.stepCard}>
                  <View style={styles.stepContent}>
                    <View style={styles.stepImageContainer}>
                      {step.stepImg ? (
                        <Image 
                          source={{ uri: step.stepImg }} 
                          style={styles.stepImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <Text style={styles.stepImagePlaceholder}>📷</Text>
                      )}
                    </View>
                    <View style={styles.stepTextContainer}>
                      <Text style={styles.stepNumber}>Step. {step.stepNum}</Text>
                      <View style={styles.stepDescription}>
                        <Text style={styles.stepDescriptionText}>{step.stepWay || '내용'}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* 댓글 섹션 */}
          <View style={[styles.section, shadows.card]}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleUnderline}>Comment</Text>
            </Text>
            <TextInput
              placeholder="댓글을 입력해주세요"
              value={comment}
              onChangeText={setComment}
              onSubmitEditing={handleAddComment}
              style={styles.commentInput}
              placeholderTextColor={colors.gray500}
            />
            <View style={styles.commentsList}>
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <View style={styles.commentUser}>
                      <View style={styles.commentAvatar}>
                        <Text style={styles.commentAvatarText}>👤</Text>
                      </View>
                      <Text style={styles.commentUsername}>{comment.username}</Text>
                      <Text style={styles.commentTime}>-{comment.time}-</Text>
                    </View>
                    <Pressable onPress={() => handleDeleteComment(comment.id)}>
                      <Text style={styles.commentDelete}>🗑️</Text>
                    </Pressable>
                  </View>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentContentText}>-{comment.content}-</Text>
                  </View>
                </View>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  centerContainer: {
    flex: 1,
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
    margin: spacing.lg,
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
  titleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  title: {
    flex: 1,
    fontSize: fontSize['4xl'],
    fontWeight: '700',
    color: colors.black,
  },
  titleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  editButton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray700,
  },
  likeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButtonActive: {
    // 스타일 추가 가능
  },
  likeIcon: {
    fontSize: 24,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  imagePlaceholderText: {
    fontSize: fontSize['4xl'],
  },
  imagePlaceholderLabel: {
    fontSize: fontSize.sm,
    color: colors.gray400,
  },
  metaCard: {
    width: '100%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  metaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  metaText: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.black,
  },
  metaDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray300,
  },
  section: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  sectionTitleUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray300,
    paddingHorizontal: spacing.xs,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
  ingredientGroup: {
    marginBottom: spacing.lg,
  },
  ingredientTypeButton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
  },
  ingredientTypeText: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.gray700,
  },
  ingredientList: {
    paddingLeft: spacing.md,
    gap: spacing.md,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  ingredientName: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.gray900,
  },
  ingredientAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  ingredientValue: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.gray900,
  },
  stepCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  stepContent: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  stepImageContainer: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stepImage: {
    width: '100%',
    height: '100%',
  },
  stepImagePlaceholder: {
    fontSize: fontSize['2xl'],
    color: colors.gray400,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepNumber: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.md,
  },
  stepDescription: {
    width: '100%',
    minHeight: 60,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDescriptionText: {
    fontSize: fontSize.base,
    color: colors.gray700,
  },
  commentInput: {
    width: '100%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray300,
    padding: spacing.md,
    fontSize: fontSize.base,
    color: colors.gray900,
    marginBottom: spacing.lg,
  },
  commentsList: {
    gap: spacing.md,
  },
  commentCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    padding: spacing.md,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray300,
    borderWidth: 1,
    borderColor: colors.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: {
    fontSize: 20,
  },
  commentUsername: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.gray900,
  },
  commentTime: {
    fontSize: fontSize.base,
    color: colors.gray500,
  },
  commentDelete: {
    fontSize: 20,
    color: colors.gray400,
  },
  commentContent: {
    width: '100%',
    minHeight: 40,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentContentText: {
    fontSize: fontSize.base,
    color: colors.gray700,
  },
});

export default RecipeDetailPage;

