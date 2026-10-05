import type { TShoppingQuantity } from './types';

export function mergeShoppingQuantities(
  existing: TShoppingQuantity,
  incoming: TShoppingQuantity
): TShoppingQuantity {
  const existingHasAmount =
    existing.amount != null || existing.amountMax != null;

  const incomingHasAmount =
    incoming.amount != null || incoming.amountMax != null;

  // Qualitative quantities such as "to taste" or "as needed"
  // cannot be mathematically combined.
  if (!existingHasAmount && !incomingHasAmount) {
    return existing;
  }

  const minAmount =
    (existing.amount ?? existing.amountMax ?? 0) +
    (incoming.amount ?? incoming.amountMax ?? 0);

  const maxAmount =
    (existing.amountMax ?? existing.amount ?? 0) +
    (incoming.amountMax ?? incoming.amount ?? 0);

  const isRange = existing.amountMax != null || incoming.amountMax != null;

  return {
    ...existing,
    amount: minAmount,
    amountMax: isRange ? maxAmount : null,
  };
}

export function formatTShoppingQuantity(quantity: TShoppingQuantity): string {
  if (quantity.amount == null && quantity.amountMax == null) {
    return quantity.unitName;
  }

  if (quantity.amountMax != null) {
    return `${quantity.amount}–${quantity.amountMax} ${quantity.unitSymbol}`;
  }

  return `${quantity.amount} ${quantity.unitSymbol}`;
}
