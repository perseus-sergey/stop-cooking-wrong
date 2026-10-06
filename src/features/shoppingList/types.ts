import type { UnitCategory } from '@prisma/client';

export type TShoppingQuantity = {
  amount: number | null;
  amountMax: number | null;
  unitId: string;
  unitCode: string;
  unitSymbol: string;
  unitName: string;
  unitCategory: UnitCategory;
  // baseUnitId: string | null;
  // conversionFactor: number | null;
};

export type TSelectedIngredient = {
  recipeId: string;
  recipeSlug: string;
  recipeTitle: string;

  ingredientId: string;

  productId: string;
  productName: string;

  categoryId: string;
  categoryName: string;

  quantity: TShoppingQuantity;
};

export type TShoppingListSource = {
  recipeId: string;
  recipeSlug: string;
  recipeTitle: string;
  quantity: TShoppingQuantity;
};

export type TShoppingListProduct = {
  productId: string;
  productName: string;

  sources: TShoppingListSource[];

  totals: TShoppingQuantity[];
};

export type TShoppingListCategory = {
  categoryId: string;
  categoryName: string;

  items: TShoppingListProduct[];
};
