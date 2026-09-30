export const CACHE_TAGS = {
  recipes: 'recipes',
  navCategories: 'navCategories',

  recipe: (slug: string) => `recipe:${slug}`,
} as const;
