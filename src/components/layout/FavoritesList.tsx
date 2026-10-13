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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      if (favoriteIds.length === 0) {
        setRecipes([]);
        setLoading(false);
        setError(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const result = await getFavoriteRecipes(favoriteIds);

        if (!cancelled) {
          setRecipes(result);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  if (loading) {
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

  if (recipes.length === 0) {
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
      {recipes.map((recipe, index) => (
        <RecipeCard key={recipe.id} recipe={recipe} priority={index === 0} />
      ))}
    </div>
  );
}
