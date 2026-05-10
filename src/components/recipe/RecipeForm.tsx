import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { launchImageLibrary, type Asset } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import {
  normalizeMajorCategory,
  RECIPE_DEFAULTS,
  RECIPE_OPTIONS,
  RECIPE_SUBCATEGORIES_BY_MAJOR,
  RECIPE_VALIDATION_MESSAGES,
  recipeSubCategoryForApi,
  recipeSubCategoryFromApi,
} from '../../constants/recipe';
import type { IngredientGroup, RecipeInfo, RecipeStep, RecipeSubmitData } from '../../types/apiRecipe';

type RecipeImageFile = NonNullable<RecipeSubmitData['recipeImgFile']>;

type IngredientDraft = {
  ingredientName: string;
  volume: string;
  unit: string;
  amountText: string;
};

type IngredientGroupDraft = {
  sortType: string;
  ingredients: IngredientDraft[];
};

type RecipeStepDraft = {
  stepNum: number;
  stepWay: string;
  stepImg: string;
  stepImgFile: RecipeImageFile | null;
};

type RecipeFormProps = {
  mode: 'create' | 'edit';
  initialRecipeInfo?: RecipeInfo;
  initialIngredientGroups?: IngredientGroup[];
  initialSteps?: RecipeStep[];
  submitting: boolean;
  onSubmit: (data: RecipeSubmitData) => Promise<void>;
  onCancel: () => void;
};

function createImageFile(asset: Asset, fallbackName: string): RecipeImageFile | null {
  if (!asset.uri) {
    return null;
  }
  const name = asset.fileName || fallbackName;
  return {
    uri: asset.uri,
    name,
    type: asset.type || 'image/jpeg',
  };
}

function toIngredientDrafts(groups?: IngredientGroup[]): IngredientGroupDraft[] {
  if (!groups || groups.length === 0) {
    return [
      {
        sortType: RECIPE_DEFAULTS.INGREDIENT_GROUP_TYPE,
        ingredients: [
          {
            ingredientName: '',
            volume: '1',
            unit: RECIPE_DEFAULTS.INGREDIENT_UNIT,
            amountText: '',
          },
        ],
      },
    ];
  }

  return groups.map((group) => ({
    sortType: group.sortType || RECIPE_DEFAULTS.INGREDIENT_GROUP_TYPE,
    ingredients: group.ingredients.map((ingredient) => ({
      ingredientName: ingredient.ingredientName,
      volume: String(ingredient.volume || ''),
      unit: ingredient.unit || RECIPE_DEFAULTS.INGREDIENT_UNIT,
      amountText: ingredient.amountText || '',
    })),
  }));
}

function toStepDrafts(steps?: RecipeStep[]): RecipeStepDraft[] {
  if (!steps || steps.length === 0) {
    return [{ stepNum: 1, stepWay: '', stepImg: '', stepImgFile: null }];
  }

  return steps.map((step, index) => ({
    stepNum: index + 1,
    stepWay: step.stepWay,
    stepImg: step.stepImg || '',
    stepImgFile: null,
  }));
}

