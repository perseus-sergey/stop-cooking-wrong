import { RootState } from '@/app/store';
import type { TSelectedIngredient, TShoppingListCategory } from './types';
import { createSelector } from '@reduxjs/toolkit';
import { mergeShoppingQuantities } from './quantityUtils';

const selectSelectedIngredients = (state: RootState): TSelectedIngredient[] =>
  state.shoppingList.selectedIngredients;

export const selectShoppingList = createSelector(
  [selectSelectedIngredients],
  (selectedIngredients): TShoppingListCategory[] => {
    const categories = new Map<string, TShoppingListCategory>();

    for (const ingredient of selectedIngredients) {
      let category = categories.get(ingredient.categoryId);

      if (!category) {
        category = {
          categoryId: ingredient.categoryId,
          categoryName: ingredient.categoryName,
          items: [],
        };

        categories.set(ingredient.categoryId, category);
      }

      let product = category.items.find(
        (item) => item.productId === ingredient.productId
      );

      if (!product) {
        product = {
          productId: ingredient.productId,
          productName: ingredient.productName,
          sources: [],
          totals: [],
        };

        category.items.push(product);
      }

      product.sources.push({
        recipeId: ingredient.recipeId,
        recipeSlug: ingredient.recipeSlug,
        recipeTitle: ingredient.recipeTitle,
        quantity: ingredient.quantity,
      });

      const existingTotal = product.totals.find(
        (quantity) => quantity.unitId === ingredient.quantity.unitId
      );

      if (!existingTotal) {
        product.totals.push({
          ...ingredient.quantity,
        });
      } else {
        Object.assign(
          existingTotal,
          mergeShoppingQuantities(existingTotal, ingredient.quantity)
        );
      }
    }

    return Array.from(categories.values());
  }
);
