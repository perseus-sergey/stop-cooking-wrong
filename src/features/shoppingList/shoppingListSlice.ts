import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TSelectedIngredient } from './types';

type ShoppingListState = {
  selectedIngredients: TSelectedIngredient[];
  checkedProductIds: string[];
};

const initialState: ShoppingListState = {
  selectedIngredients: [],
  checkedProductIds: [],
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
      const { recipeId, ingredientId } = action.payload;

      const ingredientToRemove = state.selectedIngredients.find(
        (item) =>
          item.recipeId === recipeId && item.ingredientId === ingredientId
      );

      state.selectedIngredients = state.selectedIngredients.filter(
        (item) =>
          !(item.recipeId === recipeId && item.ingredientId === ingredientId)
      );

      if (ingredientToRemove) {
        const productStillSelected = state.selectedIngredients.some(
          (item) => item.productId === ingredientToRemove.productId
        );

        if (!productStillSelected) {
          state.checkedProductIds = state.checkedProductIds.filter(
            (id) => id !== ingredientToRemove.productId
          );
        }
      }
    },

    clearShoppingList: (state) => {
      state.selectedIngredients = [];
      state.checkedProductIds = [];
    },

    toggleProductChecked: (
      state,
      action: PayloadAction<{ productId: string }>
    ) => {
      const { productId } = action.payload;

      const isChecked = state.checkedProductIds.includes(productId);

      if (isChecked) {
        state.checkedProductIds = state.checkedProductIds.filter(
          (id) => id !== productId
        );
      } else {
        state.checkedProductIds.push(productId);
      }
    },

    removeProduct: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;

      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.productId !== productId
      );

      state.checkedProductIds = state.checkedProductIds.filter(
        (id) => id !== productId
      );
    },

    hydrateShoppingList: (
      state,
      action: PayloadAction<TSelectedIngredient[]>
    ) => {
      state.selectedIngredients = action.payload;
    },

    hydrateCheckedProducts: (state, action: PayloadAction<string[]>) => {
      state.checkedProductIds = action.payload;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearShoppingList,
  hydrateShoppingList,
  removeProduct,
  toggleProductChecked,
  hydrateCheckedProducts,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
