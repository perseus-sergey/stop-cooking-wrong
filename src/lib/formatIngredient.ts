import type { TRecipeIngredient } from '@/queries/recipes.query';
import type { TUnitSystem } from '@/types/recipe.type';
import type { UnitSystem, UnitCategory } from '@prisma/client';

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
  units: FormatterUnit[]
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

export type FormatterUnit = {
  id: string;
  code: string;
  name: string;
  symbol: string;

  system: UnitSystem;
  category: UnitCategory;

  baseUnitId: string | null;
  conversionFactor: number | string | null;
};

type FormatterIngredient = {
  amount: number | string | null;
  amountMax: number | string | null;
  notes: string | null;

  product: {
    name: string;
  };

  unit: FormatterUnit;
};

export type FormatIngredientOptions = {
  unitSystem: TUnitSystem;
  units: FormatterUnit[];
};

type ConvertedIngredient = {
  amount: number | null;
  amountMax: number | null;
  unit: FormatterUnit;
};

/**
 * Converts an amount between two compatible units.
 *
 * conversionFactor means:
 * "how many base units are in one unit".
 *
 * Example:
 * 1 kg = 1000 g
 * 1 oz = 28.3495 g
 *
 * So:
 * amount * fromFactor / toFactor
 */
const convertAmount = (
  amount: number,
  from: FormatterUnit,
  to: FormatterUnit
): number | null => {
  if (from.category !== to.category) {
    return null;
  }

  if (!from.baseUnitId || !to.baseUnitId) {
    return null;
  }

  if (from.baseUnitId !== to.baseUnitId) {
    return null;
  }

  if (from.conversionFactor == null || to.conversionFactor == null) {
    return null;
  }

  const fromFactor = Number(from.conversionFactor);
  const toFactor = Number(to.conversionFactor);

  if (
    !Number.isFinite(fromFactor) ||
    !Number.isFinite(toFactor) ||
    fromFactor <= 0 ||
    toFactor <= 0
  ) {
    return null;
  }

  return (amount * fromFactor) / toFactor;
};

/**
 * Returns units that can be used as a target for conversion.
 */
const getCompatibleUnits = (
  sourceUnit: FormatterUnit,
  targetSystem: UnitSystem,
  units: FormatterUnit[]
) => {
  if (!sourceUnit.baseUnitId) {
    return [];
  }

  return units.filter((unit) => {
    return (
      unit.system === targetSystem &&
      unit.category === sourceUnit.category &&
      unit.baseUnitId === sourceUnit.baseUnitId &&
      unit.conversionFactor != null
    );
  });
};

/**
 * Selects the most natural target unit.
 *
 * We prefer a unit where the resulting amount is closest to 1.
 *
 * Examples:
 * 100 g:
 *   3.53 oz
 *   0.22 lb
 * → oz
 *
 * 500 g:
 *   17.64 oz
 *   1.10 lb
 * → lb
 *
 * No unit codes are hardcoded here.
 */
const chooseDisplayUnit = (
  amount: number,
  sourceUnit: FormatterUnit,
  targetSystem: UnitSystem,
  units: FormatterUnit[]
) => {
  const candidates = getCompatibleUnits(sourceUnit, targetSystem, units);

  if (candidates.length === 0) {
    return null;
  }

  const scored = candidates
    .map((unit) => {
      const converted = convertAmount(amount, sourceUnit, unit);

      if (converted == null || converted <= 0) {
        return null;
      }

      return {
        unit,
        amount: converted,
        score: Math.abs(Math.log(converted)),
      };
    })
    .filter(
      (
        candidate
      ): candidate is {
        unit: FormatterUnit;
        amount: number;
        score: number;
      } => candidate !== null
    );

  if (scored.length === 0) {
    return null;
  }

  scored.sort((a, b) => {
    if (a.score !== b.score) {
      return a.score - b.score;
    }

    // If equally close to 1, prefer the value >= 1.
    const aAboveOne = a.amount >= 1;
    const bAboveOne = b.amount >= 1;

    if (aAboveOne !== bAboveOne) {
      return aAboveOne ? -1 : 1;
    }

    return a.amount - b.amount;
  });

  return scored[0];
};

/**
 * Rounds an ingredient amount for display.
 */
