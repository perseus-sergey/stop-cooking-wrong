import { config } from 'dotenv';

config({ path: '.env.local' });

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { mockRecipes } from '../src/data/mock-recipe';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function getCategoryIds(slugs: string[]) {
  const categories = await prisma.category.findMany({
    where: {
      slug: {
        in: slugs,
      },
    },
  });

  const foundSlugs = new Set(categories.map((category) => category.slug));

  const missingSlugs = slugs.filter((slug) => !foundSlugs.has(slug));

  if (missingSlugs.length > 0) {
    throw new Error(
      `Missing categories: ${missingSlugs.join(
        ', '
      )}. Run seed-categories-tags.ts first.`
    );
  }

  return slugs.map(
    (slug) => categories.find((category) => category.slug === slug)!.id
  );
}

async function getTagIds(slugs: string[]) {
  const tags = await prisma.tag.findMany({
    where: {
      slug: {
        in: slugs,
      },
    },
  });

  const foundSlugs = new Set(tags.map((tag) => tag.slug));

  const missingSlugs = slugs.filter((slug) => !foundSlugs.has(slug));

  if (missingSlugs.length > 0) {
    throw new Error(
      `Missing tags: ${missingSlugs.join(
        ', '
      )}. Run seed-categories-tags.ts first.`
    );
  }

  return slugs.map((slug) => tags.find((tag) => tag.slug === slug)!.id);
}

async function getProductIds(slugs: string[]) {
  const products = await prisma.product.findMany({
    where: {
      slug: {
        in: slugs,
      },
    },
  });

  const foundSlugs = new Set(products.map((product) => product.slug));

  const missingSlugs = slugs.filter((slug) => !foundSlugs.has(slug));

  if (missingSlugs.length > 0) {
    throw new Error(
      `Missing products: ${missingSlugs.join(
        ', '
      )}. Run seed-categories-tags.ts first.`
    );
  }

  return new Map(products.map((product) => [product.slug, product.id]));
}

async function getUnitIds(codes: string[]) {
  const units = await prisma.unit.findMany({
    where: {
      code: {
        in: codes,
      },
    },
  });

  const foundCodes = new Set(units.map((unit) => unit.code));
  const missingCodes = codes.filter((code) => !foundCodes.has(code));

  if (missingCodes.length > 0) {
    throw new Error(
      `Missing units: ${missingCodes.join(', ')}. Run seed-categories-tags.ts first.`
    );
  }

  return new Map(units.map((unit) => [unit.code, unit.id]));
}

async function main() {
  console.log('🌱 Starting database seed...');

  let createdCount = 0;
  let skippedCount = 0;

  for (const recipeData of mockRecipes) {
    const {
      categorySlugs,
      tagSlugs,
      slug,
      title,
      description,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      caloriesPerServing,
      featuredImage,
      youtubeId,
      publishedAt,
      mistakeToAvoid,
      theRightMove,
      ingredients,
      steps,
    } = recipeData;

    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        slug,
      },
    });

    if (existingRecipe) {
      console.log(`⏭️ Skipping existing recipe: ${title}`);
      skippedCount++;
      continue;
    }

    const categoryIds = await getCategoryIds(categorySlugs);
    const tagIds = await getTagIds(tagSlugs);

    const productSlugs = [
      ...new Set(
        (ingredients ?? []).map((ingredient) => ingredient.productSlug)
      ),
    ];

    const productIdsBySlug = await getProductIds(productSlugs);

    const unitCodes = [
      ...new Set((ingredients ?? []).map((ingredient) => ingredient.unitCode)),
    ];

    const unitIdsByCode = await getUnitIds(unitCodes);

    await prisma.recipe.create({
      data: {
        slug,
        title,
        description,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        caloriesPerServing,
        featuredImage,
        youtubeId,
        publishedAt: new Date(publishedAt),
        mistakeToAvoid,
        theRightMove,

        categories: {
          create: categoryIds.map((categoryId) => ({
            categoryId,
          })),
        },

        tags: {
          create: tagIds.map((tagId) => ({
            tagId,
          })),
        },

        ingredients: {
          create: (ingredients ?? []).map((ingredient, index) => {
            const productId = productIdsBySlug.get(ingredient.productSlug);

            if (!productId) {
              throw new Error(
                `Missing product "${ingredient.productSlug}" for recipe "${slug}".`
              );
            }

            const unitId = unitIdsByCode.get(ingredient.unitCode);

            if (!unitId) {
              throw new Error(
                `Missing unit "${ingredient.unitCode}" for recipe "${slug}".`
              );
            }

            return {
              productId,
              amount: ingredient.amount ?? null,
              amountMax: ingredient.amountMax ?? null,
              unitId,
              notes: ingredient.notes ?? null,
              order: index,
            };
          }),
        },

        steps: {
          create: (steps ?? []).map(
            ({
              stepNumber,
              title,
              instruction,
              tempF,
              tempC,
              durationMinutes,
              isShakePoint,
              tip,
            }) => ({
              stepNumber,
              title,
              instruction,
              tempF,
              tempC,
              durationMinutes,
              isShakePoint: isShakePoint ?? false,
              tip,
            })
          ),
        },
      },
    });

    console.log(`✅ Added recipe: ${title}`);
    createdCount++;
  }

  console.log('');
  console.log('🌱 Seed completed!');
  console.log(`✅ Added: ${createdCount}`);
  console.log(`⏭️ Skipped existing: ${skippedCount}`);
}

main()
  .catch((error) => {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
