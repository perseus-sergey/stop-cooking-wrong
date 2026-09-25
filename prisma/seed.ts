import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { mockRecipes } from '../src/data/mock-recipe';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Очищаємо старі дані (якщо є)
  await prisma.step.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();

  for (const recipe of mockRecipes) {
    await prisma.recipe.create({
      data: {
        slug: recipe.slug,
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        subCategories: recipe.subCategories,
        tags: recipe.tags,
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
        servings: recipe.servings,
        caloriesPerServing: recipe.caloriesPerServing,
        featuredImage: recipe.featuredImage,
        youtubeId: recipe.youtubeId,
        mistakeToAvoid: recipe.mistakeToAvoid,
        theRightMove: recipe.theRightMove,

        // Створюємо інгредієнти
        ingredients: {
          create: recipe.ingredients.map((ing, index) => ({
            name: ing.name,
            amountUS: ing.amountUS,
            amountMetric: ing.amountMetric,
            notes: ing.notes,
            order: index,
          })),
        },

        // Створюємо кроки
        steps: {
          create: recipe.steps.map((step) => ({
            stepNumber: step.stepNumber,
            title: step.title,
            instruction: step.instruction,
            tempF: step.tempF,
            tempC: step.tempC,
            durationMinutes: step.durationMinutes,
            isShakePoint: step.isShakePoint ?? false,
            tip: step.tip,
          })),
        },
      },
    });
  }

  console.log(`✅ Successfully seeded ${mockRecipes.length} recipes!`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
