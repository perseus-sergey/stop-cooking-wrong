'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

import { hydrateShoppingList } from '@/features/shoppingList/shoppingListSlice';
import {
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
    const savedIngredients = lsLoadShoppingList();

    store.dispatch(hydrateShoppingList(savedIngredients));

    const savedUnitSystem = lsLoadUnitSystem();

    if (savedUnitSystem) {
      store.dispatch(setUnitSystem(savedUnitSystem));
    }

    let previousSelectedIngredients =
      store.getState().shoppingList.selectedIngredients;

    let previousUnitSystem = store.getState().preferences.unitSystem;

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      const currentSelectedIngredients = state.shoppingList.selectedIngredients;

      const currentUnitSystem = state.preferences.unitSystem;

      if (currentSelectedIngredients !== previousSelectedIngredients) {
        previousSelectedIngredients = currentSelectedIngredients;

        lsSaveShoppingList(currentSelectedIngredients);
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
