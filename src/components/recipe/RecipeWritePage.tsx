import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { submitRecipe } from '../../api/recipe/crud';
import type { RecipeInfo, IngredientGroup, RecipeStep } from '../../types/apiRecipe';

function RecipeWritePage(): React.JSX.Element {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [cookTime, setCookTime] = useState('30');
  const [portion, setPortion] = useState('2');
  const [cookLevel, setCookLevel] = useState('보통');
  const [major, setMajor] = useState('korean');
  const [sub, setSub] = useState('기타');
  const [ingName, setIngName] = useState('주재료');
  const [ingVol, setIngVol] = useState('1');
  const [ingUnit, setIngUnit] = useState('개');
  const [stepText, setStepText] = useState('1단계: 재료를 준비합니다.');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('작성', '레시피 이름을 입력해주세요.');
      return;
    }
    const recipeInfo: RecipeInfo = {
      recipeName: name.trim(),
      cookTime: Number(cookTime) || 0,
      portion: Number(portion) || 1,
      portionUnit: '인분',
      cookLevel: cookLevel.trim() || '보통',
      majorCategory: major.trim() || 'korean',
      subCategory: sub.trim() || '기타',
      recipeImg: '',
      viewCount: 0,
    };
    const ingredientGroups: IngredientGroup[] = [
      {
        sortType: '재료',
        ingredients: [{ ingredientName: ingName.trim() || '재료', volume: Number(ingVol) || 0, unit: ingUnit.trim() || 'g' }],
      },
    ];
    const steps: RecipeStep[] = [{ stepNum: 1, stepWay: stepText.trim(), stepImg: '' }];

    setLoading(true);
    try {
      await submitRecipe({
        recipeInfo,
        ingredientGroups,
        steps,
        recipeImgFile: null,
        isEdit: false,
      });
      Alert.alert('완료', '레시피가 등록되었습니다.', [{ text: '확인', onPress: () => (navigation as any).goBack() }]);
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.title}>레시피 작성</Text>
          <Field label="이름" value={name} onChangeText={setName} />
          <Field label="조리시간(분)" value={cookTime} onChangeText={setCookTime} keyboardType="numeric" />
          <Field label="인분" value={portion} onChangeText={setPortion} keyboardType="numeric" />
          <Field label="난이도" value={cookLevel} onChangeText={setCookLevel} />
          <Field label="대분류 코드(korean 등)" value={major} onChangeText={setMajor} />
          <Field label="소분류" value={sub} onChangeText={setSub} />
          <Text style={styles.section}>대표 재료</Text>
          <Field label="재료명" value={ingName} onChangeText={setIngName} />
          <Field label="수량" value={ingVol} onChangeText={setIngVol} keyboardType="numeric" />
          <Field label="단위" value={ingUnit} onChangeText={setIngUnit} />
          <Text style={styles.section}>첫 단계</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={stepText}
            onChangeText={setStepText}
            multiline
          />
          <Pressable style={styles.btn} onPress={onSubmit} disabled={loading}>
            <Text style={styles.btnText}>{loading ? '등록 중…' : '등록'}</Text>
          </Pressable>
          <Pressable onPress={() => (navigation as any).goBack()}>
            <Text style={styles.back}>취소</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'default' | 'numeric';
}) {
  return (
    <View style={{ marginTop: spacing.sm }}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg },
  card: { borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.gray200, padding: spacing.lg },
  title: { fontSize: fontSize['2xl'], fontWeight: '800' },
  section: { marginTop: spacing.md, fontWeight: '800', color: colors.gray900 },
  label: { fontSize: fontSize.sm, fontWeight: '700', color: colors.gray800 },
  input: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.gray900,
  },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
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

export default RecipeWritePage;
