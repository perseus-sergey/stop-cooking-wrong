export const CACHE_TAGS = {
  recipes: 'recipes',
  navCategories: 'navCategories',

  recipe: (slug: string) => `recipe:${slug}`,
  category: (slug: string) => `category:${slug}`,
} as const;
