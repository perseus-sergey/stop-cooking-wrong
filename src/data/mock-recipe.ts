// pnpm prisma db seed

import { MocRecipe } from '@/types/recipe';

export const mockRecipes: MocRecipe[] = [
  // --------------------------------------------------------------------------
  // РЕЦЕПТ 1: Ніжна грибна фріттата зі шпинатом та сирною шапочкою
  // --------------------------------------------------------------------------
  {
    slug: 'mushroom-spinach-frittata-cheese-crust-air-fryer',
    title: 'Tender Mushroom & Spinach Frittata with a Cheesy Crust',
    description:
      'A tender air fryer mushroom and spinach frittata made with sautéed mushrooms, onion, fresh spinach, garlic, cream cheese, and melted mozzarella for a rich, creamy, golden cheesy topping.',
    categorySlugs: ['breakfast', 'vegetarian', 'high-protein', 'air-fryer'],

    tagSlugs: [
      'eggs',
      'mushrooms',
      'spinach',
      'cheese',
      'garlic',
      'creamy',
      'fluffy',
      'cheesy',
    ],

    prepTimeMinutes: 15,
    cookTimeMinutes: 32,
    servings: 2,
    caloriesPerServing: 335,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790359075/Mushroom-Spinach-Frittata.jpg',
    youtubeId: 'g5C_CEX31ok',
    publishedAt: '2026-09-27',

    mistakeToAvoid:
      'Adding the hot roasted mushrooms and onion directly to the eggs while they are still aggressively steaming. Excessive heat can begin scrambling the eggs unevenly and create a dense, rubbery texture.',
    theRightMove:
      'Let the roasted mushrooms and onion release some steam, gently wilt the spinach with the residual heat, and then fold the warm vegetables into the seasoned egg mixture. Add the creamy cheese topping only after the egg base has partially set.',

    ingredients: [
      {
        name: 'Mushrooms',
        amountUS: '4 medium mushrooms',
        amountMetric: '4 medium mushrooms',
        notes:
          'button mushrooms or cremini mushrooms; sliced 5–7 mm thick, with 3–4 attractive cap slices reserved for decoration',
      },
      {
        name: 'Yellow Onion',
        amountUS: '1/2 onion',
        amountMetric: 'about 75 g',
        notes: 'cut into thin half-moons',
      },
      {
        name: 'Fresh Baby Spinach',
        amountUS: '1 handful',
        amountMetric: 'about 30 g',
        notes: 'roughly chopped',
      },
      {
        name: 'Fresh Garlic',
        amountUS: '1 small clove',
        amountMetric: '1 small clove',
        notes: 'finely grated',
      },
      {
        name: 'Olive Oil',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
        notes: 'for roasting the mushrooms and onion',
      },
      {
        name: 'Dried Thyme',
        amountUS: '1/3 tsp',
        amountMetric: '1/3 tsp',
      },
      {
        name: 'Salt',
        amountUS: 'to taste',
        amountMetric: 'to taste',
      },
      {
        name: 'Ground Black Pepper',
        amountUS: 'to taste',
        amountMetric: 'to taste',
      },
      {
        name: 'Large Eggs',
        amountUS: '4 eggs',
        amountMetric: '4 eggs',
      },
      {
        name: 'Heavy Cream',
        amountUS: '1–1.5 tbsp',
        amountMetric: '15–22 ml',
      },
      {
        name: 'Ground Nutmeg',
        amountUS: '1 pinch',
        amountMetric: '1 pinch',
      },
      {
        name: 'Olive Oil',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
        notes: 'for greasing the baking dish',
      },
      {
        name: 'Cream Cheese',
        amountUS: '1.4 oz',
        amountMetric: '40 g',
        notes: 'such as Philadelphia; softened to room temperature',
      },
      {
        name: 'Mozzarella',
        amountUS: '1.4 oz',
        amountMetric: '40 g',
        notes: 'grated; Cheddar can also be used',
      },
      {
        name: 'Olive Oil',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
        notes: 'for drizzling over the finished frittata',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the Mushrooms & Onion',
        instruction:
          'Slice 4 medium mushrooms into thick 5–7 mm slices. Reserve 3–4 of the most attractive mushroom cap slices for the final decoration. Cut 1/2 yellow onion into thin half-moons. Place the remaining mushroom slices and onion into a large air fryer basket.',
      },
      {
        stepNumber: 2,
        title: 'Roast the Mushrooms & Onion',
        instruction:
          'Add 1 tsp olive oil, a pinch of salt, and 1/3 tsp dried thyme to the mushrooms and onion. Rub the thyme between your fingers as you sprinkle it over the basket. Toss everything directly in the basket until evenly coated.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 10,
        tip: 'Keep the reserved mushroom slices aside so they can be used as an attractive topping later.',
      },
      {
        stepNumber: 3,
        title: 'Gently Wilt the Spinach',
        instruction:
          'While the mushrooms cook, roughly chop 1 handful of fresh baby spinach. When the roasting cycle is complete, scatter the spinach directly over the hot mushrooms and onion. Shake the basket gently and let it stand for 1–2 minutes so the residual heat and steam soften the spinach. Reserve 4 attractive roasted mushroom slices for the final decoration.',
        durationMinutes: 2,
        tip: 'The spinach only needs to soften slightly. Residual heat is enough to wilt it without making it watery.',
      },
      {
        stepNumber: 4,
        title: 'Prepare the Cheesy Topping',
        instruction:
          'Place 40 g softened cream cheese in a small bowl. Add 40 g grated mozzarella or Cheddar. Mash and mix thoroughly with a fork until a thick, uniform cheese paste forms.',
      },
      {
        stepNumber: 5,
        title: 'Prepare the Egg Mixture',
        instruction:
          'Crack 4 eggs into a deep bowl. Add 1–1.5 tbsp heavy cream, 1/2 tsp salt, a pinch of black pepper, and a pinch of ground nutmeg. Finely grate 1 small garlic clove directly into the bowl. Whisk thoroughly until the mixture is completely smooth and uniform.',
      },
      {
        stepNumber: 6,
        title: 'Combine the Vegetables with the Eggs',
        instruction:
          'Transfer the warm mushrooms, onion, and wilted spinach from the air fryer basket into the beaten egg mixture. Gently fold everything together with a spoon.',
        tip: 'The vegetables should be warm but no longer aggressively steaming before they are mixed with the eggs.',
      },
      {
        stepNumber: 7,
        title: 'Bake the Frittata Base',
        instruction:
          'Place a small parchment baking dish suitable for the air fryer into the basket. Lightly grease the inside with 1 tsp olive oil. Pour in the egg, mushroom, onion, and spinach mixture and place the dish into the air fryer.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 14,
      },
      {
        stepNumber: 8,
        title: 'Add the Cheesy Crust',
        instruction:
          'After the first 14 minutes, open the air fryer. The egg mixture should be partially set. Carefully spread the prepared cream cheese and mozzarella mixture evenly over the entire surface. Arrange the reserved roasted mushroom slices on top and gently press them into the cheese.',
        durationMinutes: 8,
        tip: 'Adding the cheese topping after the egg base has partially set keeps it on the surface and creates a distinct golden cheesy layer.',
      },
      {
        stepNumber: 9,
        title: 'Finish Baking',
        instruction:
          'Close the air fryer and continue baking until the cheese is fully melted, bubbling, and lightly golden and the egg mixture is completely set.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 8,
      },
      {
        stepNumber: 10,
        title: 'Finish with Olive Oil & Rest',
        instruction:
          'Remove the hot frittata from the air fryer and drizzle the surface with 1 tsp olive oil for a glossy finish. Let the frittata rest for 2–3 minutes before slicing and serving.',
        tip: 'Resting allows the hot egg structure to stabilize, making the frittata easier to slice cleanly.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // РЕЦЕПТ 2: Запіканка з рису, овочів, печериць та сиру Гауда в аерогрилі
  // --------------------------------------------------------------------------
  {
    slug: 'rice-vegetable-mushroom-gouda-bake-air-fryer',
    title: 'Rice, Vegetable & Mushroom Bake with Gouda',
    description:
      'A hearty air fryer rice bake packed with mushrooms, carrot, zucchini, bell pepper, eggs, and melted Gouda, finished with Parmesan for a golden cheesy crust.',
    categorySlugs: ['dinner', 'vegetarian', 'high-protein', 'air-fryer'],

    tagSlugs: [
      'rice',
      'mushrooms',
      'zucchini',
      'vegetables',
      'eggs',
      'cheese',
      'cheesy',
      'garlic',
    ],

    prepTimeMinutes: 15,
    cookTimeMinutes: 32,
    servings: 3,
    caloriesPerServing: 450,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790358095/rice-bake.jpg',
    youtubeId: 'ZvNnxkkCVIU',
    publishedAt: '2026-09-27',

    mistakeToAvoid:
      'Mixing the raw eggs into vegetables and mushrooms immediately after roasting while they are still extremely hot. The eggs can begin to set unevenly, resulting in a dense or lumpy texture.',
    theRightMove:
      'Let the roasted vegetables and mushrooms stand for 3–5 minutes before adding the cooked rice, cheese, and eggs. Mix everything thoroughly in the baking dish, then bake until the rice and egg mixture is firm before adding the final Parmesan crust.',

    ingredients: [
      {
        name: 'Cooked Rice',
        amountUS: '10.6 oz',
        amountMetric: '300 g',
        notes:
          'cooked from approximately 110–120 g dry rice; cooled slightly before mixing',
      },
      {
        name: 'Gouda Cheese',
        amountUS: '3.5 oz',
        amountMetric: '100 g',
        notes: 'coarsely grated',
      },
      {
        name: 'Mushrooms',
        amountUS: '3–4 medium mushrooms',
        amountMetric: '3–4 medium mushrooms',
        notes: 'cut into small pieces',
      },
      {
        name: 'Carrot',
        amountUS: '1 medium carrot',
        amountMetric: '1 medium carrot',
        notes: 'cut into small cubes',
      },
      {
        name: 'Zucchini',
        amountUS: '1 small zucchini',
        amountMetric: '1 small zucchini',
        notes: 'cut into medium cubes',
      },
      {
        name: 'Bell Pepper',
        amountUS: '1 small bell pepper',
        amountMetric: '1 small bell pepper',
        notes: 'cut into medium cubes',
      },
      {
        name: 'Large Eggs',
        amountUS: '4 eggs',
        amountMetric: '4 eggs',
      },
      {
        name: 'Parmesan Cheese',
        amountUS: '2 tbsp',
        amountMetric: 'about 15 g',
        notes: 'finely grated; Regato or Cheddar can also be used',
      },
      {
        name: 'Olive Oil',
        amountUS: '1 tbsp',
        amountMetric: '15 ml',
        notes: 'for roasting the vegetables and mushrooms',
      },
      {
        name: 'Salt',
        amountUS: '1/2 tsp',
        amountMetric: 'about 3 g',
      },
      {
        name: 'Ground Black Pepper',
        amountUS: '1/3 tsp',
        amountMetric: 'about 1 g',
      },
      {
        name: 'Dried Garlic',
        amountUS: '1/2 tsp',
        amountMetric: 'about 1.5 g',
      },
      {
        name: 'Fresh Parsley',
        amountUS: '2–3 sprigs',
        amountMetric: '2–3 sprigs',
        notes: 'finely chopped for serving',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the Vegetables & Mushrooms',
        instruction:
          'Cut 1 carrot into small cubes, 1 small zucchini into medium cubes, and 1 small bell pepper into medium cubes. Cut 3–4 medium mushrooms into small pieces. Place a parchment or silicone baking dish directly into the air fryer basket and transfer all the prepared vegetables and mushrooms into the dish.',
      },
      {
        stepNumber: 2,
        title: 'Season & Roast the Vegetables',
        instruction:
          'Add 1 tbsp olive oil, a pinch of salt, and a pinch of black pepper to the vegetables and mushrooms. Mix carefully with a spatula directly in the baking dish until everything is evenly coated.',
        tempF: 374,
        tempC: 190,
        durationMinutes: 15,
        tip: 'The vegetables should become lightly browned while the mushrooms and zucchini release some of their excess moisture.',
      },
      {
        stepNumber: 3,
        title: 'Let the Vegetables Cool Slightly',
        instruction:
          'Remove the baking dish from the air fryer and let the roasted vegetables and mushrooms stand for 3–5 minutes. This allows excess heat and steam to escape before the eggs are added.',
        durationMinutes: 5,
        tip: 'Do not skip this short resting period. Extremely hot vegetables can cause the raw eggs to begin setting immediately during mixing.',
      },
      {
        stepNumber: 4,
        title: 'Add the Rice & Gouda',
        instruction:
          'Grate 100 g Gouda cheese on a coarse grater. Add 300 g cooked rice and the grated Gouda to the warm roasted vegetables and mushrooms in the baking dish.',
      },
      {
        stepNumber: 5,
        title: 'Season the Rice Mixture',
        instruction:
          'Add 1/2 tsp salt, 1/3 tsp black pepper, and 1/2 tsp dried garlic. Crack 4 eggs directly into the baking dish. Carefully mix everything with a spatula until the rice, vegetables, cheese, and eggs are evenly distributed.',
        tip: 'Use gentle movements to avoid scraping or damaging the bottom of the baking dish.',
      },
      {
        stepNumber: 6,
        title: 'Level the Casserole',
        instruction:
          'Spread the rice and vegetable mixture into an even layer across the baking dish. Smooth the surface with the back of a spatula so it cooks uniformly.',
      },
      {
        stepNumber: 7,
        title: 'Bake the Rice Casserole',
        instruction:
          'Place the baking dish back into the air fryer and cook until the egg and rice mixture is fully set and firm in the center.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 14,
        tip: 'The exact cooking time can vary slightly depending on the depth of the baking dish and the air fryer model.',
      },
      {
        stepNumber: 8,
        title: 'Add the Parmesan Crust',
        instruction:
          'Remove the baking dish briefly and sprinkle 2 tbsp finely grated Parmesan evenly over the surface of the set rice casserole.',
      },
      {
        stepNumber: 9,
        title: 'Brown the Cheese',
        instruction:
          'Return the dish to the air fryer and bake until the Parmesan melts and develops a lightly golden crust.',
        tempF: 374,
        tempC: 190,
        durationMinutes: 3,
        tip: 'Watch the final stage closely because grated cheese can brown quickly under the strong air fryer heat.',
      },
      {
        stepNumber: 10,
        title: 'Rest & Garnish',
        instruction:
          'Remove the finished casserole from the air fryer and let it stand for 5 minutes. Finely chop 2–3 sprigs of fresh parsley and sprinkle it over the casserole immediately before serving.',
        durationMinutes: 5,
        tip: 'The short resting period allows the hot rice and egg mixture to stabilize so the casserole cuts more cleanly.',
      },
    ],
  },
];

export const mockRecipe = mockRecipes[0];
