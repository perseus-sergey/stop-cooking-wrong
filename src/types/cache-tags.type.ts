export const CACHE_TAGS = {
  recipes: 'recipes',
  navCategories: 'navCategories',
  sitemapCategories: 'sitemap-categories',
  sitemapRecipes: 'sitemap-recipes',

  recipe: (slug: string) => `recipe:${slug}`,
  category: (slug: string) => `category:${slug}`,
} as const;
