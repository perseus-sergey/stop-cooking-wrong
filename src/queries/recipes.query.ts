import { prisma } from '../lib/prisma';
import { CACHE_TAGS } from '@/types/cache-tags.type';
import { cacheLife, cacheTag } from 'next/cache';

export const getRecipe = async (slug: string) => {
  'use cache';

  cacheTag(CACHE_TAGS.recipe(slug));
  cacheLife('days');

  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: {
      ingredients: {
        orderBy: { order: 'asc' },
        include: {
          product: {
            include: {
              shoppingCategory: true,
            },
          },
          unit: true,
        },
      },
      steps: {
        orderBy: { stepNumber: 'asc' },
      },
      categories: {
        include: { category: true },
      },
      tags: {
        include: { tag: true },
      },
    },
  });

  if (!recipe) {
    return null;
  }

  return {
    ...recipe,
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount?.toString() ?? null,
      amountMax: ingredient.amountMax?.toString() ?? null,
      unit: {
        ...ingredient.unit,
        conversionFactor: ingredient.unit.conversionFactor?.toString() ?? null,
      },
    })),
  };
};

export type TGetRecipe = NonNullable<Awaited<ReturnType<typeof getRecipe>>>;
export type TRecipeIngredient = TGetRecipe['ingredients'][number];

export const getUnits = async () => {
  'use cache';

  cacheLife('days');

  const units = await prisma.unit.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      symbol: true,
      system: true,
      category: true,
      baseUnitId: true,
      conversionFactor: true,
    },
  });

  return units.map((unit) => ({
    ...unit,
    conversionFactor: unit.conversionFactor?.toString() ?? null,
  }));
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
