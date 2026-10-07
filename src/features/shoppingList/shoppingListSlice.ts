import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TSelectedIngredient } from './types';

type ShoppingListState = {
  selectedIngredients: TSelectedIngredient[];
};

const initialState: ShoppingListState = {
  selectedIngredients: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',

  initialState,

  reducers: {
    addIngredient: (state, action: PayloadAction<TSelectedIngredient>) => {
      const ingredient = action.payload;

      const alreadySelected = state.selectedIngredients.some(
        (item) =>
          item.recipeId === ingredient.recipeId &&
          item.ingredientId === ingredient.ingredientId
      );

      if (alreadySelected) {
        return;
      }

      state.selectedIngredients.push(ingredient);
    },

    removeIngredient: (
      state,
      action: PayloadAction<{
        recipeId: string;
        ingredientId: string;
      }>
    ) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) =>
          !(
            item.recipeId === action.payload.recipeId &&
            item.ingredientId === action.payload.ingredientId
          )
      );
    },

    hydrateShoppingList: (
      state,
      action: PayloadAction<TSelectedIngredient[]>
    ) => {
      state.selectedIngredients = action.payload;
    },
  },
});

export const { addIngredient, removeIngredient, hydrateShoppingList } =
  shoppingListSlice.actions;

export default shoppingListSlice.reducer;
