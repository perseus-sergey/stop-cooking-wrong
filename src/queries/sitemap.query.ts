import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '../lib/prisma';
import { CACHE_TAGS } from '@/types/cache-tags.type';

export async function getSitemapCategories() {
  'use cache';

  cacheTag(CACHE_TAGS.sitemapCategories);
  cacheLife('hours');

  return prisma.category.findMany({
    where: {
      isActive: true,
      recipes: {
        some: {},
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });
}

export async function getSitemapRecipes() {
  'use cache';

  cacheTag(CACHE_TAGS.sitemapRecipes);
  cacheLife('hours');

  return prisma.recipe.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });
}
