import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';
import {
  getSitemapCategories,
  getSitemapRecipes,
} from '@/queries/sitemap.query';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, recipes] = await Promise.all([
    getSitemapCategories(),
    getSitemapRecipes(),
  ]);

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },

    ...categories.map(({ slug, updatedAt }) => ({
      url: `${siteConfig.url}/categories/${slug}`,
      lastModified: updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    ...recipes.map(({ slug, updatedAt }) => ({
      url: `${siteConfig.url}/recipes/${slug}`,
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
