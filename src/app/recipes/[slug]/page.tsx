import type { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { siteConfig, ROUTES } from '@/config/site.config';
import { toIsoDuration } from '@/lib/utils';
import PrintModal from '@/components/recipe/PrintModal';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { getRecipe, getUnits } from '@/queries/recipes.query';
import { formatIngredientForJsonLd } from '@/lib/formatters/formatIngredient';
import RecipeInteractiveView from '@/components/recipe/RecipeInteractiveView';
import { Card, CardContent } from '@/components/ui/card';

import {
  Clock,
  Flame,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';

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

          {/*============================ */}
          {/*============================ */}
          {/*============================ */}
          <div className="space-y-10 print:space-y-4">
            {/* 1. Швидка статистика (компактна на друці) */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900 print:border-zinc-300 print:bg-transparent print:p-2">
              <div className="flex items-center gap-3 print:gap-1.5">
                <Clock className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
                <div>
                  <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
                    Prep
                  </p>
                  <p className="text-sm font-semibold print:text-xs">
                    {recipe.prepTimeMinutes} mins
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 print:gap-1.5">
                <Flame className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
                <div>
                  <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
                    Air Fry
                  </p>
                  <p className="text-sm font-semibold print:text-xs">
                    {recipe.cookTimeMinutes} mins
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 print:gap-1.5">
                <Users className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
                <div>
                  <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
                    Servings
                  </p>
                  <p className="text-sm font-semibold print:text-xs">
                    {recipe.servings} people
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 print:gap-1.5">
                <Sparkles className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
                <div>
                  <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
                    Calories
                  </p>
                  <p className="text-sm font-semibold print:text-xs">
                    {recipe.caloriesPerServing ?? 'N/A'} kcal
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Stop Cooking Wrong (на друці компактна рамка) */}
            <Card className="overflow-hidden border-orange-500/30 bg-orange-50/40 shadow-sm dark:bg-orange-950/20 print:break-inside-avoid print:border-zinc-300 print:bg-zinc-50 print:shadow-none">
              <div className="flex items-center gap-1.5 bg-orange-500 px-4 py-1.5 text-xs font-medium tracking-wider text-white uppercase print:bg-zinc-800 print:py-1 print:text-[10px]">
                <Sparkles className="h-4 w-4" /> {siteConfig.brand.secretBadge}
              </div>
              <CardContent className="grid gap-3 p-4 text-xs leading-relaxed sm:grid-cols-2 print:p-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                    <XCircle className="h-4 w-4" />
                    <span>{siteConfig.brand.commonMistakeLabel}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 print:text-zinc-700">
                    {recipe.mistakeToAvoid}
                  </p>
                </div>

                <div className="space-y-1 sm:border-l sm:border-orange-200 sm:pl-3 dark:sm:border-orange-900/40 print:border-zinc-300">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{siteConfig.brand.theRightMoveLabel}</span>
                  </div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-100 print:text-black">
                    {recipe.theRightMove}
                  </p>
                </div>
              </CardContent>
            </Card>

            <RecipeInteractiveView recipe={recipe} units={units} />
          </div>

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
