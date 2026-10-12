import { RootState } from '@/app/store';

export const selectFavoriteRecipeIds = (state: RootState) =>
  state.favorites.recipeIds;

export const selectIsFavorite = (state: RootState, recipeId: string) =>
  state.favorites.recipeIds.includes(recipeId);
