'use client';

import { ROUTES } from '@/config/site.config';
import { useAppSelector } from '@/hooks/redux';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { selectFavoriteRecipeIds } from '@/features/favorites/selectors';

export default function FavoritesLink() {
  const count = useAppSelector(selectFavoriteRecipeIds).length;

  return (
    <Link
      href={ROUTES.favorites}
      title="Favorite recipes"
      aria-label={`Favorite recipes${count > 0 ? `, ${count} saved` : ''}`}
      className="relative inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <span className="relative">
        <Heart className="size-5" />

        {count > 0 && (
          <span
            className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-semibold text-white"
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </span>
    </Link>
  );
}
