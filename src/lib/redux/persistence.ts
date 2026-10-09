import type { TSelectedIngredient } from '@/features/shoppingList/types';
import { TUnitSystem } from '@/types/recipe.type';

const STORAGE_VERSION = 2;

const SHOPPING_LIST_STORAGE_KEY = 'recipe-site:shopping-list';
const UNIT_SYSTEM_STORAGE_KEY = 'recipe-site:unit-system';

type PersistedShoppingList = {
  version: number;
  selectedIngredients: TSelectedIngredient[];
  checkedProductIds?: string[];
};

function lsReadShoppingList(): PersistedShoppingList | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as PersistedShoppingList;

    if (
      (parsed.version !== 1 && parsed.version !== STORAGE_VERSION) ||
      !Array.isArray(parsed.selectedIngredients)
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function lsLoadShoppingList(): TSelectedIngredient[] {
  return lsReadShoppingList()?.selectedIngredients ?? [];
}

export function lsLoadCheckedProductIds(): string[] {
  const saved = lsReadShoppingList();

  if (!saved || saved.version !== STORAGE_VERSION) {
    return [];
  }

  return Array.isArray(saved.checkedProductIds)
    ? saved.checkedProductIds.filter(
        (id): id is string => typeof id === 'string'
      )
    : [];
}

export function lsSaveShoppingList(
  selectedIngredients: TSelectedIngredient[],
  checkedProductIds: string[]
) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: PersistedShoppingList = {
      version: STORAGE_VERSION,
      selectedIngredients,
      checkedProductIds,
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
