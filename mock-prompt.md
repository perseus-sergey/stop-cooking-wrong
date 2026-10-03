заповнюю бд свого сайту рецептами. для цього у мене створено файл mock-recipe.ts з якого скрипт завантажує рецепти в бд.
виходять такі типи:

---

import type { Unit } from '@prisma/client';

export interface IMocIngredient {
productSlug: string;
amount?: number | null;
amountMax?: number | null;
unitCode: string;
notes?: string | null;
}

export interface IngredientProduct {
id: string;
name: string;
slug: string;
}

export interface Ingredient {
id: string;
productId: string;
recipeId: string;
amount?: number | null;
amountMax?: number | null;
unitId: string;
unit: Unit;
notes?: string | null;
order: number;
product: IngredientProduct;
}

export interface ICookingStep {
id?: string;
stepNumber: number;
title: string;
instruction: string;
tempF?: number | null;
tempC?: number | null;
durationMinutes?: number | null;
isShakePoint?: boolean;
tip?: string | null;
}

export interface MocRecipe {
slug: string;
title: string;
description: string;
categorySlugs: string[];
tagSlugs: string[];
prepTimeMinutes: number;
cookTimeMinutes: number;
servings: number;
caloriesPerServing?: number | null;
featuredImage: string;
youtubeId?: string | null;
publishedAt: Date | string;
mistakeToAvoid: string;
theRightMove: string;
ingredients?: IMocIngredient[];
steps?: ICookingStep[];
}

export interface Recipe {
id: string;
slug: string;
title: string;
description: string;

prepTimeMinutes: number;
cookTimeMinutes: number;
servings: number;
caloriesPerServing?: number | null;

featuredImage: string;
youtubeId?: string | null;
publishedAt: Date | string;

mistakeToAvoid: string;
theRightMove: string;
}

export interface Category {
id: string;
slug: string;
name: string;
description?: string | null;
image?: string | null;
type: string;
order: number;
isActive: boolean;
}

export interface Tag {
id: string;
slug: string;
name: string;
}

export interface RecipeCategory {
recipeId: string;
categoryId: string;
category: Category;
}

export interface RecipeTag {
recipeId: string;
tagId: string;
tag: Tag;
}

---

файл schema.prisma:
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
}

