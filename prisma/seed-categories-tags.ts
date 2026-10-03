import { config } from 'dotenv';

config({ path: '.env.local' });

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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

const shoppingCategories = [
  {
    slug: 'produce',
    name: 'Produce',
    order: 1,
  },
  {
    slug: 'meat-seafood',
    name: 'Meat & Seafood',
    order: 2,
  },
  {
    slug: 'dairy-eggs',
    name: 'Dairy & Eggs',
    order: 3,
  },
  {
    slug: 'pantry',
    name: 'Pantry',
    order: 4,
  },
  {
    slug: 'spices-seasonings',
    name: 'Spices & Seasonings',
    order: 5,
  },
  {
    slug: 'baking',
    name: 'Baking',
    order: 6,
  },
  {
    slug: 'frozen',
    name: 'Frozen',
    order: 7,
  },
  {
    slug: 'other',
    name: 'Other',
    order: 8,
  },
];

const products = [
  // Produce
  {
    slug: 'potato',
    name: 'Potato',
    shoppingCategorySlug: 'produce',
  },
  {
    slug: 'onion',
    name: 'Onion',
    shoppingCategorySlug: 'produce',
  },
  {
    slug: 'cherry-tomato',
    name: 'Cherry Tomato',
    shoppingCategorySlug: 'produce',
  },
  {
    slug: 'basil',
    name: 'Basil',
    shoppingCategorySlug: 'produce',
  },

  // Meat & Seafood
  {
    slug: 'bacon',
    name: 'Bacon',
    shoppingCategorySlug: 'meat-seafood',
  },

  // Dairy & Eggs
  {
    slug: 'egg',
    name: 'Egg',
    shoppingCategorySlug: 'dairy-eggs',
  },
  {
    slug: 'heavy-cream',
    name: 'Heavy Cream',
    shoppingCategorySlug: 'dairy-eggs',
  },
  {
    slug: 'parmesan-cheese',
    name: 'Parmesan Cheese',
    shoppingCategorySlug: 'dairy-eggs',
  },
  {
    slug: 'cheddar-cheese',
    name: 'Cheddar Cheese',
    shoppingCategorySlug: 'dairy-eggs',
  },
  {
    slug: 'mozzarella-cheese',
    name: 'Mozzarella Cheese',
    shoppingCategorySlug: 'dairy-eggs',
  },

  // Pantry
  {
    slug: 'vegetable-oil',
    name: 'Vegetable Oil',
    shoppingCategorySlug: 'pantry',
  },

  // Spices & Seasonings
  {
    slug: 'salt',
    name: 'Salt',
    shoppingCategorySlug: 'spices-seasonings',
  },
  {
    slug: 'black-pepper',
    name: 'Black Pepper',
    shoppingCategorySlug: 'spices-seasonings',
  },
  {
    slug: 'dried-oregano',
    name: 'Dried Oregano',
    shoppingCategorySlug: 'spices-seasonings',
  },
  {
    slug: 'garlic-powder',
    name: 'Garlic Powder',
    shoppingCategorySlug: 'spices-seasonings',
  },

  // Baking
  {
    slug: 'cornstarch',
    name: 'Cornstarch',
    shoppingCategorySlug: 'baking',
  },
];

