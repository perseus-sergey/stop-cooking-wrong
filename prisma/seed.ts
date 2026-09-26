import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { mockRecipes } from '../src/data/mock-recipe';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  let createdCount = 0;
  let skippedCount = 0;

  for (const {
    slug,
    title,
    description,
    category,
    subCategories,
    tags,
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    caloriesPerServing,
    featuredImage,
    youtubeId,
    mistakeToAvoid,
    theRightMove,
    ingredients,
    steps,
  } of mockRecipes) {
    // Перевіряємо, чи рецепт уже існує
    const existingRecipe = await prisma.recipe.findUnique({ where: { slug } });

    if (existingRecipe) {
      console.log(`⏭️ Skipping existing recipe: ${title}`);
      skippedCount++;
      continue;
    }

    // Створюємо тільки новий рецепт
    await prisma.recipe.create({
      data: {
        slug,
        title,
        description,
        category,
        subCategories,
        tags,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        caloriesPerServing,
        featuredImage,
        youtubeId,
        mistakeToAvoid,
        theRightMove,

        // Створюємо інгредієнти
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

        // Створюємо кроки
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
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
