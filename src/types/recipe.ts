export interface Ingredient {
  id: string;
  name: string;
  amountUS: string; // e.g. "1 lb", "1 tbsp"
  amountMetric: string; // e.g. "450 g", "15 ml"
  notes?: string; // e.g. "cut into 3/4-inch cubes"
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tempF?: number;
  tempC?: number;
  durationMinutes?: number;
  isShakePoint?: boolean; // Прапорець для струшування кошика
  tip?: string; // Лаконічна авторська порада
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Breakfast' | 'Dinner' | 'Sides' | 'Snacks';
  subCategories: string[];
  tags: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing?: number;
  featuredImage: string;
  youtubeId: string; // Для ембеду відео вашого каналу
  publishedAt: string;

  // Фірмовий блок каналу "Stop Cooking Wrong"
  mistakeToAvoid: string;
  theRightMove: string;

  ingredients: Ingredient[];
  steps: CookingStep[];
}
