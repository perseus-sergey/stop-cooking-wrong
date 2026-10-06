import { TShoppingQuantity } from '@/features/shoppingList/types';
import { UnitCategory } from '@prisma/client';

const FRACTIONS = [
  { value: 1 / 8, symbol: '⅛' },
  { value: 1 / 6, symbol: '⅙' },
  { value: 1 / 4, symbol: '¼' },
  { value: 1 / 3, symbol: '⅓' },
  { value: 3 / 8, symbol: '⅜' },
  { value: 1 / 2, symbol: '½' },
  { value: 5 / 8, symbol: '⅝' },
  { value: 2 / 3, symbol: '⅔' },
  { value: 3 / 4, symbol: '¾' },
  { value: 5 / 6, symbol: '⅚' },
  { value: 7 / 8, symbol: '⅞' },
] as const;

const FRACTION_TOLERANCE = 0.015;

export function formatFraction(value: number): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const whole = Math.floor(value);
  const fraction = value - whole;

  if (fraction === 0) {
    return String(whole);
  }

  let closest: (typeof FRACTIONS)[number] = FRACTIONS[0];
  let smallestDifference = Math.abs(fraction - closest.value);

  for (const candidate of FRACTIONS.slice(1)) {
    const difference = Math.abs(fraction - candidate.value);

    if (difference < smallestDifference) {
      closest = candidate;
      smallestDifference = difference;
    }
  }

  if (smallestDifference > FRACTION_TOLERANCE) {
    return String(Number(value.toFixed(3)));
  }

  if (whole === 0) {
    return closest.symbol;
  }

  return `${whole} ${closest.symbol}`;
}

export function formatShoppingQuantity(quantity: TShoppingQuantity): string {
  if (quantity.amount == null && quantity.amountMax == null) {
    return quantity.unitName;
  }

  const shouldFormatAsFraction = quantity.unitCategory === UnitCategory.COOKING;

  const formatAmount = (amount: number) =>
    shouldFormatAsFraction
      ? formatFraction(amount)
      : String(Number(amount.toFixed(3)));

  if (quantity.amountMax != null) {
    return `${formatAmount(quantity.amount!)}–${formatAmount(
      quantity.amountMax
    )} ${quantity.unitSymbol}`;
  }

  return `${formatAmount(quantity.amount!)} ${quantity.unitSymbol}`;
}
