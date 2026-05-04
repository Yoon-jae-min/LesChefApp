import type { IngredientGroup, RecipeStep } from '../../types/apiRecipe';

export const transformIngredients = (
  ingredientGroups: IngredientGroup[],
): Array<{
  sortType: string;
  ingredientUnit: Array<{
    ingredientName: string;
    volume: number;
    unit: string;
    amountText?: string;
  }>;
}> => {
  return ingredientGroups.map((group) => ({
    sortType: group.sortType,
    ingredientUnit: group.ingredients.map((ingredient) => ({
      ingredientName: ingredient.ingredientName,
      volume: ingredient.volume,
      unit: ingredient.unit,
      amountText: ingredient.amountText?.trim() ? ingredient.amountText.trim() : undefined,
    })),
  }));
};

export const transformSteps = (
  steps: RecipeStep[],
): Array<{
  stepNum: number;
  stepWay: string;
  stepImg: string;
}> => {
  return steps.map((step) => ({
    stepNum: step.stepNum,
    stepWay: step.stepWay,
    stepImg: step.stepImg.startsWith('data:') ? '' : step.stepImg,
  }));
};
