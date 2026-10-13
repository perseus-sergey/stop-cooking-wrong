'use server';

import { queryFavoriteRecipes } from '@/queries/favoriteRecipes.query';
import { z } from 'zod';

const favoriteIdsSchema = z
  .array(z.string().min(1))
  .max(1000)
  .transform((ids) => [...new Set(ids)]);

export async function getFavoriteRecipes(input: unknown) {
  const parsed = favoriteIdsSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error('Invalid favorite recipe IDs');
  }

  return queryFavoriteRecipes(parsed.data);
}
