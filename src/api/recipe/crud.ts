import { API_CONFIG } from '../../config/apiConfig';
import { handleApiError } from '../error/apiErrorTypes';
import type { RecipeSubmitData, RecipeInfo } from '../../types/apiRecipe';
import { transformIngredients, transformSteps } from './transformers';
import { authFetch } from '../authFetch';

const API_BASE_URL = API_CONFIG.RECIPE_API;

export const submitRecipe = async (data: RecipeSubmitData): Promise<Response> => {
  const { recipeInfo, ingredientGroups, steps, recipeImgFile, isEdit, recipeId, deleteImgs } = data;

  const formData = new FormData();

  const recipeInfoData: RecipeInfo = {
    ...recipeInfo,
    viewCount: recipeInfo.viewCount || 0,
  };
  if (isEdit && recipeId) {
    recipeInfoData._id = recipeId;
  }

  formData.append('recipeInfo', JSON.stringify(recipeInfoData));
  formData.append('recipeIngredients', JSON.stringify(transformIngredients(ingredientGroups)));
  formData.append('recipeSteps', JSON.stringify(transformSteps(steps)));
  formData.append('isEdit', JSON.stringify(isEdit || false));

  if (isEdit && deleteImgs && deleteImgs.length > 0) {
    deleteImgs.forEach((imgUrl) => {
      formData.append('deleteImgs', imgUrl);
    });
  }

  if (recipeImgFile) {
    formData.append('recipeImgFile', {
      uri: recipeImgFile.uri,
      type: recipeImgFile.type || 'image/jpeg',
      name: recipeImgFile.name || 'recipe.jpg',
    } as any);
  }

  steps.forEach((step) => {
    if (step.stepImgFile) {
      const f = step.stepImgFile;
      formData.append('recipeStepImgFiles', {
        uri: f.uri,
        type: f.type || 'image/jpeg',
        name: f.name || 'step.jpg',
      } as any);
    }
  });

  const response = await authFetch(`${API_BASE_URL}/write`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }
  return response;
};

export const deleteRecipe = async (recipeId: string): Promise<Response> => {
  if (!recipeId) {
    throw new Error('레시피 ID가 필요합니다.');
  }

  const response = await authFetch(`${API_BASE_URL}/${recipeId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    let errorMessage = `레시피 삭제 실패: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response;
};
