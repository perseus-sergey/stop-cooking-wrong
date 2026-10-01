export interface MocIngredient {
  name: string;
  amountUS: string;
  amountMetric: string;
  notes?: string | null;
  order?: number;
}
export type Ingredient = MocIngredient & {
  id: string;
};

export interface ICookingStep {
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

export interface MocRecipe {
  slug: string;
  title: string;
  description: string;
  categorySlugs: string[];
  tagSlugs: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing?: number | null;
  featuredImage: string;
  youtubeId?: string | null;
  publishedAt: Date | string;
  mistakeToAvoid: string;
  theRightMove: string;
  ingredients?: MocIngredient[];
  steps?: ICookingStep[];
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;

  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing?: number | null;

  featuredImage: string;
  youtubeId?: string | null;
  publishedAt: Date | string;

  mistakeToAvoid: string;
  theRightMove: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  image?: string | null;
  type: string;
  order: number;
  isActive: boolean;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

export interface RecipeCategory {
  recipeId: string;
  categoryId: string;
  category: Category;
}

export interface RecipeTag {
  recipeId: string;
  tagId: string;
  tag: Tag;
}

export type RecipeCardData = Recipe & {
  categories: RecipeCategory[];
};

// Повний рецепт з усіма зв'язками (для окремої сторінки /recipes/[slug])
export type TFullRecipe = Recipe & {
  ingredients: Ingredient[];
  steps: ICookingStep[];
  categories: RecipeCategory[];
  tags: RecipeTag[];
};

export type TUnitSystem = 'us' | 'metric';
