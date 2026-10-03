// pnpm prisma db seed

import { MocRecipe } from '@/types/recipe.type';

export const mockRecipes: MocRecipe[] = [
  // --------------------------------------------------------------------------
  // РЕЦЕПТ 1
  // --------------------------------------------------------------------------
  {
    slug: 'air-fryer-bacon-cheddar-mozzarella-frittata',
    title: 'Air Fryer Bacon, Cheddar & Mozzarella Frittata',
    description:
      'A fluffy and savory air fryer frittata made with crispy bacon, roasted onions, cherry tomatoes, fresh basil, Cheddar, and mozzarella. Easy to prepare and finished with a golden, bubbly cheese crust.',
    categorySlugs: ['breakfast', 'high-protein', 'air-fryer', 'quick-easy'],
    tagSlugs: ['cheesy', 'juicy', 'weeknight', 'family-friendly'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 32,
    servings: 4,
    caloriesPerServing: null,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790884036/frittata-bacon-2cheese.jpg',
    youtubeId: 'lJ1W0Vn8KII',
    publishedAt: '2026-10-02',
    mistakeToAvoid:
      'Do not add all of the cheese before baking. Reserve half for the final stage so it melts on top and creates a golden, bubbly crust.',
    theRightMove:
      'Roast the onion first, then add the bacon and half of the cherry tomatoes halfway through cooking. This builds a flavorful base while keeping the tomatoes from becoming overly soft.',
    ingredients: [
      {
        productSlug: 'onion',
        amount: 1,
        unitCode: 'PIECE',
        notes: 'medium yellow, cut into 7 mm thick half-moons',
      },
      {
        productSlug: 'bacon',
        amount: 2,
        amountMax: 3,
        unitCode: 'SLICE',
        notes: 'smoked, cut into small pieces',
      },
      {
        productSlug: 'cherry-tomato',
        amount: 6,
        amountMax: 7,
        unitCode: 'PIECE',
        notes: 'halved',
      },
      { productSlug: 'egg', amount: 5, unitCode: 'PIECE' },
      {
        productSlug: 'heavy-cream',
        amount: 1.5,
        unitCode: 'TABLESPOON',
      },
      {
        productSlug: 'basil',
        amount: 1,
        unitCode: 'BUNCH',
        notes: 'small, finely chopped, plus extra leaves for garnish',
      },
      {
        productSlug: 'garlic-powder',
        amount: 1 / 3,
        unitCode: 'TEASPOON',
      },
      { productSlug: 'salt', unitCode: 'TO_TASTE' },
      {
        productSlug: 'black-pepper',
        unitCode: 'TO_TASTE',
        notes: 'ground',
      },
      {
        productSlug: 'cheddar-cheese',
        amount: 20,
        unitCode: 'GRAM',
        notes: 'grated',
      },
      {
        productSlug: 'mozzarella-cheese',
        amount: 20,
        unitCode: 'GRAM',
        notes: 'grated',
      },
      {
        productSlug: 'vegetable-oil',
        amount: 1,
        unitCode: 'TEASPOON',
        notes: 'for greasing the baking dish',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the egg mixture',
        instruction:
          'Crack the eggs into a large bowl. Add the heavy cream, garlic powder, salt, and black pepper. Whisk lightly until combined.',
      },
      {
        stepNumber: 2,
        title: 'Add the basil and cheese',
        instruction:
          'Finely chop the fresh basil and add it to the egg mixture. Combine the grated Cheddar and mozzarella in a separate bowl, then stir half of the cheese mixture into the eggs.',
      },
      {
        stepNumber: 3,
        title: 'Prepare the onion',
        instruction:
          'Cut the yellow onion into thick half-moons about 7 mm thick and separate the pieces. Place them in the air fryer basket, drizzle with vegetable oil, and season with a pinch of salt.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 15,
        isShakePoint: true,
        tip: 'Add the bacon and half of the cherry tomatoes after 9 minutes of cooking.',
      },
      {
        stepNumber: 4,
        title: 'Add the bacon and tomatoes',
        instruction:
          'After 9 minutes, open the air fryer. Add the chopped bacon and half of the halved cherry tomatoes, cut side up. Return the basket to the air fryer and cook for the remaining 6 minutes.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 6,
        isShakePoint: false,
      },
      {
        stepNumber: 5,
        title: 'Combine the filling',
        instruction:
          'Remove the roasted onion, bacon, and tomatoes from the air fryer. Add them to the egg and cheese mixture and gently stir until evenly combined.',
      },
      {
        stepNumber: 6,
        title: 'Fill the baking dish',
        instruction:
          'Lightly grease a parchment baking dish with 1 teaspoon of vegetable oil. Pour in the egg mixture and spread the ingredients evenly.',
      },
      {
        stepNumber: 7,
        title: 'Bake the frittata',
        instruction:
          'Place the baking dish in the air fryer and cook until the eggs are mostly set.',
        tempF: 338,
        tempC: 170,
        durationMinutes: 17,
        isShakePoint: true,
        tip: 'After 10 minutes, top the frittata with the remaining cheese and the remaining cherry tomatoes.',
      },
      {
        stepNumber: 8,
        title: 'Finish with the cheese crust',
        instruction:
          'After 10 minutes of cooking, open the air fryer. Sprinkle the remaining Cheddar and mozzarella evenly over the top and arrange the remaining cherry tomatoes cut side up. Return the dish to the air fryer and cook for the final 7 minutes, until the cheese is fully melted, golden, and bubbly.',
        tempF: 338,
        tempC: 170,
        durationMinutes: 7,
      },
      {
        stepNumber: 9,
        title: 'Garnish and serve',
        instruction:
          'Remove the frittata from the air fryer and garnish with fresh basil leaves. Let it rest briefly before slicing and serving.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // РЕЦЕПТ 2
  // --------------------------------------------------------------------------
  {
    slug: 'crispy-air-fryer-accordion-potatoes',
    title: 'Crispy Air Fryer Accordion Potatoes',
    description:
      'These crispy air fryer accordion potatoes are thin, golden, and crunchy on the outside while tender inside. Soaked to remove excess starch, lightly coated with cornstarch, and finished with Parmesan and oregano, they make an impressive side dish with simple ingredients.',

    categorySlugs: ['dinner', 'vegetarian', 'air-fryer', 'quick-easy'],
    tagSlugs: ['crispy', 'crunchy', 'family-friendly'],

    prepTimeMinutes: 45,
    cookTimeMinutes: 20,
    servings: 4,
    caloriesPerServing: 210,

    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790886209/potato-accordion.jpg',

    youtubeId: 'LOFSU3Xc49Y',

    publishedAt: '2026-10-02',

    mistakeToAvoid:
      'Do not skip the soaking and drying steps. Excess starch and moisture can prevent the accordion potatoes from becoming properly crisp in the air fryer.',

    theRightMove:
      'Dry the potato pieces thoroughly before coating them with cornstarch, then arrange them in a single layer with space between each piece so hot air can circulate evenly.',

    ingredients: [
      {
        productSlug: 'potato',
        amount: 600,
        amountMax: 700,
        unitCode: 'GRAM',
        notes: 'large, preferably Russet',
      },
      {
        productSlug: 'cornstarch',
        amount: 1.5,
        amountMax: 2,
        unitCode: 'TABLESPOON',
        notes: 'for coating',
      },
      {
        productSlug: 'vegetable-oil',
        amount: null,
        unitCode: 'AS_NEEDED',
        notes: 'in spray bottle',
      },
      {
        productSlug: 'salt',
        amount: null,
        unitCode: 'TO_TASTE',
      },
      {
        productSlug: 'black-pepper',
        amount: null,
        unitCode: 'TO_TASTE',
        notes: 'ground',
      },
      {
        productSlug: 'dried-oregano',
        amount: 1,
        unitCode: 'TEASPOON',
      },
      {
        productSlug: 'parmesan-cheese',
        amount: 1.5,
        amountMax: 2,
        unitCode: 'TABLESPOON',
        notes: 'finely grated',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the potatoes',
        instruction:
          'Wash and peel the potatoes. Trim the sides to create even rectangular blocks. Cut each block into slices about 1/2 inch (1.2 cm) thick.',
      },
      {
        stepNumber: 2,
        title: 'Create the accordion pattern',
        instruction:
          'Place one potato slice between two wooden skewers. Make straight perpendicular cuts along the entire length of the slice, spacing them about 1/8 inch (3 mm) apart. The skewers will prevent the knife from cutting all the way through.',
        tip: 'Keep the skewers close against the potato slice to create evenly spaced cuts without slicing through the potato.',
      },
      {
        stepNumber: 3,
        title: 'Make the diagonal cuts',
        instruction:
          'Turn the potato slice over and make diagonal cuts at a 45-degree angle to the skewers along the entire length. Then cut the slice lengthwise into 3–4 accordion-shaped sticks. Repeat with the remaining potato slices.',
      },
      {
        stepNumber: 4,
        title: 'Soak the potatoes',
        instruction:
          'Place the potato accordion sticks in a large bowl and cover them with cold water. Let them soak for 30 minutes to remove excess starch.',
        durationMinutes: 30,
      },
      {
        stepNumber: 5,
        title: 'Dry thoroughly',
        instruction:
          'Drain the potatoes and spread them over a clean kitchen towel or paper towels. Pat and dry them thoroughly on all sides. The potato pieces should be completely dry before coating.',
        tip: 'Thorough drying is essential for a crisp exterior.',
      },
      {
        stepNumber: 6,
        title: 'Coat with cornstarch',
        instruction:
          'Arrange the dry potato accordion sticks in a single layer on a board or rack. Dust them lightly with cornstarch through a fine sieve, turn them over, and dust the other side. Gently tap each piece to remove excess cornstarch.',
      },
      {
        stepNumber: 7,
        title: 'Air fry until tender',
        instruction:
          'Arrange the potato accordion sticks in the air fryer basket in a single layer, leaving space between them. Lightly spray with vegetable oil. Air fry at 180°C (356°F) for 12 minutes, until the potatoes are cooked through.',
        tempC: 180,
        tempF: 356,
        durationMinutes: 12,
      },
      {
        stepNumber: 8,
        title: 'Crisp the potatoes',
        instruction:
          'Carefully turn the accordion potatoes over and lightly spray them with vegetable oil again. Increase the temperature to 200°C (392°F) and air fry for 8 minutes, or until golden brown and crispy.',
        tempC: 200,
        tempF: 392,
        durationMinutes: 8,
        isShakePoint: true,
      },
      {
        stepNumber: 9,
        title: 'Season and serve',
        instruction:
          'Transfer the crispy potatoes to a bowl. Season with salt and ground black pepper to taste, then add the dried oregano and grated Parmesan. Gently toss by shaking the bowl until evenly coated.',
      },
    ],
  },
];

export const mockRecipe = mockRecipes[0];
