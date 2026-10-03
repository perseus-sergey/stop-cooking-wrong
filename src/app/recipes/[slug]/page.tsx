import type { Metadata } from 'next';
import Image from 'next/image';
import RecipeInteractiveView from '@/components/recipe/RecipeInteractiveView';
import { Badge } from '@/components/ui/badge';
import { siteConfig, ROUTES } from '@/config/site.config';
import { toIsoDuration } from '@/lib/utils';
import PrintModal from '@/components/recipe/PrintModal';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { getRecipe, getUnits } from '@/queries/recipes.query';
import {
  formatIngredient,
  // formatIngredientAmount,
  formatIngredientForJsonLd,
  toFormatterIngredient,
  // formatIngredientText,
} from '@/lib/formatIngredient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await prisma.recipe.findMany({
    select: { slug: true },
  });
  return recipes.map((r) => ({ slug: r.slug }));
}

//---
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const recipe = await getRecipe(slug);

  if (!recipe) {
    return {};
  }
  const { title, description, tags, featuredImage, publishedAt } = recipe;
  const { name, url } = siteConfig;

  const pageUrl = `${url}${ROUTES.recipe(slug)}`;
  const tagNames = tags.map((item) => item.tag.name);

  return {
    title,
    description,
    keywords: tagNames.join(', '),

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: name,
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 675,
          alt: title,
        },
      ],
      type: 'article',
      publishedTime: new Date(publishedAt).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage],
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const [recipe, units] = await Promise.all([getRecipe(slug), getUnits()]);

  // console.log('RECIPE:', recipe);
  // console.log('INGREDIENTS:', recipe?.ingredients);

  if (!recipe) notFound();

  const {
    title,
    youtubeId,
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    caloriesPerServing,
    steps,
    ingredients,
    description,
    tags,
    featuredImage,
    publishedAt,
    theRightMove,
    categories,
  } = recipe;

  const categoryNames = categories.map((item) => item.category.name);
  const tagNames = tags.map((item) => item.tag.name);

  const kk = recipe.ingredients.map((ingredient) =>
    formatIngredientForJsonLd(ingredient, units)
  );
  console.log('KK', kk);
  console.log();
  const recipeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    image: [featuredImage],
    description: description,
    keywords: tagNames.join(', '),
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.links.youtube,
    },
    datePublished: publishedAt,
    prepTime: toIsoDuration(prepTimeMinutes),
    cookTime: toIsoDuration(cookTimeMinutes),
    totalTime: toIsoDuration(prepTimeMinutes + cookTimeMinutes),
    recipeCategory: categoryNames,
    recipeYield: `${servings} servings`,
    nutrition: caloriesPerServing
      ? {
          '@type': 'NutritionInformation',
          calories: `${caloriesPerServing} calories`,
        }
      : undefined,
    // Формуємо масив інгредієнтів для Google
    recipeIngredient: recipe.ingredients.map((ingredient) =>
      formatIngredientForJsonLd(ingredient, units)
    ),
    // Формуємо покрокову інструкцію (HowToStep)
    recipeInstructions: steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.instruction,
      position: step.stepNumber,
    })),
    // Прив'язка вашого YouTube відео прямо всередину схеми рецепта
    video: youtubeId
      ? {
          '@type': 'VideoObject',
          name: title,
          description: description,
          thumbnailUrl: [featuredImage],
          uploadDate: publishedAt,
          embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />

      <main className="min-h-screen bg-white py-10 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <article className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 print:hidden">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.categoryId}
                  href={ROUTES.category(cat.category.slug)}
                  aria-label={`View ${cat.category.name} recipes`}
                  className="group"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer text-zinc-600 transition-colors group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:text-white dark:text-zinc-400 dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-zinc-950"
                  >
                    {cat.category.name}
                  </Badge>
                </Link>
              ))}
            </div>

            <PrintModal recipe={recipe} units={units} />
          </div>

          <header className="space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              {description}
            </p>
          </header>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
            <Image
              src={featuredImage}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <RecipeInteractiveView recipe={recipe} units={units} />

          {youtubeId && (
            <section className="space-y-4 pt-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Watch the ASMR Recipe
              </h2>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                  title={title}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
