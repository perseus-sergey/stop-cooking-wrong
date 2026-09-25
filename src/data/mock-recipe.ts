import { Recipe } from '@/types/recipe';

export const mockRecipe: Recipe = {
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
  youtubeId: 'dQw4w9WgXcQ', // Тут буде ID вашого реального ролика
  publishedAt: '2026-09-24',

  // Фірмова філософія "Stop Cooking Wrong"
  mistakeToAvoid:
    'Tossing damp potatoes directly into the basket with too much oil. The surface moisture turns into steam, leaving your potatoes soggy instead of crispy.',
  theRightMove:
    'Pat the diced potatoes completely bone-dry with paper towels before seasoning, and finish the last 4 minutes at 400°F (200°C) to lock in the glass-like crust.',

  ingredients: [
    {
      id: 'ing_1',
      name: 'Russet or Yukon Gold Potatoes',
      amountUS: '1 lb',
      amountMetric: '450 g',
      notes: 'washed, skin on, cut into 3/4-inch (2 cm) cubes',
    },
    {
      id: 'ing_2',
      name: 'Olive Oil',
      amountUS: '1 tbsp',
      amountMetric: '15 ml',
      notes: 'or avocado oil',
    },
    {
      id: 'ing_3',
      name: 'Smoked Paprika',
      amountUS: '1/2 tsp',
      amountMetric: '1.5 g',
    },
    {
      id: 'ing_4',
      name: 'Garlic Powder',
      amountUS: '1/2 tsp',
      amountMetric: '1.5 g',
    },
    {
      id: 'ing_5',
      name: 'Kosher Salt',
      amountUS: '1/2 tsp',
      amountMetric: '3 g',
    },
    {
      id: 'ing_6',
      name: 'Freshly Cracked Black Pepper',
      amountUS: '1/4 tsp',
      amountMetric: '0.5 g',
    },
    {
      id: 'ing_7',
      name: 'Fresh Parsley',
      amountUS: '1 tbsp',
      amountMetric: '4 g',
      notes: 'finely chopped, for garnish',
    },
  ],

  steps: [
    {
      stepNumber: 1,
      title: 'Dry & Season',
      instruction:
        'Pat the diced potatoes thoroughly with a paper towel until completely dry. Transfer to a bowl, drizzle with olive oil, and toss with paprika, garlic powder, salt, and black pepper until evenly coated.',
      tip: 'Do not skip drying — dry surface is the #1 secret to extreme crispiness.',
    },
    {
      stepNumber: 2,
      title: 'Stage 1: Core Cooking',
      instruction:
        'Preheat the air fryer to 380°F (195°C) for 2 minutes. Spread the potatoes in an even, single layer inside the basket. Cook undisturbed for 12 minutes.',
      tempF: 380,
      tempC: 195,
      durationMinutes: 12,
    },
    {
      stepNumber: 3,
      title: 'The Basket Shake',
      instruction:
        'Pull out the basket and give it a vigorous shake to flip the cubes and redistribute heat.',
      isShakePoint: true,
      tip: 'If any pieces are sticking together, gently separate them with silicone tongs.',
    },
    {
      stepNumber: 4,
      title: 'Stage 2: The Crisp Finish',
      instruction:
        'Increase temperature to 400°F (200°C) and air fry for an additional 4 minutes until deep golden-brown and crackling.',
      tempF: 400,
      tempC: 200,
      durationMinutes: 4,
    },
    {
      stepNumber: 5,
      title: 'Rest & Serve',
      instruction:
        'Transfer potatoes to a plate, sprinkle with freshly chopped parsley, and let rest for 60 seconds before serving.',
    },
  ],
};
