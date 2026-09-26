export interface Ingredient {
  id: string;
  name: string;
  amountUS: string;
  amountMetric: string;
  notes?: string | null;
  order?: number;
}

export interface CookingStep {
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

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subCategories: string[];
  tags: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing?: number | null;
  featuredImage: string;
  youtubeId?: string | null;
  publishedAt: Date | string;
  mistakeToAvoid: string;
  theRightMove: string;
  ingredients?: Ingredient[];
  steps?: CookingStep[];
}

// Повний рецепт з усіма зв'язками (для окремої сторінки /recipes/[slug])
export type FullRecipe = Recipe & {
  ingredients: Ingredient[];
  steps: CookingStep[];
};
