export const RECIPE_DEFAULTS = {
  COOK_TIME: 30,
  PORTION: 2,
  PORTION_UNIT: '인분',
  COOK_LEVEL: '쉬움',
  MAJOR_CATEGORY: '한식',
  SUB_CATEGORY: '전체',
  INGREDIENT_UNIT: '개',
  INGREDIENT_GROUP_TYPE: '주재료',
} as const;

export const RECIPE_OPTIONS = {
  COOK_LEVELS: ['쉬움', '보통', '어려움'] as const,
  PORTION_UNITS: ['인분', '그릇', '개'] as const,
  MAJOR_CATEGORIES: ['한식', '일식', '중식', '양식'] as const,
} as const;

export const RECIPE_SUBCATEGORIES_BY_MAJOR: Record<
  (typeof RECIPE_OPTIONS.MAJOR_CATEGORIES)[number],
  readonly string[]
> = {
  한식: ['전체', '국, 찌개', '밥, 면', '반찬', '기타'],
  일식: ['전체', '국, 전골', '면', '밥', '기타'],
  중식: ['전체', '튀김, 찜', '면', '밥', '기타'],
  양식: ['전체', '스프, 스튜', '면', '빵', '기타'],
};

export const RECIPE_VALIDATION_MESSAGES = {
  NAME_REQUIRED: '레시피 이름을 입력해주세요.',
  INGREDIENT_REQUIRED: '최소 1개 이상의 재료를 입력해주세요.',
  STEP_REQUIRED: '최소 1개 이상의 조리 단계를 입력해주세요.',
} as const;

export function recipeSubCategoryForApi(formValue: string): string {
  const value = formValue.trim();
  return value === '' || value === '전체' ? '' : value;
}

export function recipeSubCategoryFromApi(apiValue: string | undefined | null): string {
  const value = (apiValue ?? '').trim();
  return value === '' ? '전체' : value;
}

export function normalizeMajorCategory(value: string | undefined | null): string {
  const normalized = (value ?? '').trim();
  const legacyMap: Record<string, string> = {
    korean: '한식',
    japanese: '일식',
    chinese: '중식',
    western: '양식',
  };
  return legacyMap[normalized] ?? (normalized || RECIPE_DEFAULTS.MAJOR_CATEGORY);
}