model Recipe {
id String @id @default(cuid())
slug String @unique
title String
description String

prepTimeMinutes Int
cookTimeMinutes Int
servings Int
caloriesPerServing Int?

featuredImage String
youtubeId String?
publishedAt DateTime @default(now())

mistakeToAvoid String
theRightMove String

categories RecipeCategory[]
tags RecipeTag[]
ingredients Ingredient[]
steps Step[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([publishedAt])
}

model Category {
id String @id @default(cuid())
slug String @unique
name String
type CategoryType

description String?
image String?
order Int @default(0)
isActive Boolean @default(true)

recipes RecipeCategory[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([type])
@@index([isActive])
}

model RecipeCategory {
recipeId String
categoryId String

recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)
category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

@@id([recipeId, categoryId])
@@index([categoryId])
}

model Tag {
id String @id @default(cuid())
slug String @unique
name String

recipes RecipeTag[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model RecipeTag {
recipeId String
tagId String

recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)
tag Tag @relation(fields: [tagId], references: [id], onDelete: Cascade)

@@id([recipeId, tagId])
@@index([tagId])
}

model ShoppingCategory {
id String @id @default(cuid())

name String
slug String @unique

order Int @default(0)
isActive Boolean @default(true)

products Product[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([isActive])
}

model Product {
id String @id @default(cuid())

name String
slug String @unique

shoppingCategoryId String
shoppingCategory ShoppingCategory @relation(fields: [shoppingCategoryId], references: [id], onDelete: Restrict)

ingredients Ingredient[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([shoppingCategoryId])
}

model Ingredient {
id String @id @default(cuid())

productId String
product Product @relation(fields: [productId], references: [id], onDelete: Restrict)

amount Decimal? @db.Decimal(10, 3)
amountMax Decimal? @db.Decimal(10, 3)

unitId String
unit Unit @relation(fields: [unitId], references: [id], onDelete: Restrict)

notes String?
order Int @default(0)

recipeId String
recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

@@index([recipeId])
@@index([productId])
@@index([unitId])
}

model Unit {
id String @id @default(cuid())
code String @unique
name String
symbol String
category UnitCategory

ingredients Ingredient[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

enum UnitCategory {
MASS
VOLUME
COUNT
QUALITATIVE
}

model Step {
id String @id @default(cuid())
stepNumber Int
title String
instruction String

tempF Int?
tempC Int?
durationMinutes Int?

isShakePoint Boolean @default(false)
tip String?

recipeId String
recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

@@unique([recipeId, stepNumber])
@@index([recipeId])
}

enum CategoryType {
MEAL
DIET
STYLE
}

---

додатково у seed.ts:
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
{
code: 'GRAM',
name: 'Gram',
symbol: 'g',
category: 'MASS',
},
{
code: 'KILOGRAM',
name: 'Kilogram',
symbol: 'kg',
category: 'MASS',
},
{
code: 'OUNCE',
name: 'Ounce',
symbol: 'oz',
category: 'MASS',
},
{
code: 'POUND',
name: 'Pound',
symbol: 'lb',
category: 'MASS',
},

{
code: 'MILLILITER',
name: 'Milliliter',
symbol: 'ml',
category: 'VOLUME',
},
{
code: 'LITER',
name: 'Liter',
symbol: 'l',
category: 'VOLUME',
},
{
code: 'TEASPOON',
name: 'Teaspoon',
symbol: 'tsp',
category: 'VOLUME',
},
{
code: 'TABLESPOON',
name: 'Tablespoon',
symbol: 'tbsp',
category: 'VOLUME',
},
{
code: 'CUP',
name: 'Cup',
symbol: 'cup',
category: 'VOLUME',
},
{
code: 'FLUID_OUNCE',
name: 'Fluid ounce',
symbol: 'fl oz',
category: 'VOLUME',
},
{
code: 'PINT',
name: 'Pint',
symbol: 'pint',
category: 'VOLUME',
},
{
code: 'QUART',
name: 'Quart',
symbol: 'quart',
category: 'VOLUME',
},
{
code: 'GALLON',
name: 'Gallon',
symbol: 'gallon',
category: 'VOLUME',
},

{
code: 'PIECE',
name: 'Piece',
symbol: 'pc',
category: 'COUNT',
},
{
code: 'CLOVE',
name: 'Clove',
symbol: 'clove',
category: 'COUNT',
},
{
code: 'BULB',
name: 'Bulb',
symbol: 'bulb',
category: 'COUNT',
},
{
code: 'HEAD',
name: 'Head',
symbol: 'head',
category: 'COUNT',
},
{
code: 'BUNCH',
name: 'Bunch',
symbol: 'bunch',
category: 'COUNT',
},
{
code: 'CAN',
name: 'Can',
symbol: 'can',
category: 'COUNT',
},
{
code: 'PACKAGE',
name: 'Package',
symbol: 'package',
category: 'COUNT',
},
{
code: 'SLICE',
name: 'Slice',
symbol: 'slice',
category: 'COUNT',
},
{
code: 'PINCH',
name: 'Pinch',
symbol: 'pinch',
category: 'COUNT',
},
{
code: 'DASH',
name: 'Dash',
symbol: 'dash',
category: 'COUNT',
},

{
code: 'TO_TASTE',
name: 'To taste',
symbol: '',
category: 'QUALITATIVE',
},
{
code: 'AS_NEEDED',
name: 'As needed',
symbol: '',
category: 'QUALITATIVE',
},
] as const;

---

рецепт для англомовноі аудиторіі. В notes додавай специфіку інгредієнту, якщо це потрібно, наприклад: 'large', 'finely chopped' і т.п.

Зроби обьєкт mockRecipes: MocRecipe для такого рецепту
