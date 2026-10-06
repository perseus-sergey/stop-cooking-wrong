import { TShoppingQuantity } from '@/features/shoppingList/types';
import { TFormatterUnit } from '@/types/formatter.type';
import { TUnitSystem } from '@/types/recipe.type';
import { convertQuantity } from './conversion';
import { formatConvertedQuantity } from './quantity';
import { UnitCategory } from '@prisma/client';
import { formatFraction } from './fraction';

export function formatShoppingQuantity(
  quantity: TShoppingQuantity,
  options: {
    unitSystem: TUnitSystem;
    units: TFormatterUnit[];
    unitsById: Map<string, TFormatterUnit>;
  }
): string {
  const sourceUnit = options.unitsById.get(quantity.unitId);

  if (!sourceUnit) {
    return formatStoredShoppingQuantity(quantity);
  }

  const converted = convertQuantity(
    {
      amount: quantity.amount,
      amountMax: quantity.amountMax,
      unit: sourceUnit,
    },
    {
      unitSystem: options.unitSystem,
      units: options.units,
    }
  );

  return formatConvertedQuantity(converted);
}

function formatStoredShoppingQuantity(quantity: TShoppingQuantity): string {
  if (quantity.amount == null && quantity.amountMax == null) {
    return quantity.unitName;
  }

  const formatAmount = (amount: number) =>
    quantity.unitCategory === UnitCategory.COOKING
      ? formatFraction(amount)
      : String(Number(amount.toFixed(3)));

  if (quantity.amountMax != null) {
    if (quantity.amount == null) {
      return `${formatAmount(quantity.amountMax)} ${quantity.unitSymbol}`;
    }

    return `${formatAmount(quantity.amount)}–${formatAmount(
      quantity.amountMax
    )} ${quantity.unitSymbol}`;
  }

  return `${formatAmount(quantity.amount!)} ${quantity.unitSymbol}`;
}
