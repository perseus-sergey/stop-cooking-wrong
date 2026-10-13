import type { Store } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { lsSaveFavorites } from '@/lib/redux/persistence';

export function subscribeToFavoritesPersistence(store: Store<RootState>) {
  let previousRecipeIds = store.getState().favorites.recipeIds;

  return store.subscribe(() => {
    const currentRecipeIds = store.getState().favorites.recipeIds;

    if (currentRecipeIds !== previousRecipeIds) {
      previousRecipeIds = currentRecipeIds;
      lsSaveFavorites(currentRecipeIds);
    }
  });
}
