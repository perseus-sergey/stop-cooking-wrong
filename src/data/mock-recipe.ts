// pnpm prisma db seed

import { MocRecipe } from '@/types/recipe';

export const mockRecipes: MocRecipe[] = [
  // --------------------------------------------------------------------------
  // РЕЦЕПТ 1: Середземноморська яєчна запіканка з червоною цибулею,
  // цуккіні та фетою
  // --------------------------------------------------------------------------
  {
    slug: 'mediterranean-egg-bake-red-onion-zucchini-feta',
    title: 'Mediterranean Egg Bake with Red Onion, Zucchini & Feta',
    description:
      'A colorful Mediterranean-style air fryer egg bake with roasted red onion, tender zucchini, creamy feta, juicy cherry tomatoes, fresh dill, oregano, and a bright finish of roasted lemon juice.',
    categorySlugs: ['breakfast', 'vegetarian', 'high-protein', 'air-fryer'],

    tagSlugs: [
      'eggs',
      'feta',
      'zucchini',
      'red-onion',
      'garlic',
      'cheesy',
      'fluffy',
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 32,
    servings: 2,
    caloriesPerServing: 320,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790408251/Feta-Zucchini-Frittata.jpg',
    youtubeId: 'cBIr0Q06ma0',
    publishedAt: '2026-09-26',

    mistakeToAvoid:
      'Adding the raw eggs to vegetables that are still extremely hot. The residual heat can partially scramble the eggs before they are evenly mixed, resulting in an uneven, rubbery texture.',
    theRightMove:
      'Let the roasted vegetables release some steam, then gently fold the warm onion and zucchini into the seasoned egg mixture before baking. Finish with feta, cherry tomatoes, oregano, olive oil, and fresh roasted-lemon juice.',

    ingredients: [
      {
        name: 'Red Onion',
        amountUS: '1 medium',
        amountMetric: '150 g',
        notes: 'cut into thick half-moons, approximately 7 mm thick',
      },
      {
        name: 'Lemon',
        amountUS: '1/2 lemon',
        amountMetric: '1/2 lemon',
        notes: 'cut in half; roasted and squeezed over the finished bake',
      },
      {
        name: 'Large Eggs',
        amountUS: '5 eggs',
        amountMetric: '5 eggs',
      },
      {
        name: 'Heavy Cream',
        amountUS: '1.5 tbsp',
        amountMetric: '22 ml',
      },
      {
        name: 'Fresh Dill',
        amountUS: '1 small bunch',
        amountMetric: '10–15 g',
        notes: 'finely chopped',
      },
      {
        name: 'Zucchini',
        amountUS: '1/2 medium',
        amountMetric: '100 g',
        notes: 'cut into quarter-round slices approximately 5 mm thick',
      },
      {
        name: 'Ground Nutmeg',
        amountUS: '1 pinch',
        amountMetric: '1 pinch',
      },
      {
        name: 'Ground Turmeric',
        amountUS: '1/3 tsp',
        amountMetric: '1/3 tsp',
      },
      {
        name: 'Fresh Garlic',
        amountUS: '1 small clove',
        amountMetric: '1 small clove',
        notes: 'finely grated',
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
        name: 'Feta Cheese',
        amountUS: '2.1 oz',
        amountMetric: '60 g',
        notes: 'cut into approximately 1 cm cubes',
      },
      {
        name: 'Cherry Tomatoes',
        amountUS: '5 tomatoes',
        amountMetric: '50 g',
        notes: 'halved',
      },
      {
        name: 'Dried Oregano',
        amountUS: '1/2 tsp',
        amountMetric: '1/2 tsp',
      },
      {
        name: 'Olive Oil',
        amountUS: 'as needed',
        amountMetric: 'as needed',
        notes: 'for drizzling and greasing the baking dish',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Roast the Red Onion & Zucchini',
        instruction:
          'Place a small air fryer basket on the counter. Arrange the thickly sliced red onion in the right half of the basket and the quarter-round zucchini slices in the left half. Drizzle both sides evenly with a little vegetable or olive oil and season with a pinch of salt.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 15,
        tip: 'Keeping the onion and zucchini separated makes it easier to control their roasting and helps preserve their individual textures.',
      },
      {
        stepNumber: 2,
        title: 'Roast the Lemon Halfway Through',
        instruction:
          'Cut the lemon in half. Halfway through the 15-minute roasting program, open the air fryer and place one lemon half next to the red onion with the cut side facing upward. Return the basket and continue cooking for the remaining 7 minutes.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 7,
        tip: 'Roasting the lemon softens its acidity and gives the final dish a sweeter, more aromatic citrus finish.',
      },
      {
        stepNumber: 3,
        title: 'Prepare the Egg Mixture',
        instruction:
          'Crack 5 eggs into a deep bowl. Add 1.5 tbsp heavy cream, salt, black pepper, 1/3 tsp turmeric, a pinch of ground nutmeg, and 1 finely grated small garlic clove. Finely chop the fresh dill and add it to the bowl. Whisk everything thoroughly until smooth and evenly combined.',
      },
      {
        stepNumber: 4,
        title: 'Combine the Roasted Vegetables with the Eggs',
        instruction:
          'Remove the roasted red onion and zucchini from the air fryer. Set the roasted lemon half aside for serving. Add the hot roasted red onion and zucchini to the egg mixture and gently fold everything together with a spoon.',
        tip: 'Do not leave the vegetables sitting in the hot basket for too long; transfer them to the egg mixture while they are still warm but no longer aggressively steaming.',
      },
      {
        stepNumber: 5,
        title: 'Prepare the Feta & Cherry Tomatoes',
        instruction:
          'Cut 60 g feta cheese into small approximately 1 cm cubes. Cut 50 g cherry tomatoes in half, keeping the cut sides intact for the topping.',
      },
      {
        stepNumber: 6,
        title: 'Bake the Egg Casserole',
        instruction:
          'Take a small paper parchment baking dish suitable for the air fryer and lightly grease the inside with olive oil. Pour in the egg mixture with the roasted onion and zucchini. Place the dish into the air fryer and bake until the eggs are mostly set.',
        tempF: 338,
        tempC: 170,
        durationMinutes: 17,
      },
      {
        stepNumber: 7,
        title: 'Add the Feta & Tomatoes',
        instruction:
          'At the 9-minute mark, open the air fryer. Evenly distribute the feta cubes over the partially baked egg mixture. Arrange the halved cherry tomatoes between the pieces of feta, cut side facing upward. Sprinkle everything with 1/2 tsp dried oregano and drizzle lightly with olive oil.',
        tempF: 338,
        tempC: 170,
        durationMinutes: 8,
        tip: 'Adding the feta and tomatoes partway through baking keeps them visible on the surface while allowing the egg base to set first.',
      },
      {
        stepNumber: 8,
        title: 'Finish with Roasted Lemon',
        instruction:
          'Close the air fryer and finish baking for the remaining 8 minutes. Remove the finished casserole and immediately squeeze the juice from the roasted lemon half directly over the hot egg bake before serving.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // РЕЦЕПТ 2: Соковита глазурована куряча грудка та хрустка картопля
  // під сирними слайсами
  // --------------------------------------------------------------------------
  {
    slug: 'glazed-chicken-breast-crispy-cheesy-baby-potatoes-air-fryer',
    title: 'Juicy Glazed Chicken Breast & Crispy Cheesy Baby Potatoes',
    description:
      'Juicy air fryer chicken breast strips coated in a sweet-spicy soy glaze, served with crispy smashed baby potatoes finished with melted slices of Cheddar, Gouda, or Edam.',
    categorySlugs: ['dinner', 'high-protein', 'quick-easy', 'air-fryer'],

    tagSlugs: [
      'chicken',
      'chicken-breast',
      'baby-potatoes',
      'potatoes',
      'garlic',
      'lime',
      'sesame',
      'crispy',
      'juicy',
      'cheesy',
      'weeknight',
      'family-friendly',
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 42,
    servings: 3,
    caloriesPerServing: 590,
    featuredImage:
      'https://res.cloudinary.com/bttfno8p/image/upload/v1790409115/Chicken-Breast-sticks-Baby-Potatoes.jpg',
    youtubeId: 'oicgddTL9x0',
    publishedAt: '2026-09-26',

    mistakeToAvoid:
      'Glazing the chicken too early or cooking the sweet glaze for too long. The honey and chili sauce can burn before the chicken is fully cooked, leaving a bitter coating.',
    theRightMove:
      'Cook the seasoned chicken almost completely first, then brush it generously with the glaze and finish briefly at high heat so the soy, honey, chili, garlic, ginger, and lime caramelize without burning.',

    ingredients: [
      {
        name: 'Chicken Breast',
        amountUS: '14 oz',
        amountMetric: '400 g',
        notes: 'cut into long strips 2–3 cm thick',
      },
      {
        name: 'Salt',
        amountUS: '1/2 tsp',
        amountMetric: '4 g',
        notes: 'for dry brining the chicken',
      },
      {
        name: 'Ground Black Pepper',
        amountUS: '1/2 tsp',
        amountMetric: '1–2 g',
        notes: 'for chicken',
      },
      {
        name: 'Garlic Powder',
        amountUS: '1/2 tsp',
        amountMetric: '1.5 g',
        notes: 'for chicken',
      },
      {
        name: 'Smoked Paprika',
        amountUS: '1/2 tsp',
        amountMetric: '1 g',
        notes: 'for chicken',
      },
      {
        name: 'Dried Oregano',
        amountUS: '1/3 tsp',
        amountMetric: '0.5 g',
        notes: 'for chicken',
      },
      {
        name: 'Olive Oil',
        amountUS: '1/2 tbsp',
        amountMetric: '7 ml',
        notes: 'for marinating the chicken',
      },
      {
        name: 'Soy Sauce',
        amountUS: '1 tbsp',
        amountMetric: '15 ml',
        notes: 'for the glaze',
      },
      {
        name: 'Honey',
        amountUS: '1/2 tbsp',
        amountMetric: '10 g',
        notes: 'for the glaze',
      },
      {
        name: 'Hot Chili Sauce',
        amountUS: '1 tbsp',
        amountMetric: '15 ml',
        notes: 'such as Sriracha; for the glaze',
      },
      {
        name: 'Fresh Garlic',
        amountUS: '1 small clove',
        amountMetric: '1 small clove',
        notes: 'for the glaze',
      },
      {
        name: 'Ground Dried Ginger',
        amountUS: '1/4 tsp',
        amountMetric: '0.5 g',
        notes: 'for the glaze',
      },
      {
        name: 'Lime Juice',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
        notes: 'juice from approximately 1/2 lime',
      },
      {
        name: 'Small Baby Potatoes',
        amountUS: '6–7 potatoes',
        amountMetric: '300–350 g',
        notes: 'small young potatoes',
      },
      {
        name: 'Olive Oil',
        amountUS: '1 tsp',
        amountMetric: '5 ml',
        notes: 'for first potato bake',
      },
      {
        name: 'Olive Oil or Melted Butter',
        amountUS: '1 tbsp',
        amountMetric: '15 ml',
        notes: 'for the second potato bake',
      },
      {
        name: 'Salt',
        amountUS: 'to taste',
        amountMetric: 'to taste',
        notes: 'for potatoes',
      },
      {
        name: 'Ground Black Pepper',
        amountUS: 'to taste',
        amountMetric: 'to taste',
        notes: 'for potatoes',
      },
      {
        name: 'Smoked Paprika',
        amountUS: 'to taste',
        amountMetric: 'to taste',
        notes: 'for potatoes',
      },
      {
        name: 'Semi-Hard Cheese Slices',
        amountUS: '4–5 slices',
        amountMetric: '100 g',
        notes: 'Cheddar, Gouda, or Edam',
      },
      {
        name: 'Sesame Seeds',
        amountUS: 'as needed',
        amountMetric: 'as needed',
        notes: 'white or a black-and-white mixture, for serving',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'First Bake the Baby Potatoes',
        instruction:
          'Thoroughly wash 6–7 small baby potatoes under running water. Pierce each potato 2–3 times with a fork. Drizzle with 1 tsp olive oil and toss with your hands until evenly coated. Place the potatoes in the air fryer basket.',
        tempF: 356,
        tempC: 180,
        durationMinutes: 20,
        tip: 'The potatoes need to be completely tender before smashing. Test them with a toothpick or thin knife.',
      },
      {
        stepNumber: 2,
        title: 'Smash & Season the Potatoes',
        instruction:
          'Remove the tender potatoes from the basket and place them on parchment. Gently flatten each potato using the flat bottom of a glass or cup. In a small bowl, mix 1 tbsp olive oil or melted butter with salt, black pepper, and smoked paprika. Brush the seasoned oil evenly over every smashed potato.',
      },
      {
        stepNumber: 3,
        title: 'Crisp the Smashed Potatoes',
        instruction:
          'Return the seasoned smashed potatoes to the air fryer and cook until the surfaces become deeply golden and crispy.',
        tempF: 392,
        tempC: 200,
        durationMinutes: 10,
        tip: 'Leave some space between the potatoes so hot air can circulate around their edges.',
      },
      {
        stepNumber: 4,
        title: 'Flip & Add the Cheese',
        instruction:
          'Carefully flip each crispy potato using culinary tongs. Arrange 4–5 slices of semi-hard cheese in a single layer over the potatoes.',
        tempF: 392,
        tempC: 200,
        durationMinutes: 4,
        tip: 'Use Cheddar, Gouda, or Edam depending on the flavor and melting texture you prefer.',
      },
      {
        stepNumber: 5,
        title: 'Prepare the Spicy Soy Glaze',
        instruction:
          'In a small bowl, combine 1 tbsp soy sauce, 1/2 tbsp honey, 1 tbsp hot chili sauce, 1 finely pressed fresh garlic clove, 1/4 tsp ground dried ginger, and 1 tsp lime juice. Whisk or stir thoroughly until smooth and uniform.',
      },
      {
        stepNumber: 6,
        title: 'Prepare the Chicken Breast',
        instruction:
          'Cut 400 g chicken breast into long strips approximately 2–3 cm thick. Pat the chicken completely dry with paper towels. Season evenly with 1/2 tsp salt, 1/2 tsp black pepper, 1/2 tsp garlic powder, 1/2 tsp smoked paprika, and 1/3 tsp dried oregano. Add 1/2 tbsp olive oil and mix thoroughly with your hands until every strip is evenly coated.',
      },
      {
        stepNumber: 7,
        title: 'Air Fry the Chicken',
        instruction:
          'Arrange the seasoned chicken strips in a single layer in the air fryer basket, leaving small gaps between them. Cook until the chicken is nearly fully cooked.',
        tempF: 374,
        tempC: 190,
        durationMinutes: 7,
        tip: 'Chicken should reach a safe internal temperature before serving; cooking time can vary with the thickness of the strips and the air fryer.',
      },
      {
        stepNumber: 8,
        title: 'Glaze & Caramelize the Chicken',
        instruction:
          'Remove the basket with the partially cooked chicken. Generously brush every chicken strip with the prepared soy-honey-chili glaze. Return to the air fryer and cook briefly at high heat until the glaze becomes glossy and caramelized.',
        tempF: 392,
        tempC: 200,
        durationMinutes: 2,
        tip: 'Watch closely during this final stage because the honey can caramelize very quickly.',
      },
      {
        stepNumber: 9,
        title: 'Rest & Serve',
        instruction:
          'Transfer the glazed chicken to a plate and loosely cover with foil for 3–5 minutes. Sprinkle the finished chicken with white sesame seeds or a black-and-white sesame mixture. Serve alongside the crispy baby potatoes covered with melted cheese.',
      },
    ],
  },
];

export const mockRecipe = mockRecipes[0];
