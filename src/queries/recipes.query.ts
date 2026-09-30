import { prisma } from '@/lib/prisma';
import { CACHE_TAGS } from '@/types/cache-tags.type';
import { cacheLife, cacheTag } from 'next/cache';

export const getRecipe = async (slug: string) => {
  // 'use cache';

  // cacheTag(CACHE_TAGS.recipe(slug));
  // cacheLife('days');

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
