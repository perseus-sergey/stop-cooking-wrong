import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { mockRecipes } from '../src/data/mock-recipe';

const connectionString = process.env.DATABASE_URL;

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
      `Missing categories: ${missingSlugs.join(', ')}. Run seed-categories-tags.ts first.`
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
      `Missing tags: ${missingSlugs.join(', ')}. Run seed-categories-tags.ts first.`
    );
  }

  return slugs.map((slug) => tags.find((tag) => tag.slug === slug)!.id);
}

async function main() {
  console.log('🌱 Starting database seed...');

  let createdCount = 0;
  let skippedCount = 0;

  for (const {
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
  } of mockRecipes) {
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existingRecipe) {
      console.log(`⏭️ Skipping existing recipe: ${title}`);
      skippedCount++;
      continue;
    }

    const categoryIds = await getCategoryIds(categorySlugs);
    const tagIds = await getTagIds(tagSlugs);

    await prisma.recipe.create({
      data: {
        slug: slug,
        title: title,
        description: description,

        prepTimeMinutes: prepTimeMinutes,
        cookTimeMinutes: cookTimeMinutes,
        servings: servings,
        caloriesPerServing: caloriesPerServing,

        featuredImage: featuredImage,
        youtubeId: youtubeId,

        publishedAt: new Date(publishedAt),

        mistakeToAvoid: mistakeToAvoid,
        theRightMove: theRightMove,

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
          create: (ingredients ?? []).map(
            ({ name, amountMetric, amountUS, notes }, index) => ({
              name,
              amountUS,
              amountMetric,
              notes,
              order: index,
            })
          ),
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
