import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Top from '../common/Top';
import RecipeForm from './RecipeForm';
import { colors } from '../../styles/theme';
import { fetchRecipeForEdit } from '../../api/recipe/queries';
import { submitRecipe } from '../../api/recipe/crud';
import type { RecipeInfo, IngredientGroup, RecipeStep, RecipeSubmitData } from '../../types/apiRecipe';

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

  const onSave = async (data: RecipeSubmitData) => {
    setSaving(true);
    try {
      await submitRecipe({ ...data, isEdit: true, recipeId });
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
      <RecipeForm
        mode="edit"
        initialRecipeInfo={recipeInfo}
        initialIngredientGroups={groups}
        initialSteps={steps}
        submitting={saving}
        onSubmit={onSave}
        onCancel={() => (navigation as any).goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
});

export default RecipeEditPage;
