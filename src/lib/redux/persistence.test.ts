import { beforeEach, describe, expect, it } from 'vitest';
import { lsLoadFavorites, lsSaveFavorites } from './persistence';

describe('favorites persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns an empty array when no favorites are saved', () => {
    expect(lsLoadFavorites()).toEqual([]);
  });

  it('saves and loads favorite recipe IDs', () => {
    const recipeIds = ['recipe-1', 'recipe-2'];

    lsSaveFavorites(recipeIds);

    expect(lsLoadFavorites()).toEqual(recipeIds);
  });

  it('returns an empty array for invalid JSON', () => {
    localStorage.setItem('recipe-site:favorites', '{invalid');

    expect(lsLoadFavorites()).toEqual([]);
  });

  it('ignores invalid values and duplicate IDs', () => {
    localStorage.setItem(
      'recipe-site:favorites',
      JSON.stringify(['recipe-1', 42, 'recipe-2', 'recipe-1', null])
    );

    expect(lsLoadFavorites()).toEqual(['recipe-1', 'recipe-2']);
  });
});
