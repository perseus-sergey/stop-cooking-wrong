import 'dotenv/config';
import { prisma } from '@/lib/prisma';

const categories = [
  // MEAL
  {
    slug: 'breakfast',
    name: 'Breakfast',
    type: 'MEAL' as const,
    description:
      'Quick, crispy, and protein-packed breakfast recipes made simple with your air fryer.',
    order: 1,
  },
  {
    slug: 'lunch',
    name: 'Lunch',
    type: 'MEAL' as const,
    description:
      'Quick and satisfying lunch recipes made easy with minimal prep and cleanup.',
    order: 2,
  },
  {
    slug: 'dinner',
    name: 'Dinner',
    type: 'MEAL' as const,
    description:
      'Easy weeknight dinner recipes with tender textures, crispy finishes, and minimal cleanup.',
    order: 3,
  },
  {
    slug: 'desserts',
    name: 'Desserts',
    type: 'MEAL' as const,
    description:
      'Easy sweet treats, crispy bakes, and comforting desserts made simple in the air fryer.',
    order: 4,
  },

  // DIET
  {
    slug: 'vegetarian',
    name: 'Vegetarian',
    type: 'DIET' as const,
    description:
      'Flavorful vegetarian recipes packed with vegetables, satisfying textures, and simple ingredients.',
    order: 1,
  },
  {
    slug: 'high-protein',
    name: 'High Protein',
    type: 'DIET' as const,
    description:
      'Protein-rich recipes designed to make everyday meals more filling and satisfying.',
    order: 2,
  },

  // STYLE
  {
    slug: 'quick-easy',
    name: 'Quick & Easy',
    type: 'STYLE' as const,
    description:
      'Simple recipes with minimal preparation, straightforward cooking, and less time in the kitchen.',
    order: 1,
  },
  {
    slug: 'budget-friendly',
    name: 'Budget Friendly',
    type: 'STYLE' as const,
    description:
      'Affordable recipes made with simple, accessible ingredients without sacrificing flavor.',
    order: 2,
  },
  {
    slug: 'air-fryer',
    name: 'Air Fryer',
    type: 'STYLE' as const,
    description:
      'Crispy, golden, and flavorful recipes made with the convenience of an air fryer.',
    order: 3,
  },
  {
    slug: 'baking',
    name: 'Baking',
    type: 'STYLE' as const,
    description:
      'Comforting baked recipes with golden finishes, delicious textures, and reliable results.',
    order: 4,
  },
  {
    slug: 'festive',
    name: 'Festive',
    type: 'STYLE' as const,
    description:
      'Special recipes for celebrations, holidays, gatherings, and memorable occasions.',
    order: 5,
  },
  {
    slug: 'authentic',
    name: 'Authentic',
    type: 'STYLE' as const,
    description:
      'Recipes inspired by traditional cooking methods, ingredients, and authentic flavors.',
    order: 6,
  },
];

const tags = [
  // Ingredients
  { slug: 'eggs', name: 'Eggs' },
  { slug: 'feta', name: 'Feta' },
  { slug: 'zucchini', name: 'Zucchini' },
  { slug: 'red-onion', name: 'Red Onion' },

  { slug: 'chicken', name: 'Chicken' },
  { slug: 'chicken-breast', name: 'Chicken Breast' },
  { slug: 'baby-potatoes', name: 'Baby Potatoes' },
  { slug: 'potatoes', name: 'Potatoes' },

  { slug: 'mushrooms', name: 'Mushrooms' },
  { slug: 'spinach', name: 'Spinach' },

  { slug: 'rice', name: 'Rice' },
  { slug: 'vegetables', name: 'Vegetables' },

  { slug: 'cheese', name: 'Cheese' },
  { slug: 'garlic', name: 'Garlic' },
  { slug: 'lime', name: 'Lime' },
  { slug: 'sesame', name: 'Sesame' },

  // Texture & result
  { slug: 'crispy', name: 'Crispy' },
  { slug: 'crunchy', name: 'Crunchy' },
  { slug: 'juicy', name: 'Juicy' },
  { slug: 'tender', name: 'Tender' },
  { slug: 'creamy', name: 'Creamy' },
  { slug: 'fluffy', name: 'Fluffy' },
  { slug: 'cheesy', name: 'Cheesy' },

  // Recipe characteristics
  { slug: 'one-pan', name: 'One Pan' },
  { slug: 'meal-prep', name: 'Meal Prep' },
  { slug: 'make-ahead', name: 'Make Ahead' },
  { slug: 'weeknight', name: 'Weeknight' },
  { slug: 'family-friendly', name: 'Family Friendly' },
  { slug: 'kid-friendly', name: 'Kid Friendly' },
];

async function main() {
  console.log('🌱 Seeding categories and tags...');

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
        type: category.type,
        description: category.description,
        order: category.order,
        isActive: true,
      },
      create: category,
    });
  }

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: {
        slug: tag.slug,
      },
      update: {
        name: tag.name,
      },
      create: tag,
    });
  }

  console.log('🎉 Categories and tags seeded successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
