/** 웹 leschef-web-front types/recipe 와 동일 (API 연동용) */

export type Ingredient = {
  ingredientName: string;
  volume: number;
  unit: string;
  amountText?: string;
};

export type IngredientGroup = {
  sortType: string;
  ingredients: Ingredient[];
};

export type RecipeStep = {
  stepNum: number;
  stepWay: string;
  stepImg: string;
  /** RN 업로드 시 로컬 파일 */
  stepImgFile?: { uri: string; name: string; type: string } | null;
};

export type RecipeInfo = {
  recipeName: string;
  cookTime: number;
  portion: number;
  portionUnit: string;
  cookLevel: string;
  majorCategory: string;
  subCategory: string;
  recipeImg: string;
  viewCount?: number;
  _id?: string;
};

export type RecipeSubmitData = {
  recipeInfo: RecipeInfo;
  ingredientGroups: IngredientGroup[];
  steps: RecipeStep[];
  recipeImgFile: { uri: string; name: string; type: string } | null;
  isEdit?: boolean;
  recipeId?: string;
  deleteImgs?: string[];
};

export type RecipeSortOption = 'latest' | 'views' | 'popular' | 'rating';

export type RecipeListParams = {
  category?: 'all' | 'korean' | 'japanese' | 'chinese' | 'western' | 'other';
  subCategory?: string;
  isShare?: boolean;
  page?: number;
  limit?: number;
  sort?: RecipeSortOption;
  keyword?: string;
  tag?: string;
};

export type RecipeListItem = {
  _id?: string;
  recipeName: string;
  cookTime?: number;
  cookLevel?: string;
  majorCategory?: string;
  subCategory?: string;
  recipeImg?: string;
  viewCount?: number;
  averageRating?: number;
  reviewCount?: number;
};

export type RecipeListResponse = {
  list: RecipeListItem[];
  page: number;
  limit: number;
  total: number;
};

export type RecipeDetailResponse = {
  selectedRecipe: {
    _id?: string;
    recipeName: string;
    cookTime?: number;
    portion?: number;
    portionUnit?: string;
    cookLevel?: string;
    majorCategory?: string;
    subCategory?: string;
    recipeImg?: string;
    userId?: string;
    viewCount?: number;
  };
  recipeIngres: Array<{
    sortType: string;
    ingredientUnit: Array<{
      ingredientName: string;
      volume: number;
      unit: string;
      amountText?: string;
    }>;
  }>;
  recipeSteps: Array<{
    stepNum: number;
    stepWay: string;
    stepImg: string;
  }>;
  recipeWish: boolean;
};

export type MyRecipeListResponse = {
  list: RecipeListItem[];
};

export type WishRecipeListResponse = {
  wishList: RecipeListItem[];
};

export type ToggleWishResponse = {
  recipeWish: boolean;
};

export type RecipeDetailApiBody = RecipeDetailResponse & {
  error?: boolean;
  message?: string;
};
