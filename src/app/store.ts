import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from '@/features/shoppingList/shoppingListSlice';
import preferencesReducer from '@/features/preferences/preferencesSlice';
import favoritesReducer from '@/features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    preferences: preferencesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
