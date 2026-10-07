// pnpm prisma db seed

import { MocRecipe } from '@/types/recipe.type';

export const mockRecipes: MocRecipe[] = [
  // --------------------------------------------------------------------------
  // РЕЦЕПТ 1
  // --------------------------------------------------------------------------
  {
    slug: 'air-fryer-rice-vegetable-gouda-casserole',
    title: 'Air Fryer Rice, Vegetable & Gouda Casserole',
    description:
      'A comforting air fryer rice casserole packed with colorful vegetables, mushrooms, eggs, and melty Gouda cheese, finished with a golden Parmesan crust and fresh parsley.',
    categorySlugs: ['dinner', 'vegetarian', 'air-fryer', 'baking'],
    tagSlugs: ['cheesy', 'tender', 'one-pan', 'family-friendly'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    servings: 4,
    caloriesPerServing: null,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790358095/rice-bake.jpg',
    youtubeId: 'ZvNnxkkCVIU',
    publishedAt: '2026-10-07',
    mistakeToAvoid:
      'Do not mix the eggs into the vegetables immediately after roasting. Let the hot vegetables cool for 3–5 minutes first, or the eggs may begin to cook before the casserole goes back into the air fryer.',
    theRightMove:
      'Let the casserole rest for 5 minutes after baking. This allows the egg mixture to finish setting and makes the casserole much easier to slice cleanly.',
    ingredients: [
      {
        productSlug: 'cooked-rice',
        amount: 300,
        unitCode: 'GRAM',
        notes: 'cooked',
      },
      {
        productSlug: 'gouda-cheese',
        amount: 100,
        unitCode: 'GRAM',
        notes: 'coarsely grated',
      },
      {
        productSlug: 'mushroom',
        amount: 4,
        unitCode: 'PIECE',
        notes: 'medium, chopped',
      },
      {
        productSlug: 'carrot',
        amount: 1,
        unitCode: 'PIECE',
        notes: 'small, finely diced',
      },
      {
        productSlug: 'zucchini',
        amount: 1,
        unitCode: 'PIECE',
        notes: 'small, diced',
      },
      {
        productSlug: 'bell-pepper',
        amount: 1,
        unitCode: 'PIECE',
        notes: 'small, diced',
      },
      {
        productSlug: 'egg',
        amount: 4,
        unitCode: 'PIECE',
      },
      {
        productSlug: 'parmesan-cheese',
        amount: 2,
        unitCode: 'TABLESPOON',
        notes: 'grated',
      },
      {
        productSlug: 'olive-oil',
        amount: 1,
        unitCode: 'TABLESPOON',
        notes: 'for roasting',
      },
      {
        productSlug: 'salt',
        amount: 0.5,
        unitCode: 'TEASPOON',
      },
      {
        productSlug: 'black-pepper',
        amount: 0.333,
        unitCode: 'TEASPOON',
        notes: 'ground',
      },
      {
        productSlug: 'garlic-powder',
        amount: 0.5,
        unitCode: 'TEASPOON',
      },
      {
        productSlug: 'fresh-parsley',
        amount: 3,
        amountMax: 4,
        unitCode: 'PIECE',
        notes: 'sprigs, finely chopped',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the vegetables',
        instruction:
          'Dice the carrot, zucchini, and bell pepper. Chop the mushrooms into small pieces. Place a parchment or silicone baking dish directly in the air fryer basket and add all the vegetables and mushrooms.',
        isShakePoint: false,
      },
      {
        stepNumber: 2,
        title: 'Season and roast',
        instruction:
          'Drizzle the vegetables with olive oil and add a pinch of the salt and black pepper. Toss carefully with a spatula to coat everything evenly.',
        isShakePoint: false,
      },
      {
        stepNumber: 3,
        title: 'Roast the vegetables',
        instruction:
          'Air fry the vegetables and mushrooms until lightly browned and the excess moisture from the mushrooms and zucchini has cooked off.',
        tempC: 190,
        durationMinutes: 15,
        isShakePoint: true,
        tip: 'Keep the vegetables in a single even layer when possible so excess moisture can evaporate.',
      },
      {
        stepNumber: 4,
        title: 'Let the vegetables cool slightly',
        instruction:
          'Remove the basket and let the vegetables stand in the dish for 3–5 minutes. This short resting period prevents the raw eggs from starting to cook when they are added.',
        durationMinutes: 5,
        isShakePoint: false,
      },
      {
        stepNumber: 5,
        title: 'Mix the casserole',
        instruction:
          'Add the cooked rice and grated Gouda to the warm vegetables. Add the remaining salt, black pepper, and garlic powder. Crack in the eggs and gently mix everything together until evenly combined. Smooth the mixture into an even layer.',
        isShakePoint: false,
      },
      {
        stepNumber: 6,
        title: 'Bake the casserole',
        instruction:
          'Air fry until the egg and rice mixture is fully set in the center and feels firm when gently pressed.',
        tempC: 180,
        durationMinutes: 14,
        isShakePoint: false,
        tip: 'Start checking around 12 minutes, as air fryer cooking times can vary between models.',
      },
      {
        stepNumber: 7,
        title: 'Add the Parmesan crust',
        instruction:
          'Sprinkle the grated Parmesan evenly over the surface. Return the dish to the air fryer and cook until the cheese is melted and golden.',
        tempC: 190,
        durationMinutes: 3,
        isShakePoint: false,
      },
      {
        stepNumber: 8,
        title: 'Rest and serve',
        instruction:
          'Remove the casserole from the air fryer and let it rest for 5 minutes. Finely chop the fresh parsley and sprinkle it over the top just before serving.',
        durationMinutes: 5,
        isShakePoint: false,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // РЕЦЕПТ 2
  // --------------------------------------------------------------------------
  {
    slug: 'mushroom-spinach-frittata',
    title: 'Tender Mushroom Spinach Frittata with a Cheesy Topping',
    description:
      'A tender and creamy mushroom spinach frittata made in the air fryer, finished with a rich cream cheese and mozzarella topping and golden baked mushroom slices.',
    categorySlugs: [
      'breakfast',
      'vegetarian',
      'air-fryer',
      'baking',
      'quick-easy',
    ],
    tagSlugs: ['creamy', 'fluffy', 'cheesy', 'tender'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    servings: 2,
    caloriesPerServing: 430,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790359075/Mushroom-Spinach-Frittata.jpg',
    youtubeId: 'g5C_CEX31ok',
    publishedAt: new Date('2026-10-07'),

    mistakeToAvoid:
      'Do not overcook the eggs before adding the cheese topping. The frittata should still be slightly soft and set in the center when the topping is added so it stays tender instead of becoming dry.',

    theRightMove:
      'Let the hot mushrooms, onions, and spinach sit for a minute or two before mixing them with the eggs. This gently wilts the spinach while keeping enough moisture and heat to create a tender, flavorful frittata.',

    ingredients: [
      {
        productSlug: 'mushroom',
        amount: 4,
        unitCode: 'PIECE',
        notes: 'medium, thickly sliced',
      },
      {
        productSlug: 'onion',
        amount: 0.5,
        unitCode: 'PIECE',
        notes: 'thinly sliced',
      },
      {
        productSlug: 'baby-spinach',
        amount: 1,
        unitCode: 'HANDFUL',
        notes: 'roughly chopped',
      },
      {
        productSlug: 'fresh-garlic',
        amount: 1,
        unitCode: 'CLOVE',
        notes: 'finely grated',
      },
      {
        productSlug: 'olive-oil',
        amount: 1,
        unitCode: 'TEASPOON',
        notes: 'for the mushrooms and onion',
      },
      {
        productSlug: 'dried-thyme',
        amount: 0.333,
        unitCode: 'TEASPOON',
        notes: '',
      },
      {
        productSlug: 'salt',
        unitCode: 'TO_TASTE',
      },
      {
        productSlug: 'black-pepper',
        unitCode: 'TO_TASTE',
        notes: 'ground',
      },
      {
        productSlug: 'egg',
        amount: 4,
        unitCode: 'PIECE',
      },
      {
        productSlug: 'heavy-cream',
        amount: 1.5,
        unitCode: 'TABLESPOON',
      },
      {
        productSlug: 'ground-nutmeg',
        unitCode: 'PINCH',
      },
      {
        productSlug: 'olive-oil',
        amount: 1,
        unitCode: 'TEASPOON',
        notes: 'for greasing the baking dish',
      },
      {
        productSlug: 'cream-cheese',
        amount: 40,
        unitCode: 'GRAM',
        notes: 'room temperature',
      },
      {
        productSlug: 'mozzarella-cheese',
        amount: 40,
        unitCode: 'GRAM',
        notes: 'grated',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the mushrooms and onion',
        instruction:
          'Slice the mushrooms into 5–7 mm thick slices, setting aside 3–4 attractive mushroom slices for the final topping. Thinly slice the onion. Place the remaining mushrooms and onion in the air fryer basket.',
      },
      {
        stepNumber: 2,
        title: 'Season and air fry',
        instruction:
          'Add the olive oil, a pinch of salt, and the dried thyme to the mushrooms and onion. Rub the thyme between your fingers as you sprinkle it over the basket, then toss everything together until evenly coated.',
        tempC: 180,
        durationMinutes: 10,
        isShakePoint: true,
      },
      {
        stepNumber: 3,
        title: 'Wilt the spinach',
        instruction:
          'Roughly chop the baby spinach. Add it directly over the hot mushrooms and onion, shake the basket, and let it stand in the residual heat for 1–2 minutes to gently wilt the spinach.',
        durationMinutes: 2,
        isShakePoint: true,
      },
      {
        stepNumber: 4,
        title: 'Reserve the mushrooms',
        instruction:
          'Remove 4 attractive cooked mushroom slices and set them aside for the final topping.',
      },
      {
        stepNumber: 5,
        title: 'Make the cheesy topping',
        instruction:
          'Add the room-temperature cream cheese and grated mozzarella to a small bowl. Mash and mix with a fork until a thick, smooth paste forms.',
      },
      {
        stepNumber: 6,
        title: 'Prepare the egg mixture',
        instruction:
          'Whisk the eggs, heavy cream, salt, black pepper, and ground nutmeg in a deep bowl. Grate the garlic directly into the bowl and whisk until completely smooth.',
      },
      {
        stepNumber: 7,
        title: 'Combine the filling',
        instruction:
          'Add the warm mushrooms, onion, and wilted spinach to the beaten eggs. Gently stir until everything is evenly distributed.',
      },
      {
        stepNumber: 8,
        title: 'Start the frittata',
        instruction:
          'Place a parchment baking dish or liner in the air fryer basket and lightly grease it with olive oil. Pour in the egg and vegetable mixture and place the dish in the air fryer.',
        tempC: 180,
        durationMinutes: 14,
      },
      {
        stepNumber: 9,
        title: 'Add the cheese topping',
        instruction:
          'Open the air fryer when about 8 minutes of cooking time remain. Carefully spread the cream cheese and mozzarella mixture evenly over the partially set frittata. Arrange the reserved mushroom slices on top and gently press them into the cheese.',
      },
      {
        stepNumber: 10,
        title: 'Finish baking',
        instruction:
          'Close the air fryer and continue cooking until the cheese is fully melted and golden with small bubbles and the frittata is set.',
        tempC: 180,
        durationMinutes: 8,
      },
      {
        stepNumber: 11,
        title: 'Rest before serving',
        instruction:
          'Remove the hot frittata from the air fryer and let it rest for 2–3 minutes before slicing and serving.',
        durationMinutes: 3,
      },
    ],
  },
];

export const mockRecipe = mockRecipes[0];