const units = [
  // MASS — METRIC
  {
    code: 'GRAM',
    name: 'Gram',
    symbol: 'g',
    system: 'METRIC',
    category: 'MASS',
    baseUnitCode: 'GRAM',
    conversionFactor: 1,
  },
  {
    code: 'KILOGRAM',
    name: 'Kilogram',
    symbol: 'kg',
    system: 'METRIC',
    category: 'MASS',
    baseUnitCode: 'GRAM',
    conversionFactor: 1000,
  },

  // MASS — US
  {
    code: 'OUNCE',
    name: 'Ounce',
    symbol: 'oz',
    system: 'US',
    category: 'MASS',
    baseUnitCode: 'GRAM',
    conversionFactor: 28.349523125,
  },
  {
    code: 'POUND',
    name: 'Pound',
    symbol: 'lb',
    system: 'US',
    category: 'MASS',
    baseUnitCode: 'GRAM',
    conversionFactor: 453.59237,
  },

  // VOLUME — METRIC
  {
    code: 'MILLILITER',
    name: 'Milliliter',
    symbol: 'ml',
    system: 'METRIC',
    category: 'VOLUME',
    baseUnitCode: 'MILLILITER',
    conversionFactor: 1,
  },
  {
    code: 'LITER',
    name: 'Liter',
    symbol: 'l',
    system: 'METRIC',
    category: 'VOLUME',
    baseUnitCode: 'MILLILITER',
    conversionFactor: 1000,
  },

  // VOLUME — US
  {
    code: 'FLUID_OUNCE',
    name: 'Fluid ounce',
    symbol: 'fl oz',
    system: 'US',
    category: 'VOLUME',
    baseUnitCode: 'MILLILITER',
    conversionFactor: 29.5735295625,
  },
  {
    code: 'PINT',
    name: 'Pint',
    symbol: 'pint',
    system: 'US',
    category: 'VOLUME',
    baseUnitCode: 'MILLILITER',
    conversionFactor: 473.176473,
  },
  {
    code: 'QUART',
    name: 'Quart',
    symbol: 'quart',
    system: 'US',
    category: 'VOLUME',
    baseUnitCode: 'MILLILITER',
    conversionFactor: 946.352946,
  },
  {
    code: 'GALLON',
    name: 'Gallon',
    symbol: 'gallon',
    system: 'US',
    category: 'VOLUME',
    baseUnitCode: 'MILLILITER',
    conversionFactor: 3785.411784,
  },

  // COOKING — UNIVERSAL
  {
    code: 'TEASPOON',
    name: 'Teaspoon',
    symbol: 'tsp',
    system: 'UNIVERSAL',
    category: 'COOKING',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'TABLESPOON',
    name: 'Tablespoon',
    symbol: 'tbsp',
    system: 'UNIVERSAL',
    category: 'COOKING',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'CUP',
    name: 'Cup',
    symbol: 'cup',
    system: 'UNIVERSAL',
    category: 'COOKING',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'PINCH',
    name: 'Pinch',
    symbol: 'pinch',
    system: 'UNIVERSAL',
    category: 'COOKING',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'DASH',
    name: 'Dash',
    symbol: 'dash',
    system: 'UNIVERSAL',
    category: 'COOKING',
    baseUnitCode: null,
    conversionFactor: null,
  },

  // COUNT — UNIVERSAL
  {
    code: 'PIECE',
    name: 'Piece',
    symbol: 'pc',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'CLOVE',
    name: 'Clove',
    symbol: 'clove',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'BULB',
    name: 'Bulb',
    symbol: 'bulb',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'HEAD',
    name: 'Head',
    symbol: 'head',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'BUNCH',
    name: 'Bunch',
    symbol: 'bunch',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'CAN',
    name: 'Can',
    symbol: 'can',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'PACKAGE',
    name: 'Package',
    symbol: 'package',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'SLICE',
    name: 'Slice',
    symbol: 'slice',
    system: 'UNIVERSAL',
    category: 'COUNT',
    baseUnitCode: null,
    conversionFactor: null,
  },

  // QUALITATIVE — UNIVERSAL
  {
    code: 'TO_TASTE',
    name: 'To taste',
    symbol: '',
    system: 'UNIVERSAL',
    category: 'QUALITATIVE',
    baseUnitCode: null,
    conversionFactor: null,
  },
  {
    code: 'AS_NEEDED',
    name: 'As needed',
    symbol: '',
    system: 'UNIVERSAL',
    category: 'QUALITATIVE',
    baseUnitCode: null,
    conversionFactor: null,
  },
] as const;

async function main() {
  console.log(
    '🌱 Seeding categories, tags, shopping categories and products...'
  );

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

  for (const shoppingCategory of shoppingCategories) {
    await prisma.shoppingCategory.upsert({
      where: {
        slug: shoppingCategory.slug,
      },
      update: {
        name: shoppingCategory.name,
        order: shoppingCategory.order,
        isActive: true,
      },
      create: shoppingCategory,
    });
  }

  for (const unit of units) {
    await prisma.unit.upsert({
      where: {
        code: unit.code,
      },
      update: {
        name: unit.name,
        symbol: unit.symbol,
        system: unit.system,
        category: unit.category,
        conversionFactor: unit.conversionFactor,
      },
      create: {
        code: unit.code,
        name: unit.name,
        symbol: unit.symbol,
        system: unit.system,
        category: unit.category,
        conversionFactor: unit.conversionFactor,
      },
    });
  }

  const unitIds = new Map(
    (
      await prisma.unit.findMany({
        select: {
          id: true,
          code: true,
        },
      })
    ).map((unit) => [unit.code, unit.id])
  );

  for (const unit of units) {
    await prisma.unit.update({
      where: {
        code: unit.code,
      },
      data: {
        baseUnitId: unit.baseUnitCode
          ? (unitIds.get(unit.baseUnitCode) ?? null)
          : null,
      },
    });
  }

  const shoppingCategoryRecords = await prisma.shoppingCategory.findMany({
    where: {
      slug: {
        in: shoppingCategories.map((category) => category.slug),
      },
    },
    select: {
      id: true,
      slug: true,
    },
  });

  const shoppingCategoryIdBySlug = new Map(
    shoppingCategoryRecords.map((category) => [category.slug, category.id])
  );

  for (const product of products) {
    const shoppingCategoryId = shoppingCategoryIdBySlug.get(
      product.shoppingCategorySlug
    );

    if (!shoppingCategoryId) {
      throw new Error(
        `Missing shopping category: ${product.shoppingCategorySlug}`
      );
    }

    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: {
        name: product.name,
        shoppingCategoryId,
      },
      create: {
        slug: product.slug,
        name: product.name,
        shoppingCategoryId,
      },
    });
  }

  console.log(
    '🎉 Categories, tags, shopping categories and products seeded successfully!'
  );
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
