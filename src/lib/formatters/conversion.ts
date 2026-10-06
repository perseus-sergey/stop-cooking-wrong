import {
  TConvertedQuantity,
  TFormatIngredientOptions,
  TFormatterUnit,
} from '@/types/formatter.type';
import { UnitSystem } from '@prisma/client';

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
export const convertAmount = (
  amount: number,
  from: TFormatterUnit,
  to: TFormatterUnit
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
  sourceUnit: TFormatterUnit,
  targetSystem: UnitSystem,
  units: TFormatterUnit[]
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
export const chooseDisplayUnit = (
  amount: number,
  sourceUnit: TFormatterUnit,
  targetSystem: UnitSystem,
  units: TFormatterUnit[]
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
        unit: TFormatterUnit;
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
export const roundAmount = (value: number, unit: TFormatterUnit): number => {
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

export type ConvertibleQuantity = {
  amount: number | string | null;
  amountMax: number | string | null;
  unit: TFormatterUnit;
};

export const convertQuantity = (
  quantity: ConvertibleQuantity,
  options: TFormatIngredientOptions
): TConvertedQuantity => {
  const { unit } = quantity;

  const amount = quantity.amount == null ? null : Number(quantity.amount);

  const amountMax =
    quantity.amountMax == null ? null : Number(quantity.amountMax);

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
   * For ranges, use the midpoint to choose
   * the most appropriate target unit.
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
