import { describe, expect, it } from 'vitest';
import favoritesReducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
} from './favoritesSlice';

describe('favoritesSlice', () => {
  it('adds a recipe to favorites', () => {
    const state = favoritesReducer(undefined, addFavorite('recipe-1'));

    expect(state.recipeIds).toEqual(['recipe-1']);
  });

  it('does not add the same recipe twice', () => {
    const initialState = {
      recipeIds: ['recipe-1'],
    };

    const state = favoritesReducer(initialState, addFavorite('recipe-1'));

    expect(state.recipeIds).toEqual(['recipe-1']);
  });

  it('removes a recipe from favorites', () => {
    const initialState = {
      recipeIds: ['recipe-1', 'recipe-2'],
    };

    const state = favoritesReducer(initialState, removeFavorite('recipe-1'));

    expect(state.recipeIds).toEqual(['recipe-2']);
  });

  it('toggles a recipe on and off', () => {
    const addedState = favoritesReducer(undefined, toggleFavorite('recipe-1'));

    const removedState = favoritesReducer(
      addedState,
      toggleFavorite('recipe-1')
    );

    expect(addedState.recipeIds).toEqual(['recipe-1']);
    expect(removedState.recipeIds).toEqual([]);
  });
});
