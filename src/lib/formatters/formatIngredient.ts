import type { TRecipeIngredient } from '@/queries/recipes.query';
import { formatFraction } from './fraction';
import { UnitSystem, UnitCategory } from '@prisma/client';
import type {
  TFormatIngredientOptions,
  TFormatterUnit,
} from '@/types/formatter.type';
import {
  chooseDisplayUnit,
  convertAmount,
  convertQuantity,
  roundAmount,
} from './conversion';

export const toFormatterIngredient = (
  ingredient: TRecipeIngredient
): FormatterIngredient => ({
  amount: ingredient.amount,
  amountMax: ingredient.amountMax,
  notes: ingredient.notes,

  product: {
    name: ingredient.product.name,
  },

  unit: {
    id: ingredient.unit.id,
    code: ingredient.unit.code,
    name: ingredient.unit.name,
    symbol: ingredient.unit.symbol,
    system: ingredient.unit.system,
    category: ingredient.unit.category,
    baseUnitId: ingredient.unit.baseUnitId,
    conversionFactor: ingredient.unit.conversionFactor,
  },
});

export const formatIngredientForJsonLd = (
  ingredient: TRecipeIngredient,
  units: TFormatterUnit[]
): string => {
  const formatted = formatIngredient(toFormatterIngredient(ingredient), {
    unitSystem: 'metric',
    units,
  });

  if (formatted.unit.category === 'QUALITATIVE') {
    return [formatted.unit.name, formatted.productName, formatted.notes]
      .filter(Boolean)
      .join(' ');
  }

  const quantity =
    formatted.amount == null
      ? null
      : formatted.amountMax != null
        ? `${formatted.amount}–${formatted.amountMax}`
        : `${formatted.amount}`;

  return [
    quantity,
    formatted.unit.symbol,
    formatted.productName,
    formatted.notes,
  ]
    .filter(Boolean)
    .join(' ');
};

type FormatterIngredient = {
  amount: number | string | null;
  amountMax: number | string | null;
  notes: string | null;

  product: {
    name: string;
  };

  unit: TFormatterUnit;
};

type ConvertedIngredient = {
  amount: number | null;
  amountMax: number | null;
  unit: TFormatterUnit;
};

/**
 * Converts an ingredient to the requested display system.
 */
const convertIngredient = (
  ingredient: FormatterIngredient,
  options: TFormatIngredientOptions
): ConvertedIngredient => {
  return convertQuantity(
    {
      amount: ingredient.amount,
      amountMax: ingredient.amountMax,
      unit: ingredient.unit,
    },
    options
  );
};

/**
 * Formats one ingredient for UI / JSON-LD / print.
 */
export type FormattedIngredient = {
  amount: number | null;
  amountMax: number | null;
  unit: TFormatterUnit;
  productName: string;
  notes: string | null;
};

export const formatIngredient = (
  ingredient: FormatterIngredient,
  options: TFormatIngredientOptions
): FormattedIngredient => {
  const formatted = convertIngredient(ingredient, options);

  return {
    amount: formatted.amount,
    amountMax: formatted.amountMax,
    unit: formatted.unit,
    productName: ingredient.product.name,
    notes: ingredient.notes,
  };
};

export const formatIngredientQuantity = (
  ingredient: FormattedIngredient
): string => {
  if (ingredient.amount == null) {
    return ingredient.unit.name;
  }

  const formatAmount = (amount: number) => {
    if (ingredient.unit.category === UnitCategory.COOKING) {
      return formatFraction(amount);
    }

    return String(amount);
  };

  if (ingredient.amountMax != null) {
    return `${formatAmount(ingredient.amount)}–${formatAmount(
      ingredient.amountMax
    )} ${ingredient.unit.symbol}`;
  }

  return `${formatAmount(ingredient.amount)} ${ingredient.unit.symbol}`;
};
