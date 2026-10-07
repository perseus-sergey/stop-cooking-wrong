import type { TSelectedIngredient } from '@/features/shoppingList/types';
import { TUnitSystem } from '@/types/recipe.type';

const STORAGE_VERSION = 1;

const SHOPPING_LIST_STORAGE_KEY = 'recipe-site:shopping-list';
const UNIT_SYSTEM_STORAGE_KEY = 'recipe-site:unit-system';

type PersistedShoppingList = {
  version: number;
  selectedIngredients: TSelectedIngredient[];
};

export function lsLoadShoppingList(): TSelectedIngredient[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: PersistedShoppingList = JSON.parse(raw);

    if (
      parsed.version !== STORAGE_VERSION ||
      !Array.isArray(parsed.selectedIngredients)
    ) {
      return [];
    }

    return parsed.selectedIngredients;
  } catch {
    return [];
  }
}

export function lsSaveShoppingList(selectedIngredients: TSelectedIngredient[]) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: PersistedShoppingList = {
      version: STORAGE_VERSION,
      selectedIngredients,
    };

    window.localStorage.setItem(
      SHOPPING_LIST_STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch {
    // localStorage may be unavailable or full.
  }
}

export function lsLoadUnitSystem(): TUnitSystem | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(UNIT_SYSTEM_STORAGE_KEY);

    if (raw !== 'us' && raw !== 'metric') {
      return null;
    }

    return raw;
  } catch {
    return null;
  }
}

export function lsSaveUnitSystem(unitSystem: TUnitSystem) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(UNIT_SYSTEM_STORAGE_KEY, unitSystem);
  } catch {
    // localStorage may be unavailable or full.
  }
}
