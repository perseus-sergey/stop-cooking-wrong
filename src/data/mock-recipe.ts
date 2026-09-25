import { Recipe } from '@/types/recipe';

export const mockRecipes: Recipe[] = [
  // --------------------------------------------------------------------------
  // РЕЦЕПТ 1: Запіканка з рису, овочів та сиру Гауда
  // --------------------------------------------------------------------------
  {
    id: 'rec_rice_bake_01',
    slug: 'cheesy-air-fryer-rice-veggie-bake',
    title: 'Cheesy Air Fryer Rice & Veggie Bake',
    description:
      'The ultimate one-pan air fryer casserole using cooked rice, tender roasted veggies, and melted Gouda cheese with a golden, bubbly Parmesan crust.',
    category: 'Dinner',
    subCategories: ['Quick & Easy', 'Vegetarian', 'Budget Friendly'],
    tags: [
      'air fryer dinner',
      'easy dinner recipes',
      'simple recipes',
      'vegetable recipes',
      'air fryer recipes healthy',
      'asmr food',
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 32,
    servings: 3,
    caloriesPerServing: 340,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790358095/rice-bake.jpg',
    youtubeId: 'ZvNnxkkCVIU',
    publishedAt: '2026-09-24',

    mistakeToAvoid:
      'Pouring raw eggs immediately into sizzling hot vegetables straight out of the air fryer — the residual heat scrambles the eggs before you can mix them evenly with the rice.',
    theRightMove:
      'Let the roasted vegetables rest for 3 to 5 minutes to cool down slightly before cracking in the eggs, then finish with a 3-minute high-heat Parmesan broil for a crunchy diner-style crust.',

    ingredients: [
      {
        id: 'rb_1',
        name: 'Cooked White Rice',
        amountUS: '2 cups',
        amountMetric: '300 g',
        notes: 'from approx. 1/2 cup (110–120 g) dry rice',
      },
      {
        id: 'rb_2',
        name: 'Gouda Cheese',
        amountUS: '1 cup',
        amountMetric: '100 g',
        notes: 'coarsely shredded',
      },
      {
        id: 'rb_3',
        name: 'White Button or Cremini Mushrooms',
        amountUS: '3–4 medium',
        amountMetric: '85 g',
        notes: 'sliced',
      },
      {
        id: 'rb_4',
        name: 'Carrot',
        amountUS: '1 small',
        amountMetric: '50 g',
        notes: 'finely diced',
      },
      {
        id: 'rb_5',
        name: 'Zucchini',
        amountUS: '1 small',
        amountMetric: '130 g',
        notes: 'diced into 1/2-inch cubes',
      },
      {
        id: 'rb_6',
        name: 'Bell Pepper',
        amountUS: '1 small',
        amountMetric: '75 g',
        notes: 'diced into cubes',
      },
      {
        id: 'rb_7',
        name: 'Large Eggs',
        amountUS: '4 eggs',
        amountMetric: '4 eggs',
      },
      {
        id: 'rb_8',
        name: 'Grated Parmesan Cheese',
        amountUS: '2 tbsp',
        amountMetric: '15 g',
        notes: 'or sharp Cheddar',
      },
      {
        id: 'rb_9',
        name: 'Olive Oil',
        amountUS: '1 tbsp',
        amountMetric: '15 ml',
      },
      {
        id: 'rb_10',
        name: 'Kosher Salt',
        amountUS: '1/2 tsp',
        amountMetric: '3 g',
      },
      {
        id: 'rb_11',
        name: 'Freshly Ground Black Pepper',
        amountUS: '1/3 tsp',
        amountMetric: '1 g',
      },
      {
        id: 'rb_12',
        name: 'Garlic Powder',
        amountUS: '1/2 tsp',
        amountMetric: '1.5 g',
      },
      {
        id: 'rb_13',
        name: 'Fresh Parsley',
        amountUS: '2–3 sprigs',
        amountMetric: '4 g',
        notes: 'finely chopped, for garnish',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Roast the Vegetables & Mushrooms',
        instruction:
          'Place a silicone or parchment liner directly into your air fryer basket. Add the finely diced carrot, zucchini, bell pepper, and sliced mushrooms. Drizzle with 1 tbsp olive oil, a pinch of salt, and black pepper. Toss gently with a spatula.',
        tempF: 375,
        tempC: 190,
        durationMinutes: 15,
        tip: 'Roasting first releases excess water from mushrooms and zucchini so your casserole stays firm, not soggy.',
      },
      {
        stepNumber: 2,
        title: 'The Cool-Down Move',
        instruction:
          'Pull out the basket and let the roasted veggies sit undisturbed for 3 to 5 minutes so the steam calms down.',
        tip: 'Never add raw eggs to scorching hot veggies or they will scramble prematurely.',
      },
      {
        stepNumber: 3,
        title: 'Mix Rice, Cheese & Eggs in the Pan',
        instruction:
          'Directly into the warm liner, add 2 cups cooked rice, shredded Gouda, 1/2 tsp salt, 1/3 tsp black pepper, and 1/2 tsp garlic powder. Crack in 4 whole eggs. Using a soft spatula, gently fold everything together until completely uniform, then level the surface.',
      },
      {
        stepNumber: 4,
        title: 'Bake the Casserole',
        instruction:
          'Slide the basket back into the air fryer and bake until the egg-rice mixture is fully set, firm, and bouncy to the touch.',
        tempF: 355,
        tempC: 180,
        durationMinutes: 13,
      },
      {
        stepNumber: 5,
        title: 'The Golden Parmesan Finish',
        instruction:
          'Evenly sprinkle 2 tbsp grated Parmesan cheese over the top. Air fry for a final blast until the cheese is melted and deep golden-brown.',
        tempF: 375,
        tempC: 190,
        durationMinutes: 3,
      },
      {
        stepNumber: 6,
        title: 'Rest & Garnish',
        instruction:
          'Let the casserole rest in the pan for 5 minutes to stabilize for clean slicing. Sprinkle with freshly chopped parsley and serve.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // РЕЦЕПТ 2: Грибна фріттата зі шпинатом та сирною шапочкою
  // --------------------------------------------------------------------------
  {
    id: 'rec_frittata_02',
    slug: 'fluffy-air-fryer-mushroom-spinach-frittata',
    title: 'Fluffy Air Fryer Mushroom & Spinach Frittata',
    description:
      'Velvety, café-style Italian frittata packed with thyme-roasted mushrooms and wilted baby spinach, topped with a rich cream cheese and mozzarella crust.',
    category: 'Breakfast',
    subCategories: ['Healthy & Low Carb', 'Quick Recipes', 'High-Protein'],
    tags: [
      'air fryer eggs',
      'healthy breakfast ideas',
      'breakfast',
      'air fryer recipes healthy',
      'simple cooking',
      'asmr food',
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 32,
    servings: 2,
    caloriesPerServing: 280,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790359075/Mushroom-Spinach-Frittata.jpg',
    youtubeId: 'g5C_CEX31ok',
    publishedAt: '2026-09-22',

    mistakeToAvoid:
      'Pouring raw, wet mushrooms and spinach directly into beaten eggs. As they bake, they release moisture, creating a watery, rubbery frittata.',
    theRightMove:
      'Pre-roast mushrooms with thyme, wilt the spinach using residual heat, and crown with a cream cheese-mozzarella blend during the last 8 minutes for a bakery-grade melted crust.',

    ingredients: [
      {
        id: 'fr_1',
        name: 'Cremini (Baby Bella) or White Button Mushrooms',
        amountUS: '4 medium',
        amountMetric: '115 g',
        notes: 'thickly sliced (1/4-inch / 6 mm); reserve 3–4 slices for top',
      },
      {
        id: 'fr_2',
        name: 'Yellow Onion',
        amountUS: '1/2 medium',
        amountMetric: '60 g',
        notes: 'sliced into half-moons',
      },
      {
        id: 'fr_3',
        name: 'Fresh Baby Spinach',
        amountUS: '1 generous handful',
        amountMetric: '30 g',
        notes: 'roughly chopped',
      },
      {
        id: 'fr_4',
        name: 'Fresh Garlic',
        amountUS: '1 clove',
        amountMetric: '1 clove',
        notes: 'finely grated',
      },
      {
        id: 'fr_5',
        name: 'Olive Oil (for mushrooms)',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
      },
      {
        id: 'fr_6',
        name: 'Dried Thyme',
        amountUS: '1/3 tsp',
        amountMetric: '0.5 g',
        notes: 'crushed between fingers',
      },
      {
        id: 'fr_7',
        name: 'Large Eggs',
        amountUS: '4 eggs',
        amountMetric: '4 eggs',
      },
      {
        id: 'fr_8',
        name: 'Heavy Cream',
        amountUS: '1.5 tbsp',
        amountMetric: '22 ml',
      },
      {
        id: 'fr_9',
        name: 'Ground Nutmeg',
        amountUS: '1 pinch',
        amountMetric: '1 pinch',
      },
      {
        id: 'fr_10',
        name: 'Cream Cheese (Philadelphia style)',
        amountUS: '3 tbsp / 1.5 oz',
        amountMetric: '40 g',
        notes: 'room temperature',
      },
      {
        id: 'fr_11',
        name: 'Shredded Mozzarella',
        amountUS: '1/3 cup',
        amountMetric: '40 g',
        notes: 'or Cheddar',
      },
      {
        id: 'fr_12',
        name: 'Extra Virgin Olive Oil (for sheen)',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
      },
      {
        id: 'fr_13',
        name: 'Kosher Salt & Black Pepper',
        amountUS: 'to taste',
        amountMetric: 'to taste',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Roast Mushrooms & Onions',
        instruction:
          'Cut mushrooms into thick 1/4-inch (6 mm) slices. Place in the air fryer basket with sliced onion, 1 tsp oil, a pinch of salt, and dried thyme crushed between your fingers. Toss well directly in the basket.',
        tempF: 355,
        tempC: 180,
        durationMinutes: 10,
      },
      {
        stepNumber: 2,
        title: 'Residual Steam Spinach Wilt',
        instruction:
          'Open the basket immediately after cooking. Drop the roughly chopped baby spinach directly over the sizzling mushrooms. Give it a gentle shake and let sit for 1–2 minutes; residual heat will wilt the greens without overcooking them. Pick out 4 beautiful mushroom slices and set aside on a plate for garnish.',
      },
      {
        stepNumber: 3,
        title: 'Mix the Cheesy Crown Paste',
        instruction:
          'In a small bowl, combine 40 g (1.5 oz) softened cream cheese and 40 g shredded mozzarella. Mash thoroughly with a fork into a smooth, thick spread.',
      },
      {
        stepNumber: 4,
        title: 'Whisk the Custardy Egg Base',
        instruction:
          'In a bowl, whisk 4 eggs with 1.5 tbsp heavy cream, 1/2 tsp salt, freshly cracked black pepper, a pinch of nutmeg, and 1 grated garlic clove until smooth and frothy. Gently fold the warm roasted mushroom, onion, and spinach mixture into the eggs.',
      },
      {
        stepNumber: 5,
        title: 'First Bake',
        instruction:
          'Lightly brush a small silicone or parchment liner with 1 tsp oil. Pour in the egg mixture. Bake in the air fryer until the eggs are about 80% set on top.',
        tempF: 355,
        tempC: 180,
        durationMinutes: 14,
      },
      {
        stepNumber: 6,
        title: 'Apply the Cheesy Crown',
        instruction:
          'Open the air fryer. Spoon the prepared cheese paste evenly across the surface of the frittata. Gently press the 4 reserved mushroom slices into the cheese layer. Continue air frying for the remaining 8 minutes until bubbling and golden.',
        tempF: 355,
        tempC: 180,
        durationMinutes: 8,
      },
      {
        stepNumber: 7,
        title: 'Restaurant Sheen & Rest',
        instruction:
          'Remove from the air fryer and lightly drizzle with 1 tsp extra virgin olive oil for a glossy, professional finish. Let rest for 2–3 minutes before slicing.',
      },
    ],
  },
];

export const mockRecipe = mockRecipes[0];
