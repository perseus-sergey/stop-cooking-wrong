import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddShoppingListItemPayload, ShoppingListState } from './types';

const initialState: ShoppingListState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',

  initialState,

  reducers: {
    addItem: (state, action: PayloadAction<AddShoppingListItemPayload>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (existing) => existing.productId === item.productId
      );

      if (existingItem) {
        existingItem.quantities.push(item.quantity);
      }
    },
  },
});

export const { addItem } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