const roundAmount = (value: number, unit: FormatterUnit): number => {
  if (!Number.isFinite(value)) {
    return value;
  }

  const absolute = Math.abs(value);

  switch (unit.code) {
    case 'GRAM':
      if (absolute >= 1000) {
        return Math.round(value / 100) * 100;
      }

      if (absolute >= 100) {
        return Math.round(value / 10) * 10;
      }

      if (absolute >= 10) {
        return Math.round(value);
      }

      return Math.round(value * 10) / 10;

    case 'KILOGRAM':
      if (absolute >= 10) {
        return Math.round(value);
      }

      return Math.round(value * 10) / 10;

    case 'OUNCE':
      if (absolute >= 10) {
        return Math.round(value);
      }

      if (absolute >= 1) {
        return Math.round(value * 2) / 2;
      }

      return Math.round(value * 10) / 10;

    case 'POUND':
      if (absolute >= 10) {
        return Math.round(value);
      }

      if (absolute >= 1) {
        return Math.round(value * 10) / 10;
      }

      return Math.round(value * 100) / 100;

    case 'MILLILITER':
      if (absolute >= 1000) {
        return Math.round(value / 100) * 100;
      }

      if (absolute >= 100) {
        return Math.round(value / 10) * 10;
      }

      if (absolute >= 10) {
        return Math.round(value);
      }

      return Math.round(value * 10) / 10;

    case 'LITER':
      if (absolute >= 10) {
        return Math.round(value);
      }

      return Math.round(value * 10) / 10;

    default:
      if (absolute >= 100) {
        return Math.round(value);
      }

      if (absolute >= 10) {
        return Math.round(value);
      }

      if (absolute >= 1) {
        return Math.round(value * 10) / 10;
      }

      return Math.round(value * 100) / 100;
  }
};

/**
 * Converts an ingredient to the requested display system.
 */
const convertIngredient = (
  ingredient: FormatterIngredient,
  options: FormatIngredientOptions
): ConvertedIngredient => {
  const { unit } = ingredient;

  const amount = ingredient.amount == null ? null : Number(ingredient.amount);

  const amountMax =
    ingredient.amountMax == null ? null : Number(ingredient.amountMax);

  /*
   * No numeric amount.
   *
   * Example:
   * "to taste"
   */
  if (amount == null || !Number.isFinite(amount)) {
    return {
      amount: null,
      amountMax: null,
      unit,
    };
  }

  /*
   * Universal units are never converted.
   *
   * Examples:
   * cup, tablespoon, piece, clove, bunch, to taste
   */
  if (unit.system === 'UNIVERSAL') {
    return {
      amount: roundAmount(amount, unit),
      amountMax: amountMax == null ? null : roundAmount(amountMax, unit),
      unit,
    };
  }

  const targetSystem: UnitSystem =
    options.unitSystem === 'metric' ? 'METRIC' : 'US';

  /*
   * Already using the requested system.
   */
  if (unit.system === targetSystem) {
    return {
      amount: roundAmount(amount, unit),
      amountMax: amountMax == null ? null : roundAmount(amountMax, unit),
      unit,
    };
  }

  /*
   * The unit cannot be converted.
   */
  if (unit.baseUnitId == null || unit.conversionFactor == null) {
    return {
      amount: roundAmount(amount, unit),
      amountMax: amountMax == null ? null : roundAmount(amountMax, unit),
      unit,
    };
  }

  /*
   * For ranges, use the midpoint to choose the most
   * appropriate target unit.
   *
   * Example:
   * 600–700 g → choose lb based on 650 g.
   */
  const representativeAmount =
    amountMax != null ? (amount + amountMax) / 2 : amount;

  const selected = chooseDisplayUnit(
    representativeAmount,
    unit,
    targetSystem,
    options.units
  );

  /*
   * No compatible target unit.
   * Keep the original value and unit.
   */
  if (!selected) {
    return {
      amount: roundAmount(amount, unit),
      amountMax: amountMax == null ? null : roundAmount(amountMax, unit),
      unit,
    };
  }

  const convertedAmount = convertAmount(amount, unit, selected.unit);

  if (convertedAmount == null) {
    return {
      amount: roundAmount(amount, unit),
      amountMax: amountMax == null ? null : roundAmount(amountMax, unit),
      unit,
    };
  }

  const convertedAmountMax =
    amountMax == null ? null : convertAmount(amountMax, unit, selected.unit);

  return {
    amount: roundAmount(convertedAmount, selected.unit),
    amountMax:
      convertedAmountMax == null
        ? null
        : roundAmount(convertedAmountMax, selected.unit),
    unit: selected.unit,
  };
};

/**
 * Formats one ingredient for UI / JSON-LD / print.
 */
export type FormattedIngredient = {
  amount: number | null;
  amountMax: number | null;
  unit: FormatterUnit;
  productName: string;
  notes: string | null;
};

export const formatIngredient = (
  ingredient: FormatterIngredient,
  options: FormatIngredientOptions
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

  if (ingredient.amountMax != null) {
    return `${ingredient.amount}–${ingredient.amountMax} ${ingredient.unit.symbol}`;
  }

  return `${ingredient.amount} ${ingredient.unit.symbol}`;
};
