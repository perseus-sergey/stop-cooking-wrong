import { prisma } from '@/lib/prisma';
import { CACHE_TAGS } from '@/types/cache-tags.type';
import { cacheLife, cacheTag } from 'next/cache';

export const getRecipe = async (slug: string) => {
  'use cache';

  cacheTag(CACHE_TAGS.recipe(slug));
  cacheLife('days');

  return await prisma.recipe.findUnique({
    where: { slug },

    include: {
      ingredients: {
        orderBy: { order: 'asc' },
      },

      steps: {
        orderBy: { stepNumber: 'asc' },
      },

      categories: {
        include: {
          category: true,
        },
      },

      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
};

export const getRecipes = async () => {
  'use cache';

  cacheTag(CACHE_TAGS.recipes);
  cacheLife('hours');

  return await prisma.recipe.findMany({
    orderBy: { publishedAt: 'desc' },

    include: {
      categories: {
        include: { category: true },
        orderBy: {
          category: { order: 'asc' },
        },
      },
    },
  });
};
