import { prisma } from '@/lib/prisma';

export async function getNavCategories() {
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
