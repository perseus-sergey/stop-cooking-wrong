import { beforeEach, describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

import shoppingListReducer from '@/features/shoppingList/shoppingListSlice';
import preferencesReducer from '@/features/preferences/preferencesSlice';
import favoritesReducer, {
  hydrateFavorites,
  toggleFavorite,
} from '@/features/favorites/favoritesSlice';

import { lsLoadFavorites, lsSaveFavorites } from '@/lib/redux/persistence';

import { subscribeToFavoritesPersistence } from '@/features/favorites/favoritesPersistence';

describe('favorites Redux integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('restores favorites and persists subsequent changes', () => {
    // 1. Підготовлюємо початковий стан у localStorage
    lsSaveFavorites(['recipe-1']);

    // 2. Створюємо Redux store
    const store = configureStore({
      reducer: {
        shoppingList: shoppingListReducer,
        preferences: preferencesReducer,
        favorites: favoritesReducer,
      },
    });

    // 3. Відновлюємо обране, як це робить StorePersistence
    store.dispatch(hydrateFavorites(lsLoadFavorites()));

    expect(store.getState().favorites.recipeIds).toEqual(['recipe-1']);

    // 4. Підписуємося на зміни обраного
    const unsubscribe = subscribeToFavoritesPersistence(store);

    try {
      // 5. Додаємо ще один рецепт
      store.dispatch(toggleFavorite('recipe-2'));

      // 6. Перевіряємо, що зміни автоматично збережені
      expect(store.getState().favorites.recipeIds).toEqual([
        'recipe-1',
        'recipe-2',
      ]);

      expect(lsLoadFavorites()).toEqual(['recipe-1', 'recipe-2']);
    } finally {
      // 7. Завжди відписуємося після тесту
      unsubscribe();
    }
  });
});
