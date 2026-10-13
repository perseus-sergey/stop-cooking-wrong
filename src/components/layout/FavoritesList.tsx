'use client';

import { getFavoriteRecipes } from '@/actions/favoriteRecipes.action';
import { selectFavoriteRecipeIds } from '@/features/favorites/selectors';
import { useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';
import RecipeCard from '../recipe/RecipeCard';
import { RecipeCardData } from '@/types/recipe.type';
import RecipeCardSkeleton from './RecipeCardSkeleton';

export default function FavoritesList() {
  const favoriteIds = useAppSelector(selectFavoriteRecipeIds);

  const [recipes, setRecipes] = useState<RecipeCardData[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      if (favoriteIds.length === 0) {
        setRecipes([]);
        setHasLoaded(true);
        setError(false);
        return;
      }

      try {
        const result = await getFavoriteRecipes(favoriteIds);

        if (!cancelled) {
          setRecipes(result);
          setError(false);
          setHasLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setHasLoaded(true);
        }
      }
    }

    void loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  // Миттєво приховуємо рецепти, яких уже немає в Redux.
  const favoriteIdSet = new Set(favoriteIds);
  const visibleRecipes = recipes.filter((recipe) =>
    favoriteIdSet.has(recipe.id)
  );

  // Початкове завантаження або очікування ще не отриманого рецепта.
  if (
    !hasLoaded ||
    (favoriteIds.length > 0 && visibleRecipes.length === 0 && error === false)
  ) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-red-600">
        Could not load favorite recipes. Please try again.
      </p>
    );
  }

  if (recipes.length === 0 || visibleRecipes.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-semibold">No favorite recipes yet</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Tap the heart on a recipe to save it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visibleRecipes.map((recipe, index) => (
        <RecipeCard key={recipe.id} recipe={recipe} priority={index === 0} />
      ))}
    </div>
  );
}
