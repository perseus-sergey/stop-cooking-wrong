import { UnitCategory } from '@prisma/client';

import { formatFraction } from './fraction';
import { TConvertedQuantity } from '@/types/formatter.type';

export function formatConvertedQuantity(quantity: TConvertedQuantity): string {
  const formatAmount = (amount: number) => {
    if (quantity.unit.category === UnitCategory.COOKING) {
      return formatFraction(amount);
    }

    return String(Number(amount.toFixed(3)));
  };

  if (quantity.amount != null && quantity.amountMax != null) {
    return `${formatAmount(quantity.amount)}–${formatAmount(
      quantity.amountMax
    )} ${quantity.unit.symbol}`;
  }

  if (quantity.amount != null) {
    return `${formatAmount(quantity.amount)} ${quantity.unit.symbol}`;
  }

  return quantity.unit.name;
}