function RecipeForm({
  mode,
  initialRecipeInfo,
  initialIngredientGroups,
  initialSteps,
  submitting,
  onSubmit,
  onCancel,
}: RecipeFormProps): React.JSX.Element {
  const [recipeName, setRecipeName] = useState(initialRecipeInfo?.recipeName || '');
  const [cookTime, setCookTime] = useState(String(initialRecipeInfo?.cookTime ?? RECIPE_DEFAULTS.COOK_TIME));
  const [portion, setPortion] = useState(String(initialRecipeInfo?.portion ?? RECIPE_DEFAULTS.PORTION));
  const [portionUnit, setPortionUnit] = useState(initialRecipeInfo?.portionUnit || RECIPE_DEFAULTS.PORTION_UNIT);
  const [cookLevel, setCookLevel] = useState(initialRecipeInfo?.cookLevel || RECIPE_DEFAULTS.COOK_LEVEL);
  const [majorCategory, setMajorCategory] = useState(normalizeMajorCategory(initialRecipeInfo?.majorCategory));
  const [subCategory, setSubCategory] = useState(recipeSubCategoryFromApi(initialRecipeInfo?.subCategory));
  const [recipeImgPreview, setRecipeImgPreview] = useState(initialRecipeInfo?.recipeImg || '');
  const [recipeImgFile, setRecipeImgFile] = useState<RecipeImageFile | null>(null);
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroupDraft[]>(
    toIngredientDrafts(initialIngredientGroups),
  );
  const [steps, setSteps] = useState<RecipeStepDraft[]>(toStepDrafts(initialSteps));
  const [deleteImgs, setDeleteImgs] = useState<string[]>([]);

  const subCategoryOptions = useMemo(() => {
    return (
      RECIPE_SUBCATEGORIES_BY_MAJOR[majorCategory as keyof typeof RECIPE_SUBCATEGORIES_BY_MAJOR] ||
      RECIPE_SUBCATEGORIES_BY_MAJOR[RECIPE_DEFAULTS.MAJOR_CATEGORY]
    );
  }, [majorCategory]);

  const pickImage = async (target: 'main' | 'step', stepIndex?: number) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    });

    if (result.didCancel) {
      return;
    }
    if (result.errorCode) {
      Alert.alert('사진 선택', result.errorMessage || '사진을 선택하지 못했습니다.');
      return;
    }
    if (!result.assets?.[0]?.uri) {
      return;
    }

    const asset = result.assets[0];
    const assetUri = asset.uri;
    if (!assetUri) {
      return;
    }
    const file = createImageFile(asset, target === 'main' ? 'recipe.jpg' : `step-${(stepIndex ?? 0) + 1}.jpg`);
    if (!file) {
      Alert.alert('사진 선택', '선택한 사진 정보를 읽지 못했습니다.');
      return;
    }

    if (target === 'main') {
      if (recipeImgPreview && !recipeImgPreview.startsWith('file:')) {
        setDeleteImgs((prev) => [...prev, recipeImgPreview]);
      }
      setRecipeImgPreview(assetUri);
      setRecipeImgFile(file);
      return;
    }

    if (typeof stepIndex !== 'number') {
      return;
    }
    setSteps((prev) =>
      prev.map((step, index) => {
        if (index !== stepIndex) {
          return step;
        }
        if (step.stepImg && !step.stepImg.startsWith('file:')) {
          setDeleteImgs((imgs) => [...imgs, step.stepImg]);
        }
        return { ...step, stepImg: assetUri, stepImgFile: file };
      }),
    );
  };

  const removeMainImage = () => {
    if (recipeImgPreview && !recipeImgPreview.startsWith('file:')) {
      setDeleteImgs((prev) => [...prev, recipeImgPreview]);
    }
    setRecipeImgPreview('');
    setRecipeImgFile(null);
  };

  const updateGroup = (groupIndex: number, nextGroup: Partial<IngredientGroupDraft>) => {
    setIngredientGroups((prev) =>
      prev.map((group, index) => (index === groupIndex ? { ...group, ...nextGroup } : group)),
    );
  };

  const updateIngredient = (
    groupIndex: number,
    ingredientIndex: number,
    nextIngredient: Partial<IngredientDraft>,
  ) => {
    setIngredientGroups((prev) =>
      prev.map((group, index) => {
        if (index !== groupIndex) {
          return group;
        }
        return {
          ...group,
          ingredients: group.ingredients.map((ingredient, childIndex) =>
            childIndex === ingredientIndex ? { ...ingredient, ...nextIngredient } : ingredient,
          ),
        };
      }),
    );
  };

  const addIngredientGroup = () => {
    setIngredientGroups((prev) => [
      ...prev,
      {
        sortType: '',
        ingredients: [{ ingredientName: '', volume: '', unit: RECIPE_DEFAULTS.INGREDIENT_UNIT, amountText: '' }],
      },
    ]);
  };

  const addIngredient = (groupIndex: number) => {
    setIngredientGroups((prev) =>
      prev.map((group, index) =>
        index === groupIndex
          ? {
              ...group,
              ingredients: [
                ...group.ingredients,
                { ingredientName: '', volume: '', unit: RECIPE_DEFAULTS.INGREDIENT_UNIT, amountText: '' },
              ],
            }
          : group,
      ),
    );
  };

  const removeIngredient = (groupIndex: number, ingredientIndex: number) => {
    setIngredientGroups((prev) => {
      const next = prev
        .map((group, index) => {
          if (index !== groupIndex) {
            return group;
          }
          return {
            ...group,
            ingredients: group.ingredients.filter((_, childIndex) => childIndex !== ingredientIndex),
          };
        })
        .filter((group) => group.ingredients.length > 0);
      return next.length > 0 ? next : toIngredientDrafts();
    });
  };

  const addStep = () => {
    setSteps((prev) => [...prev, { stepNum: prev.length + 1, stepWay: '', stepImg: '', stepImgFile: null }]);
  };

  const updateStep = (stepIndex: number, nextStep: Partial<RecipeStepDraft>) => {
    setSteps((prev) => prev.map((step, index) => (index === stepIndex ? { ...step, ...nextStep } : step)));
  };

  const removeStep = (stepIndex: number) => {
    setSteps((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      const removed = prev[stepIndex];
      if (removed.stepImg && !removed.stepImg.startsWith('file:')) {
        setDeleteImgs((imgs) => [...imgs, removed.stepImg]);
      }
      return prev
        .filter((_, index) => index !== stepIndex)
        .map((step, index) => ({ ...step, stepNum: index + 1 }));
    });
  };

  const removeStepImage = (stepIndex: number) => {
    setSteps((prev) =>
      prev.map((step, index) => {
        if (index !== stepIndex) {
          return step;
        }
        if (step.stepImg && !step.stepImg.startsWith('file:')) {
          setDeleteImgs((imgs) => [...imgs, step.stepImg]);
        }
        return { ...step, stepImg: '', stepImgFile: null };
      }),
    );
  };

  const handleSubmit = async () => {
    if (!recipeName.trim()) {
      Alert.alert('레시피', RECIPE_VALIDATION_MESSAGES.NAME_REQUIRED);
      return;
    }
    const hasIngredient = ingredientGroups.some((group) =>
      group.ingredients.some((ingredient) => ingredient.ingredientName.trim()),
    );
    if (!hasIngredient) {
      Alert.alert('레시피', RECIPE_VALIDATION_MESSAGES.INGREDIENT_REQUIRED);
      return;
    }
    const hasStep = steps.some((step) => step.stepWay.trim());
    if (!hasStep) {
      Alert.alert('레시피', RECIPE_VALIDATION_MESSAGES.STEP_REQUIRED);
      return;
    }

    const recipeInfo: RecipeInfo = {
      recipeName: recipeName.trim(),
      cookTime: Number(cookTime) || 0,
      portion: Number(portion) || 1,
      portionUnit: portionUnit.trim() || RECIPE_DEFAULTS.PORTION_UNIT,
      cookLevel: cookLevel.trim() || RECIPE_DEFAULTS.COOK_LEVEL,
      majorCategory,
      subCategory: recipeSubCategoryForApi(subCategory),
      recipeImg: recipeImgFile ? '' : recipeImgPreview,
      viewCount: initialRecipeInfo?.viewCount ?? 0,
      _id: initialRecipeInfo?._id,
    };

    const submitIngredientGroups: IngredientGroup[] = ingredientGroups
      .map((group) => ({
        sortType: group.sortType.trim() || RECIPE_DEFAULTS.INGREDIENT_GROUP_TYPE,
        ingredients: group.ingredients
          .filter((ingredient) => ingredient.ingredientName.trim())
          .map((ingredient) => ({
            ingredientName: ingredient.ingredientName.trim(),
            volume: Number(ingredient.volume) || 0,
            unit: ingredient.unit.trim() || RECIPE_DEFAULTS.INGREDIENT_UNIT,
            amountText: ingredient.amountText.trim() || undefined,
          })),
      }))
      .filter((group) => group.ingredients.length > 0);

    const submitSteps: RecipeStep[] = steps
      .filter((step) => step.stepWay.trim())
      .map((step, index) => ({
        stepNum: index + 1,
        stepWay: step.stepWay.trim(),
        stepImg: step.stepImg,
        stepImgFile: step.stepImgFile,
      }));

    await onSubmit({
      recipeInfo,
      ingredientGroups: submitIngredientGroups,
      steps: submitSteps,
      recipeImgFile,
      deleteImgs,
      isEdit: mode === 'edit',
      recipeId: initialRecipeInfo?._id,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, shadows.card]}>
        <Text style={styles.eyebrow}>Recipe</Text>
        <Text style={styles.title}>{mode === 'edit' ? '레시피 수정' : '레시피 작성'}</Text>
        <Text style={styles.subtitle}>
          사진, 재료, 조리 단계를 웹과 같은 구성으로 입력할 수 있습니다.
        </Text>

        <Text style={styles.sectionTitle}>기본 정보</Text>
        <Field label="레시피 이름" value={recipeName} onChangeText={setRecipeName} placeholder="예: 김치찌개" />
        <View style={styles.twoColumn}>
          <Field label="조리시간(분)" value={cookTime} onChangeText={setCookTime} keyboardType="numeric" />
          <Field label="인분" value={portion} onChangeText={setPortion} keyboardType="numeric" />
        </View>
        <SelectField label="인분 단위" value={portionUnit} items={[...RECIPE_OPTIONS.PORTION_UNITS]} onChange={setPortionUnit} />
        <SelectField label="난이도" value={cookLevel} items={[...RECIPE_OPTIONS.COOK_LEVELS]} onChange={setCookLevel} />
        <SelectField
          label="대분류"
          value={majorCategory}
          items={[...RECIPE_OPTIONS.MAJOR_CATEGORIES]}
          onChange={(value) => {
            setMajorCategory(value);
            setSubCategory(RECIPE_SUBCATEGORIES_BY_MAJOR[value as keyof typeof RECIPE_SUBCATEGORIES_BY_MAJOR][0]);
          }}
        />
        <SelectField label="소분류" value={subCategory} items={[...subCategoryOptions]} onChange={setSubCategory} />

        <Text style={styles.sectionTitle}>대표 사진</Text>
        <ImagePickerBox
          preview={recipeImgPreview}
          emptyText="대표 사진을 선택해주세요"
          onPick={() => pickImage('main')}
          onRemove={removeMainImage}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>재료</Text>
          <Pressable style={styles.outlineButton} onPress={addIngredientGroup}>
            <Text style={styles.outlineButtonText}>그룹 추가</Text>
          </Pressable>
        </View>
        {ingredientGroups.map((group, groupIndex) => (
          <View key={`group-${groupIndex}`} style={styles.nestedCard}>
            <Field
              label="재료 그룹명"
              value={group.sortType}
              onChangeText={(value) => updateGroup(groupIndex, { sortType: value })}
              placeholder="주재료, 양념 등"
            />
            {group.ingredients.map((ingredient, ingredientIndex) => (
              <View key={`ingredient-${groupIndex}-${ingredientIndex}`} style={styles.ingredientRow}>
                <Field
                  label="재료명"
                  value={ingredient.ingredientName}
                  onChangeText={(value) => updateIngredient(groupIndex, ingredientIndex, { ingredientName: value })}
                  placeholder="재료명"
                />
                <View style={styles.twoColumn}>
                  <Field
                    label="수량"
                    value={ingredient.volume}
                    onChangeText={(value) => updateIngredient(groupIndex, ingredientIndex, { volume: value })}
                    keyboardType="numeric"
                  />
                  <Field
                    label="단위"
                    value={ingredient.unit}
                    onChangeText={(value) => updateIngredient(groupIndex, ingredientIndex, { unit: value })}
                  />
                </View>
                <Field
                  label="직접 입력량(선택)"
                  value={ingredient.amountText}
                  onChangeText={(value) => updateIngredient(groupIndex, ingredientIndex, { amountText: value })}
                  placeholder="예: 약간"
                />
                <View style={styles.rowActions}>
                  <Pressable style={styles.smallButton} onPress={() => addIngredient(groupIndex)}>
                    <Text style={styles.smallButtonText}>재료 추가</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.smallButton, styles.dangerButton]}
                    onPress={() => removeIngredient(groupIndex, ingredientIndex)}
                  >
                    <Text style={[styles.smallButtonText, styles.dangerText]}>삭제</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>조리 단계</Text>
          <Pressable style={styles.outlineButton} onPress={addStep}>
            <Text style={styles.outlineButtonText}>단계 추가</Text>
          </Pressable>
        </View>
        {steps.map((step, stepIndex) => (
          <View key={`step-${stepIndex}`} style={styles.nestedCard}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>Step {stepIndex + 1}</Text>
              {steps.length > 1 && (
                <Pressable onPress={() => removeStep(stepIndex)}>
                  <Text style={styles.dangerText}>단계 삭제</Text>
                </Pressable>
              )}
            </View>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={step.stepWay}
              onChangeText={(value) => updateStep(stepIndex, { stepWay: value })}
              placeholder="조리 과정을 입력해주세요."
              placeholderTextColor={colors.stone500}
              multiline
            />
            <ImagePickerBox
              preview={step.stepImg}
              emptyText="단계 사진을 선택해주세요"
              onPick={() => pickImage('step', stepIndex)}
              onRemove={() => removeStepImage(stepIndex)}
            />
          </View>
        ))}

        <Pressable style={[styles.submitButton, shadows.orangeButton]} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.submitButtonText}>
            {submitting ? (mode === 'edit' ? '저장 중...' : '등록 중...') : mode === 'edit' ? '저장' : '등록'}
          </Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>취소</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.stone500}
        keyboardType={keyboardType}
      />
    </View>
  );
}

function SelectField({
  label,
  value,
  items,
  onChange,
}: {
  label: string;
  value: string;
  items: string[];
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={value} onValueChange={onChange} dropdownIconColor={colors.stone700}>
          {items.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

function ImagePickerBox({
  preview,
  emptyText,
  onPick,
  onRemove,
}: {
  preview: string;
  emptyText: string;
  onPick: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.imageBox}>
      {preview ? (
        <Image source={{ uri: preview }} style={styles.previewImage} resizeMode="cover" />
      ) : (
        <View style={styles.imageEmpty}>
          <Text style={styles.imageEmptyText}>{emptyText}</Text>
        </View>
      )}
      <View style={styles.imageActions}>
        <Pressable style={styles.smallButton} onPress={onPick}>
          <Text style={styles.smallButtonText}>{preview ? '사진 변경' : '사진 선택'}</Text>
        </Pressable>
        {preview ? (
          <Pressable style={[styles.smallButton, styles.dangerButton]} onPress={onRemove}>
            <Text style={[styles.smallButtonText, styles.dangerText]}>삭제</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing['2xl'],
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.xl,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: colors.orange600,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: spacing.xs,
    fontSize: fontSize['2xl'],
    fontWeight: '800',
    color: colors.gray900,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.stone500,
    lineHeight: fontSize.sm * 1.45,
  },
  sectionHeader: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.gray900,
  },
  field: {
    marginTop: spacing.sm,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.stone700,
  },
  input: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.stone200,
    borderRadius: borderRadius.md,
    backgroundColor: colors.stone50,
    padding: spacing.md,
    color: colors.gray900,
    flex: 1,
  },
  pickerWrapper: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.stone200,
    borderRadius: borderRadius.md,
    backgroundColor: colors.stone50,
    overflow: 'hidden',
  },
  imageBox: {
    marginTop: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 190,
  },
  imageEmpty: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  imageEmptyText: {
    fontSize: fontSize.sm,
    color: colors.stone500,
  },
  imageActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  nestedCard: {
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.orange100,
    backgroundColor: colors.orange50,
    padding: spacing.md,
  },
  ingredientRow: {
    marginTop: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    padding: spacing.md,
  },
  rowActions: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  outlineButton: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.orange200,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  outlineButtonText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.orange700,
  },
  smallButton: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.orange200,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  smallButtonText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.orange700,
  },
  dangerButton: {
    borderColor: colors.red200,
    backgroundColor: colors.red50,
  },
  dangerText: {
    color: colors.red600,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  stepTitle: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    color: colors.orange700,
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: spacing.xl,
    borderRadius: borderRadius.md,
    backgroundColor: colors.orange600,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: '800',
  },
  cancelButton: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  cancelText: {
    color: colors.stone500,
    fontWeight: '700',
  },
});

export default RecipeForm;
