import { prisma } from '@/lib/prisma';
import { CACHE_TAGS } from '@/types/cache-tags.type';
import { cacheLife, cacheTag } from 'next/cache';

export async function getNavCategories() {
  'use cache';

  cacheTag(CACHE_TAGS.navCategories);
  cacheLife('hours');

  return prisma.category.findMany({
    where: {
      isActive: true,
      recipes: {
        some: {},
      },
    },

    orderBy: [
      {
        type: 'asc',
      },
      {
        order: 'asc',
      },
      {
        name: 'asc',
      },
    ],

    include: {
      _count: {
        select: {
          recipes: true,
        },
      },
    },
  });
}

export async function getCategoryPageData(slug: string) {
  'use cache';

  cacheTag(CACHE_TAGS.category(slug));
  cacheLife('hours');

  return prisma.category.findUnique({
    where: {
      slug,
      isActive: true,
    },
    include: {
      recipes: {
        include: {
          recipe: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
