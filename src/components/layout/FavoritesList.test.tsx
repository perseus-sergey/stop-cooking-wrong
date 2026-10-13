import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import favoritesReducer, {
  hydrateFavorites,
} from '@/features/favorites/favoritesSlice';
import shoppingListReducer from '@/features/shoppingList/shoppingListSlice';
import preferencesReducer from '@/features/preferences/preferencesSlice';

// Замінюємо запит до сервера контрольованими тестовими даними.

vi.mock('@/actions/favoriteRecipes.action', () => ({
  getFavoriteRecipes: vi.fn(),
}));

vi.mock('./RecipeCardSkeleton', () => ({
  default: () => <div data-testid="recipe-card-skeleton" />,
}));

import FavoritesList from './FavoritesList';
import { getFavoriteRecipes } from '@/actions/favoriteRecipes.action';

const mockRecipes = [
  {
    id: 'recipe-1',
    slug: 'chocolate-cake',
    title: 'Chocolate Cake',
    description: 'Rich chocolate cake',
    cookTimeMinutes: 45,
    featuredImage: '/images/cake.jpg',
    theRightMove: 'Do not overmix',
    categories: [{ category: { name: 'Dessert' } }],
  },
  {
    id: 'recipe-2',
    slug: 'tomato-soup',
    title: 'Tomato Soup',
    description: 'Fresh tomato soup',
    cookTimeMinutes: 30,
    featuredImage: '/images/soup.jpg',
    theRightMove: 'Use ripe tomatoes',
    categories: [{ category: { name: 'Lunch' } }],
  },
  {
    id: 'recipe-3',
    slug: 'chocolate-mousse',
    title: 'Chocolate Mousse',
    description: 'Creamy chocolate mousse',
    cookTimeMinutes: 20,
    featuredImage: '/images/mousse.jpg',
    theRightMove: 'Chill before serving',
    categories: [{ category: { name: 'Dessert' } }],
  },
];

function renderFavoritesList() {
  const store = configureStore({
    reducer: {
      shoppingList: shoppingListReducer,
      preferences: preferencesReducer,
      favorites: favoritesReducer,
    },
  });

  store.dispatch(hydrateFavorites(['recipe-1', 'recipe-2', 'recipe-3']));

  return render(
    <Provider store={store}>
      <FavoritesList />
    </Provider>
  );
}

describe('FavoritesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getFavoriteRecipes).mockResolvedValue(mockRecipes);
  });

  afterEach(() => {
    cleanup();
  });

  it('filters recipes by category', async () => {
    const user = userEvent.setup();

    renderFavoritesList();

    expect(await screen.findByText('Chocolate Cake')).toBeInTheDocument();
    expect(screen.getByText('Tomato Soup')).toBeInTheDocument();

    await user.click(
      screen.getByRole('combobox', { name: 'Filter by category' })
    );

    await user.click(await screen.findByRole('option', { name: 'Dessert' }));

    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
    expect(screen.getByText('Chocolate Mousse')).toBeInTheDocument();
    expect(screen.queryByText('Tomato Soup')).not.toBeInTheDocument();
  });

  it('combines category filter and title search', async () => {
    const user = userEvent.setup();

    renderFavoritesList();

    await screen.findByText('Chocolate Cake');

    await user.click(
      screen.getByRole('combobox', { name: 'Filter by category' })
    );

    await user.click(await screen.findByRole('option', { name: 'Dessert' }));

    await user.type(
      screen.getByRole('searchbox', {
        name: 'Search favorite recipes by title',
      }),
      'mousse'
    );

    expect(screen.getByText('Chocolate Mousse')).toBeInTheDocument();
    expect(screen.queryByText('Chocolate Cake')).not.toBeInTheDocument();
    expect(screen.queryByText('Tomato Soup')).not.toBeInTheDocument();
  });

  it('clears both search and category filters', async () => {
    const user = userEvent.setup();
    renderFavoritesList();

    expect(await screen.findByText('Chocolate Cake')).toBeInTheDocument();

    // Вибираємо категорію Dessert
    await user.click(
      screen.getByRole('combobox', { name: 'Filter by category' })
    );
    await user.click(await screen.findByRole('option', { name: 'Dessert' }));

    // Вводимо запит, який не збігається з жодним рецептом
    await user.type(
      screen.getByRole('searchbox', {
        name: 'Search favorite recipes by title',
      }),
      'xyz-no-match'
    );

    // Тепер має з'явитися кнопка очищення
    await user.click(
      await screen.findByRole('button', { name: 'Clear filters' })
    );

    // Перевіряємо, що пошук очищено
    expect(
      screen.getByRole('searchbox', {
        name: 'Search favorite recipes by title',
      })
    ).toHaveValue('');

    // Перевіряємо, що категорію повернуто до All categories
    expect(
      screen.getByRole('combobox', { name: 'Filter by category' })
    ).toHaveTextContent('all');

    // Усі рецепти знову доступні
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
    expect(screen.getByText('Tomato Soup')).toBeInTheDocument();
    expect(screen.getByText('Chocolate Mousse')).toBeInTheDocument();
  });

  it('shows skeletons while favorite recipes are loading', async () => {
    let resolveRecipes!: (recipes: typeof mockRecipes) => void;

    vi.mocked(getFavoriteRecipes).mockReturnValue(
      new Promise((resolve) => {
        resolveRecipes = resolve;
      })
    );

    renderFavoritesList();

    expect(screen.getAllByTestId('recipe-card-skeleton')).toHaveLength(6);

    expect(screen.queryByText('Chocolate Cake')).not.toBeInTheDocument();

    resolveRecipes(mockRecipes);

    expect(await screen.findByText('Chocolate Cake')).toBeInTheDocument();
  });

  it('shows an error message when loading favorites fails', async () => {
    vi.mocked(getFavoriteRecipes).mockRejectedValue(
      new Error('Request failed')
    );

    renderFavoritesList();

    expect(
      await screen.findByText(
        'Could not load favorite recipes. Please try again.'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });

  it('retries loading favorites after clicking Try again', async () => {
    const user = userEvent.setup();

    vi.mocked(getFavoriteRecipes)
      .mockRejectedValueOnce(new Error('Request failed'))
      .mockResolvedValueOnce(mockRecipes);

    renderFavoritesList();

    expect(
      await screen.findByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByText('Chocolate Cake')).toBeInTheDocument();

    expect(getFavoriteRecipes).toHaveBeenCalledTimes(2);
  });
});
