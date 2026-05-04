import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { fetchRecipeForEdit } from '../../api/recipe/queries';
import { submitRecipe } from '../../api/recipe/crud';
import type { RecipeInfo, IngredientGroup, RecipeStep } from '../../types/apiRecipe';

function RecipeEditPage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const recipeId = String((route.params as { recipeId?: string })?.recipeId || '');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState<RecipeInfo | null>(null);
  const [groups, setGroups] = useState<IngredientGroup[]>([]);
  const [steps, setSteps] = useState<RecipeStep[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!recipeId) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchRecipeForEdit(recipeId);
        if (cancelled) return;
        const sr = data.selectedRecipe;
        setRecipeInfo({
          recipeName: sr.recipeName,
          cookTime: sr.cookTime ?? 0,
          portion: sr.portion ?? 1,
          portionUnit: sr.portionUnit || '인분',
          cookLevel: sr.cookLevel || '보통',
          majorCategory: sr.majorCategory || 'korean',
          subCategory: sr.subCategory || '기타',
          recipeImg: sr.recipeImg || '',
          viewCount: sr.viewCount ?? 0,
          _id: sr._id,
        });
        setGroups(
          (data.recipeIngres || []).map((g) => ({
            sortType: g.sortType,
            ingredients: g.ingredientUnit.map((u) => ({
              ingredientName: u.ingredientName,
              volume: Number(u.volume) || 0,
              unit: u.unit,
              amountText: u.amountText,
            })),
          })),
        );
        setSteps(
          (data.recipeSteps || []).map((s) => ({
            stepNum: s.stepNum,
            stepWay: s.stepWay,
            stepImg: s.stepImg || '',
          })),
        );
      } catch (e) {
        Alert.alert('오류', e instanceof Error ? e.message : '불러오지 못했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [recipeId]);

  const onSave = async () => {
    if (!recipeInfo) return;
    setSaving(true);
    try {
      await submitRecipe({
        recipeInfo,
        ingredientGroups: groups.length
          ? groups
          : [{ sortType: '재료', ingredients: [{ ingredientName: '재료', volume: 0, unit: 'g' }] }],
        steps: steps.length ? steps : [{ stepNum: 1, stepWay: '내용을 입력하세요', stepImg: '' }],
        recipeImgFile: null,
        isEdit: true,
        recipeId,
      });
      Alert.alert('완료', '저장되었습니다.', [{ text: '확인', onPress: () => (navigation as any).goBack() }]);
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !recipeInfo) {
    return (
      <View style={styles.container}>
        <Top />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.title}>레시피 수정</Text>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={recipeInfo.recipeName}
            onChangeText={(t) => setRecipeInfo({ ...recipeInfo, recipeName: t })}
          />
          <Text style={styles.label}>조리시간(분)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(recipeInfo.cookTime)}
            onChangeText={(t) => setRecipeInfo({ ...recipeInfo, cookTime: Number(t) || 0 })}
          />
          <Text style={styles.label}>첫 단계 설명</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={steps[0]?.stepWay || ''}
            onChangeText={(t) => {
              const next = [...steps];
              if (!next[0]) next[0] = { stepNum: 1, stepWay: t, stepImg: '' };
              else next[0] = { ...next[0], stepWay: t };
              setSteps(next);
            }}
            multiline
          />
          <Pressable style={styles.btn} onPress={onSave} disabled={saving}>
            <Text style={styles.btnText}>{saving ? '저장 중…' : '저장'}</Text>
          </Pressable>
          <Pressable onPress={() => (navigation as any).goBack()}>
            <Text style={styles.back}>취소</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg },
  card: { borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.gray200, padding: spacing.lg, gap: spacing.sm },
  title: { fontSize: fontSize['2xl'], fontWeight: '800' },
  label: { marginTop: spacing.sm, fontWeight: '700', color: colors.gray800 },
  input: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.gray900,
  },
  textarea: { minHeight: 120, textAlignVertical: 'top' },
  btn: {
    marginTop: spacing.lg,
    backgroundColor: colors.gray900,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  btnText: { color: colors.white, fontWeight: '800' },
  back: { marginTop: spacing.md, textAlign: 'center', color: colors.gray600, textDecorationLine: 'underline' },
});

export default RecipeEditPage;
