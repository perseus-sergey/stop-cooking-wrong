import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FavoriteButton from './FavoriteButton';
import shoppingListReducer from '@/features/shoppingList/shoppingListSlice';
import preferencesReducer from '@/features/preferences/preferencesSlice';
import favoritesReducer, {
  hydrateFavorites,
} from '@/features/favorites/favoritesSlice';
import { useHydrated } from '@/hooks/useHydrated';

vi.mock('@/hooks/useHydrated', () => ({
  useHydrated: vi.fn(),
}));

function renderFavoriteButton(initialFavorites: string[] = []) {
  const store = configureStore({
    reducer: {
      shoppingList: shoppingListReducer,
      preferences: preferencesReducer,
      favorites: favoritesReducer,
    },
  });

  store.dispatch(hydrateFavorites(initialFavorites));

  const result = render(
    <Provider store={store}>
      <FavoriteButton recipeId="recipe-1" />
    </Provider>
  );

  return { store, ...result };
}

describe('FavoriteButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useHydrated).mockReturnValue(true);
  });

  it('shows Add to favorites when the recipe is not a favorite', () => {
    renderFavoriteButton();

    const button = screen.getByRole('button', {
      name: 'Add to favorites',
    });

    expect(button).toBeEnabled();
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('adds a recipe to favorites when clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderFavoriteButton();

    await user.click(screen.getByRole('button', { name: 'Add to favorites' }));

    expect(store.getState().favorites.recipeIds).toContain('recipe-1');

    expect(
      screen.getByRole('button', { name: 'Remove from favorites' })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('removes a recipe from favorites when clicked again', async () => {
    const user = userEvent.setup();
    const { store } = renderFavoriteButton(['recipe-1']);

    await user.click(
      screen.getByRole('button', { name: 'Remove from favorites' })
    );

    expect(store.getState().favorites.recipeIds).not.toContain('recipe-1');

    expect(
      await screen.findByRole('button', {
        name: 'Add to favorites',
      })
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('disables the button before hydration', () => {
    vi.mocked(useHydrated).mockReturnValue(false);

    renderFavoriteButton();

    const button = screen.getByRole('button', { name: 'Favorites' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });
});
