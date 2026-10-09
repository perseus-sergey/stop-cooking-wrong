'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

import {
  hydrateCheckedProducts,
  hydrateShoppingList,
} from '@/features/shoppingList/shoppingListSlice';
import {
  lsLoadCheckedProductIds,
  lsLoadShoppingList,
  lsLoadUnitSystem,
  lsSaveShoppingList,
  lsSaveUnitSystem,
} from '@/lib/redux/persistence';
import { setUnitSystem } from '@/features/preferences/preferencesSlice';

type StoreProviderProps = {
  children: React.ReactNode;
};

function StorePersistence() {
  useEffect(() => {
    store.dispatch(hydrateShoppingList(lsLoadShoppingList()));
    store.dispatch(hydrateCheckedProducts(lsLoadCheckedProductIds()));

    const savedUnitSystem = lsLoadUnitSystem();

    if (savedUnitSystem) {
      store.dispatch(setUnitSystem(savedUnitSystem));
    }

    let previousSelectedIngredients =
      store.getState().shoppingList.selectedIngredients;

    let previousCheckedProductIds =
      store.getState().shoppingList.checkedProductIds;

    let previousUnitSystem = store.getState().preferences.unitSystem;

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      const currentSelectedIngredients = state.shoppingList.selectedIngredients;

      const currentCheckedProductIds = state.shoppingList.checkedProductIds;

      const currentUnitSystem = state.preferences.unitSystem;

      const shoppingListChanged =
        currentSelectedIngredients !== previousSelectedIngredients ||
        currentCheckedProductIds !== previousCheckedProductIds;

      if (shoppingListChanged) {
        previousSelectedIngredients = currentSelectedIngredients;
        previousCheckedProductIds = currentCheckedProductIds;

        lsSaveShoppingList(
          currentSelectedIngredients,
          currentCheckedProductIds
        );
      }

      if (currentUnitSystem !== previousUnitSystem) {
        previousUnitSystem = currentUnitSystem;
        lsSaveUnitSystem(currentUnitSystem);
      }
    });

    return unsubscribe;
  }, []);

  return null;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <StorePersistence />
      {children}
    </Provider>
  );
}
