import { prisma } from '@/lib/prisma';
import { CACHE_TAGS } from '@/types/cache-tags.type';
import { cacheLife, cacheTag } from 'next/cache';

export async function getNavCategories() {
  // 'use cache';

  // cacheTag(CACHE_TAGS.navCategories);
  // cacheLife('hours');

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
