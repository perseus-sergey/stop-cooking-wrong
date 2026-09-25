import { Recipe } from '@/types/recipe';

export const mockRecipes: Recipe[] = [
  {
    id: 'rec_01',
    slug: 'ultra-crispy-air-fryer-breakfast-potatoes',
    title: 'Ultra-Crispy Air Fryer Breakfast Potatoes',
    description:
      'Diner-style crispy diced potatoes with tender fluffy centers. Made with simple pantry spices and cooked in two precise stages for maximum crunch.',
    category: 'Breakfast',
    subCategories: ['Side Dishes', 'Quick & Easy'],
    tags: [
      'air fryer potatoes',
      'breakfast ideas',
      'crispy',
      'asmr food',
      'simple recipes',
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 16,
    servings: 2,
    caloriesPerServing: 210,
    featuredImage:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    publishedAt: '2026-09-24',
    mistakeToAvoid:
      'Tossing damp potatoes directly into the basket with too much oil. The surface moisture turns into steam, leaving your potatoes soggy instead of crispy.',
    theRightMove:
      'Pat the diced potatoes completely bone-dry with paper towels before seasoning, and finish the last 4 minutes at 400°F (200°C) to lock in the glass-like crust.',
    ingredients: [
      {
        id: '1',
        name: 'Russet Potatoes',
        amountUS: '1 lb',
        amountMetric: '450 g',
        notes: 'diced into cubes',
      },
      { id: '2', name: 'Olive Oil', amountUS: '1 tbsp', amountMetric: '15 ml' },
      {
        id: '3',
        name: 'Smoked Paprika',
        amountUS: '1/2 tsp',
        amountMetric: '1.5 g',
      },
      {
        id: '4',
        name: 'Garlic Powder',
        amountUS: '1/2 tsp',
        amountMetric: '1.5 g',
      },
      {
        id: '5',
        name: 'Kosher Salt',
        amountUS: '1/2 tsp',
        amountMetric: '3 g',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Dry & Season',
        instruction: 'Pat potatoes dry and toss with oil and spices.',
      },
      {
        stepNumber: 2,
        title: 'Initial Cook',
        instruction: 'Cook at 380°F (195°C) for 12 mins.',
        tempF: 380,
        tempC: 195,
        durationMinutes: 12,
      },
      {
        stepNumber: 3,
        title: 'The Shake',
        instruction: 'Shake basket vigorously.',
        isShakePoint: true,
      },
      {
        stepNumber: 4,
        title: 'Crisp Finish',
        instruction: 'Cook at 400°F (200°C) for 4 mins.',
        tempF: 400,
        tempC: 200,
        durationMinutes: 4,
      },
    ],
  },
  {
    id: 'rec_02',
    slug: 'jammy-air-fryer-boiled-eggs',
    title: 'Foolproof Jammy Air Fryer "Boiled" Eggs',
    description:
      'No boiling water required! Get silky egg whites and rich, jammy yolks using just your air fryer and an ice bath shock.',
    category: 'Breakfast',
    subCategories: ['Healthy & Low Carb', 'Meal Prep'],
    tags: [
      'air fryer eggs',
      'breakfast',
      'healthy food recipes',
      'quick recipes',
    ],
    prepTimeMinutes: 1,
    cookTimeMinutes: 11,
    servings: 2,
    caloriesPerServing: 140,
    featuredImage:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    publishedAt: '2026-09-20',
    mistakeToAvoid:
      'Letting the eggs sit in the hot basket after the timer rings — carryover heat will overcook your jammy yolk into a chalky dry mess.',
    theRightMove:
      'Transfer eggs immediately into an ice-water bath for 3 minutes to stop the cooking process and make them effortless to peel.',
    ingredients: [
      {
        id: '1',
        name: 'Large Cold Eggs',
        amountUS: '4 eggs',
        amountMetric: '4 eggs',
        notes: 'straight from fridge',
      },
      {
        id: '2',
        name: 'Ice Water Bath',
        amountUS: '1 bowl',
        amountMetric: '1 bowl',
        notes: 'for shocking',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Air Fry',
        instruction:
          'Place eggs directly in basket. Air fry at 270°F (132°C) for 11 minutes.',
        tempF: 270,
        tempC: 132,
        durationMinutes: 11,
      },
      {
        stepNumber: 2,
        title: 'Ice Shock',
        instruction:
          'Immediately transfer eggs into ice water for 3 minutes before peeling.',
      },
    ],
  },
  {
    id: 'rec_03',
    slug: 'crispy-garlic-parmesan-chicken-bites',
    title: 'Air Fryer Garlic Parmesan Chicken Bites',
    description:
      'Juicy, bite-sized chicken breast pieces coated in savory spices, air-fried until golden, and tossed in rich garlic parmesan butter.',
    category: 'Dinner',
    subCategories: ['High-Protein', 'Quick Dinners'],
    tags: [
      'air fryer dinner',
      'easy dinner recipes',
      'high-protein',
      'simple cooking',
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    servings: 3,
    caloriesPerServing: 320,
    featuredImage:
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    publishedAt: '2026-09-18',
    mistakeToAvoid:
      'Cutting chicken pieces into uneven sizes, causing small pieces to dry out while larger pieces remain undercooked.',
    theRightMove:
      'Cut chicken into uniform 1-inch cubes and toss in melted garlic butter immediately after taking them out of the hot air fryer.',
    ingredients: [
      {
        id: '1',
        name: 'Boneless Skinless Chicken Breast',
        amountUS: '1 lb',
        amountMetric: '450 g',
        notes: 'cut into 1-inch cubes',
      },
      {
        id: '2',
        name: 'Grated Parmesan Cheese',
        amountUS: '1/3 cup',
        amountMetric: '35 g',
      },
      {
        id: '3',
        name: 'Melted Butter',
        amountUS: '2 tbsp',
        amountMetric: '30 g',
      },
      {
        id: '4',
        name: 'Garlic Powder',
        amountUS: '1 tsp',
        amountMetric: '3 g',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Season',
        instruction:
          'Toss chicken cubes with olive oil, salt, garlic powder, and paprika.',
      },
      {
        stepNumber: 2,
        title: 'Air Fry',
        instruction:
          'Air fry at 390°F (200°C) for 10 minutes, shaking halfway.',
        tempF: 390,
        tempC: 200,
        durationMinutes: 10,
        isShakePoint: true,
      },
      {
        stepNumber: 3,
        title: 'Butter Toss',
        instruction: 'Toss hot bites in melted butter and grated parmesan.',
      },
    ],
  },
];

export const mockRecipe = mockRecipes[0];
