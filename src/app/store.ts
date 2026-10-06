import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from '@/features/shoppingList/shoppingListSlice';
import preferencesReducer from '@/features/preferences/preferencesSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
