'use client';

import { toggleFavorite } from '@/features/favorites/favoritesSlice';
import { selectIsFavorite } from '@/features/favorites/selectors';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useHydrated } from '@/hooks/useHydrated';
import { Heart } from 'lucide-react';

type Props = {
  recipeId: string;
};

export default function FavoriteButton({ recipeId }: Props) {
  const dispatch = useAppDispatch();

  const hydrated = useHydrated();

  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, recipeId)
  );

  const title = hydrated
    ? isFavorite
      ? 'Remove from favorites'
      : 'Add to favorites'
    : 'Favorites';

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleFavorite(recipeId))}
      aria-label={title}
      title={title}
      aria-pressed={hydrated ? isFavorite : false}
      disabled={!hydrated}
      className="absolute top-5 right-3 z-20 flex size-12 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-md transition-transform hover:scale-110 disabled:cursor-wait dark:bg-zinc-900/90 dark:text-white"
    >
      <Heart
        className={`size-5 ${hydrated && isFavorite ? 'fill-red-500 text-red-500' : ''}`}
      />
    </button>
  );
}
