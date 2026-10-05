export type ShoppingQuantity = {
  amount: number | null;
  amountMax: number | null;
  unitId: string;
  unitCode: string;
  unitSymbol: string;
};

export type ShoppingListState = {
  items: ShoppingListItem[];
};

export type ShoppingProduct = {
  productId: string;
  productName: string;
  categoryId: string;
  categoryName: string;
};

export type ShoppingListItem = ShoppingProduct & {
  quantities: ShoppingQuantity[];
  checked: boolean;
};

export type AddShoppingListItemPayload = ShoppingProduct & {
  quantity: ShoppingQuantity;
};
