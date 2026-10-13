import 'server-only';

import { prisma } from '@/lib/prisma';
import { RecipeCardData } from '@/types/recipe.type';

export async function queryFavoriteRecipes(
  recipeIds: string[],
  limit = 10
): Promise<RecipeCardData[]> {
  if (recipeIds.length === 0) return [];

  return prisma.recipe.findMany({
    where: {
      id: { in: recipeIds },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      cookTimeMinutes: true,
      featuredImage: true,
      theRightMove: true,
      categories: {
        take: 1,
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  });
}
