// pnpm prisma db seed

import { MocRecipe } from '@/types/recipe.type';

export const mockRecipes: MocRecipe[] = [
  // --------------------------------------------------------------------------
  // РЕЦЕПТ 1: Хрустка картопля-гармошка з пармезаном
  // --------------------------------------------------------------------------
  {
    slug: 'crispy-accordion-potatoes-parmesan-air-fryer',
    title: 'Crispy Accordion Potatoes with Parmesan',
    description:
      'Crispy air fryer accordion potatoes made from golden Russet potatoes, lightly coated with cornstarch and finished with oregano, black pepper, and grated Parmesan.',
    categorySlugs: ['dinner', 'air-fryer'],
    tagSlugs: ['potatoes', 'crispy', 'cheesy', 'family-friendly'],
    prepTimeMinutes: 45,
    cookTimeMinutes: 20,
    servings: 3,
    caloriesPerServing: 300,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790886209/potato-accordion.jpg',
    youtubeId: 'LOFSU3Xc49Y',
    publishedAt: '2026-10-01',

    mistakeToAvoid:
      'Leaving too much moisture or excess cornstarch on the potato slices. Wet potatoes will steam instead of crisping, while a heavy layer of starch can create a powdery coating and prevent an even golden crust.',

    theRightMove:
      'Soak the sliced potato accordions in cold water, dry them extremely well, then dust both sides with a very thin layer of cornstarch. Give them enough space in the air fryer so hot air can circulate around every side.',

    ingredients: [
      {
        name: 'Large Russet Potatoes',
        amountUS: '3 large potatoes',
        amountMetric: '600–700 g',
        notes: 'peeled and trimmed into rectangular blocks',
      },
      {
        name: 'Cornstarch',
        amountUS: '1 1/2–2 tbsp',
        amountMetric: '12–16 g',
        notes: 'for lightly coating the potato accordions',
      },
      {
        name: 'Vegetable Oil',
        amountUS: 'as needed',
        amountMetric: 'as needed',
        notes: 'preferably in a spray bottle, for lightly coating the potatoes',
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
        name: 'Dried Oregano',
        amountUS: '1 tsp',
        amountMetric: '1 tsp',
      },
      {
        name: 'Parmesan Cheese',
        amountUS: '1 1/2–2 tbsp',
        amountMetric: '10–14 g',
        notes: 'finely grated, for finishing',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the Potatoes',
        instruction:
          'Wash and peel 3 large Russet potatoes. Trim the sides of each potato to create an even rectangular block. Cut each block lengthwise into slices approximately 1.2 cm thick.',
        tip: 'Keeping the potato blocks as even as possible helps the accordion slices cook at the same rate.',
      },
      {
        stepNumber: 2,
        title: 'Cut the Accordion Pattern',
        instruction:
          'Place one potato slice between two wooden skewers. Using a sharp knife, make straight perpendicular cuts approximately 3 mm apart across the entire length of the slice, stopping at the skewers so you do not cut all the way through. Turn the slice over and make diagonal cuts at approximately a 45-degree angle. Finally, cut each finished accordion slice lengthwise into 3–4 potato sticks.',
        tip: 'The skewers act as a depth guide and prevent the knife from cutting completely through the potato.',
      },
      {
        stepNumber: 3,
        title: 'Soak the Potato Accordions',
        instruction:
          'Place all of the cut potato accordions into a large bowl. Cover completely with cold water and leave to soak for 30 minutes to remove excess surface starch.',
        durationMinutes: 30,
        tip: 'Removing excess starch helps the potato surfaces become noticeably crispier in the air fryer.',
      },
      {
        stepNumber: 4,
        title: 'Dry Thoroughly',
        instruction:
          'Drain the potatoes and transfer them to a clean kitchen towel or several layers of paper towel. Carefully pat and dry the potato accordions from all sides until there is no visible moisture remaining.',
        tip: 'This is one of the most important steps for achieving a crisp exterior. Do not rush the drying process.',
      },
      {
        stepNumber: 5,
        title: 'Dust with Cornstarch',
        instruction:
          'Arrange the completely dry potato accordions in a single layer on a board or wire rack. Using a fine sieve, lightly dust the top side with 1 1/2–2 tbsp cornstarch. Turn each accordion over and lightly dust the second side. Gently tap each piece to remove excess cornstarch.',
        tip: 'Use only a thin coating. Too much cornstarch can make the finished potatoes taste chalky.',
      },
      {
        stepNumber: 6,
        title: 'First Air Fry',
        instruction:
          'Arrange the potato accordions in a single layer in the air fryer basket, leaving space between them. Lightly spray with vegetable oil.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 12,
        tip: 'Avoid overcrowding the basket. Air circulation around the individual potato pieces is essential for crisp edges.',
      },
      {
        stepNumber: 7,
        title: 'Flip & Crisp',
        instruction:
          'Carefully turn each potato accordion over. Lightly spray the second side with vegetable oil and return the basket to the air fryer.',
        tempF: 392,
        tempC: 200,
        durationMinutes: 8,
        tip: 'The higher temperature in the second stage creates the deeply golden, crisp exterior while the potato is already tender inside.',
      },
      {
        stepNumber: 8,
        title: 'Season with Parmesan & Oregano',
        instruction:
          'Transfer the hot crispy accordion potatoes to a large bowl. Season with salt and freshly ground black pepper. Add 1 tsp dried oregano and 1 1/2–2 tbsp finely grated Parmesan. Gently toss by shaking the bowl until the seasoning and cheese coat the potatoes without breaking their accordion shape.',
        tip: 'Add the Parmesan while the potatoes are still hot so it lightly adheres to the crispy surface.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // РЕЦЕПТ 2: Запечена фрітата з беконом, томатами та двома сирами
  // --------------------------------------------------------------------------
  {
    slug: 'bacon-tomato-two-cheese-frittata-air-fryer',
    title: 'Bacon, Tomato & Two-Cheese Air Fryer Frittata',
    description:
      'Fluffy air fryer frittata loaded with sweet roasted onion, smoky bacon, juicy cherry tomatoes, fresh basil, Cheddar, and Mozzarella, finished with a bubbling golden cheese crust.',
    categorySlugs: ['breakfast', 'high-protein', 'air-fryer'],
    tagSlugs: [
      'eggs',
      'cheese',
      'garlic',
      'fluffy',
      'cheesy',
      'weeknight',
      'family-friendly',
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 32,
    servings: 3,
    caloriesPerServing: 390,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790884036/frittata-bacon-2cheese.jpg',
    youtubeId: 'lJ1W0Vn8KII',
    publishedAt: '2026-10-01',

    mistakeToAvoid:
      'Adding all of the cheese and tomatoes to the frittata before the egg mixture has started to set. The toppings can sink into the eggs and become hidden, while the cheese may overcook before the center is ready.',

    theRightMove:
      'Roast the onion first, add the bacon and half of the cherry tomatoes partway through, then fold the roasted mixture and half of the cheese into the eggs. Add the remaining cheese and tomatoes during the final stage so they stay visible and develop a golden, bubbling crust.',

    ingredients: [
      {
        name: 'Yellow Onion',
        amountUS: '1 medium onion',
        amountMetric: '150 g',
        notes: 'cut into thick half-moons approximately 7 mm thick',
      },
      {
        name: 'Smoked Bacon',
        amountUS: '2–3 slices',
        amountMetric: '50–60 g',
        notes: 'cut into small pieces',
      },
      {
        name: 'Cherry Tomatoes',
        amountUS: '6–7 tomatoes',
        amountMetric: '80–100 g',
        notes: 'halved; divide into two portions',
      },
      {
        name: 'Large Eggs',
        amountUS: '5 eggs',
        amountMetric: '5 eggs',
      },
      {
        name: 'Heavy Cream',
        amountUS: '1 1/2 tbsp',
        amountMetric: '22 ml',
      },
      {
        name: 'Fresh Basil',
        amountUS: '1 small bunch',
        amountMetric: '10–15 g',
        notes: 'finely chopped, plus extra leaves for garnish',
      },
      {
        name: 'Garlic Powder',
        amountUS: '1/3 tsp',
        amountMetric: '1 g',
      },
      {
        name: 'Salt',
        amountUS: 'to taste',
        amountMetric: 'to taste',
        notes: 'use sparingly because the bacon and cheese are already salty',
      },
      {
        name: 'Ground Black Pepper',
        amountUS: 'to taste',
        amountMetric: 'to taste',
      },
      {
        name: 'Cheddar Cheese',
        amountUS: '0.7 oz',
        amountMetric: '20 g',
        notes: 'grated; divide into two portions',
      },
      {
        name: 'Mozzarella Cheese',
        amountUS: '0.7 oz',
        amountMetric: '20 g',
        notes: 'grated; divide into two portions',
      },
      {
        name: 'Vegetable Oil',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
        notes: 'for greasing the baking dish',
      },
      {
        name: 'Vegetable Oil',
        amountUS: 'as needed',
        amountMetric: 'as needed',
        notes: 'for lightly spraying the onion during roasting',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the Egg Mixture',
        instruction:
          'Crack 5 eggs into a deep bowl. Add 1 1/2 tbsp heavy cream, garlic powder, salt, and black pepper. Finely chop a small bunch of fresh basil and add it to the eggs. Whisk until the mixture is smooth and evenly combined.',
        tip: 'Do not over-whisk the eggs into a thick foam. A smooth mixture with a little incorporated air is enough for a light, fluffy frittata.',
      },
      {
        stepNumber: 2,
        title: 'Prepare the Two-Cheese Mixture',
        instruction:
          'Grate 20 g Cheddar and 20 g Mozzarella and combine them in a small bowl. Divide the cheese mixture into two equal portions. Reserve one portion for the final topping and add the other portion to the egg mixture.',
        tip: 'Keeping half of the cheese for the final stage creates a more visible golden cheese crust on top.',
      },
      {
        stepNumber: 3,
        title: 'Roast the Onion',
        instruction:
          'Cut 1 medium yellow onion into thick half-moons approximately 7 mm thick and separate the pieces. Place them in the air fryer basket, lightly spray with vegetable oil, and season with a small pinch of salt.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 15,
        tip: 'Arrange the onion in a relatively even layer so the pieces roast and soften instead of steaming.',
      },
      {
        stepNumber: 4,
        title: 'Add Bacon & Cherry Tomatoes',
        instruction:
          'Cut 2–3 slices of smoked bacon into small pieces. Halve 6–7 cherry tomatoes and divide them into two portions. At the 9-minute mark of the onion roasting time, open the air fryer and add the bacon and half of the halved cherry tomatoes, keeping the tomatoes cut side facing upward. Return the basket and cook for the remaining 6 minutes.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 6,
        tip: 'Adding the bacon partway through prevents it from becoming overly dry while still giving it enough time to crisp around the edges.',
      },
      {
        stepNumber: 5,
        title: 'Combine the Roasted Filling with the Eggs',
        instruction:
          'Remove the roasted onion, bacon, and tomatoes from the air fryer. Let them release steam for a moment, then gently fold them into the prepared egg, basil, cream, and half-cheese mixture.',
        tip: 'Letting the vegetables cool slightly prevents the hot filling from prematurely setting the eggs before they go into the baking dish.',
      },
      {
        stepNumber: 6,
        title: 'Prepare the Baking Dish',
        instruction:
          'Lightly grease a small parchment-lined air fryer baking dish with 1 tsp vegetable oil. Pour the egg mixture with the roasted onion, bacon, tomatoes, and cheese into the dish and spread the filling into an even layer.',
      },
      {
        stepNumber: 7,
        title: 'Bake the Frittata',
        instruction:
          'Place the filled baking dish into the air fryer and cook until the egg mixture is partially set but the center is still slightly soft.',
        tempF: 338,
        tempC: 170,
        durationMinutes: 10,
        tip: 'The center should still have a slight wobble at this stage because it will continue cooking after the remaining cheese and tomatoes are added.',
      },
      {
        stepNumber: 8,
        title: 'Add the Cheese Crust & Tomatoes',
        instruction:
          'Open the air fryer after the first 10 minutes. Evenly sprinkle the reserved Cheddar and Mozzarella mixture over the surface. Arrange the remaining cherry tomato halves cut side facing upward between the cheese.',
        tip: 'Distribute the cheese all the way to the edges for a golden, bubbling crust around the entire frittata.',
      },
      {
        stepNumber: 9,
        title: 'Finish Until Golden',
        instruction:
          'Return the baking dish to the air fryer and cook until the eggs are fully set, the cheese is completely melted, and the surface is golden and bubbling.',
        tempF: 338,
        tempC: 170,
        durationMinutes: 7,
        tip: 'If the cheese starts browning too quickly, loosely cover the top with a small piece of foil for the final minutes.',
      },
      {
        stepNumber: 10,
        title: 'Garnish & Serve',
        instruction:
          'Carefully remove the finished frittata from the air fryer and let it rest for 2–3 minutes. Garnish with fresh basil leaves, slice into portions, and serve warm.',
      },
    ],
  },
];

export const mockRecipe = mockRecipes[0];
