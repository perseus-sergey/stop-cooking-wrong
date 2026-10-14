'use client';

import { getFavoriteRecipes } from '@/actions/favoriteRecipes.action';
import { selectFavoriteRecipeIds } from '@/features/favorites/selectors';
import { useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';
import RecipeCard from '../recipe/RecipeCard';
import { RecipeCardData } from '@/types/recipe.type';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import Link from 'next/link';
import { ROUTES } from '@/config/site.config';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

export default function FavoritesList() {
  const favoriteIds = useAppSelector(selectFavoriteRecipeIds);

  const [recipes, setRecipes] = useState<RecipeCardData[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      if (favoriteIds.length === 0) {
        setRecipes([]);
        setHasLoaded(true);
        setError(false);
        return;
      }

      setError(false);

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
  }, [favoriteIds, retryCount]);

  // Прибираємо картки, які вже видалені з обраного в Redux.
  const favoriteIdSet = new Set(favoriteIds);
  const visibleRecipes = recipes.filter((recipe) =>
    favoriteIdSet.has(recipe.id)
  );

  const categories = [
    ...new Set(
      visibleRecipes.flatMap((recipe) =>
        recipe.categories.map(({ category }) => category.name)
      )
    ),
  ].sort((a, b) => a.localeCompare(b, 'en-US'));

  // Пошук працює тільки з уже завантаженими рецептами.
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('en-US');

  const filteredRecipes = visibleRecipes.filter((recipe) => {
    const matchesQuery = recipe.title
      .toLocaleLowerCase('en-US')
      .includes(normalizedQuery);

    const matchesCategory =
      selectedCategory === 'all' ||
      recipe.categories.some(
        ({ category }) => category.name === selectedCategory
      );

    return matchesQuery && matchesCategory;
  });

  if (!hasLoaded) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Recipes are in Redux, but the database request hasn't returned
  // any recipes yet.
  if (favoriteIds.length > 0 && recipes.length === 0 && !error) {
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
      <div className="py-10 text-center">
        <p className="text-red-600">
          Could not load favorite recipes. Please try again.
        </p>
        <button
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
          className="mt-4 rounded-lg border px-4 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  // Порожня колекція: ще немає жодного улюбленого рецепта.
  if (visibleRecipes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
        <h2 className="text-xl font-semibold">No favorite recipes yet</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Tap the heart on a recipe to save it here.
        </p>
        <Link
          href={ROUTES.home}
          className="mt-6 inline-flex rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          Explore Recipes
        </Link>
      </div>
    );
  }

  return (
    <section aria-label="Favorite recipes">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-zinc-600 dark:text-zinc-400"
        >
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {visibleRecipes.length}
          </span>{' '}
          {visibleRecipes.length === 1 ? 'recipe' : 'recipes'} saved
        </p>

        <div className="flex w-full flex-col gap-3 sm:max-w-md sm:flex-row">
          <div className="w-full sm:flex-1">
            <span id="favorite-category-label" className="sr-only">
              Filter by category
            </span>

            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                if (value) setSelectedCategory(value);
              }}
            >
              <SelectTrigger
                id="favorite-category"
                aria-labelledby="favorite-category-label"
                className="w-full"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>

                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:flex-1">
            <label htmlFor="favorite-search" className="sr-only">
              Search favorite recipes by title
            </label>

            <Input
              id="favorite-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your favorites..."
              className="w-full"
            />
          </div>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="py-12 text-center">
          <h2 className="text-lg font-semibold">No matching recipes</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Try changing your search or category filter.
          </p>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-recipe-accent mt-4 h-auto p-0"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
