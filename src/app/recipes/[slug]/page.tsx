import type { Metadata } from 'next';
import Image from 'next/image';
import RecipeInteractiveView from '@/components/recipe/RecipeInteractiveView';
import { Badge } from '@/components/ui/badge';
import { siteConfig, ROUTES } from '@/config/site';
import { toIsoDuration } from '@/lib/utils';
import PrintModal from '@/components/recipe/PrintModal';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getRecipe } from '@/queries/recipes.query';

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
  const recipe = await getRecipe(slug);

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
      name: 'Stop Cooking Wrong',
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
    recipeIngredient: ingredients.map(
      (ing) =>
        `${ing.amountUS} (${ing.amountMetric}) ${ing.name}${ing.notes ? `, ${ing.notes}` : ''}`
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
        {/* ========================================================================= */}
        {/* 1. СПЕЦІАЛЬНА 1-СТОРІНКОВА КАРТКА ДЛЯ ДРУКУ (Видно ТІЛЬКИ на принтері) */}
        {/* ========================================================================= */}
        <section className="hidden p-2 font-sans text-xs leading-tight text-black print:block">
          {/* Шапка для друку */}
          <div className="mb-3 flex items-start justify-between border-b-2 border-black pb-2">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                Stop Cooking Wrong • Air Fryer Recipe
              </p>
              <h1 className="mt-0.5 text-xl font-black">{title}</h1>
              <p className="mt-0.5 text-[11px] text-zinc-700 italic">
                {description}
              </p>
            </div>
            <div className="ml-4 shrink-0 text-right text-[10px]">
              <p className="font-semibold">youtube.com/@StopCookingWrong</p>
              <p className="text-zinc-500">Air Fryer Master Series</p>
            </div>
          </div>

          {/* Параметри в один рядок */}
          <div className="mb-3 flex justify-between rounded border border-zinc-300 bg-zinc-100 p-2 text-[11px] font-medium">
            <span>
              <strong>Prep:</strong> {prepTimeMinutes} mins
            </span>
            <span>
              <strong>Air Fry:</strong> {cookTimeMinutes} mins
            </span>
            <span>
              <strong>Servings:</strong> {servings}
            </span>
            <span>
              <strong>Calories:</strong> {caloriesPerServing ?? 'N/A'} kcal
            </span>
          </div>

          {/* Секрет каналу */}
          <div className="mb-3 rounded border border-black bg-zinc-50 p-2">
            <p className="text-[11px] font-bold">💡 The Right Move:</p>
            <p className="text-[10px] text-zinc-800">{theRightMove}</p>
          </div>

          {/* Дві компактні колонки: Інгредієнти та Кроки */}
          <div className="grid grid-cols-12 items-start gap-4">
            {/* Ліва колонка: Інгредієнти */}
            <div className="col-span-5 border-r border-zinc-200 pr-3">
              <h2 className="mb-2 border-b border-zinc-400 pb-1 text-[11px] font-bold uppercase">
                Ingredients
              </h2>
              <ul className="space-y-1.5 text-[11px]">
                {ingredients.map((ing) => (
                  <li key={ing.id} className="flex items-start gap-1.5">
                    <span className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 rounded-sm border border-zinc-500" />
                    <span>
                      <strong>{ing.amountUS}</strong> ({ing.amountMetric}){' '}
                      {ing.name}
                      {ing.notes && (
                        <span className="block text-[10px] text-zinc-500">
                          ({ing.notes})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Права колонка: Кроки приготування */}
            <div className="col-span-7">
              <h2 className="mb-2 border-b border-zinc-400 pb-1 text-[11px] font-bold uppercase">
                Instructions
              </h2>
              <ol className="space-y-2 text-[11px]">
                {steps.map((step) => (
                  <li key={step.stepNumber} className="leading-snug">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="font-bold">
                        {step.stepNumber}. {step.title}
                      </span>
                      {step.tempF && (
                        <span className="rounded bg-zinc-200 px-1 font-mono text-[10px] font-semibold">
                          {step.tempF}°F / {step.tempC}°C
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-zinc-800">{step.instruction}</p>
                    {step.isShakePoint && (
                      <span className="mt-0.5 inline-block text-[10px] font-semibold text-amber-800">
                        ↳ ⚠️ Shake basket thoroughly
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Копірайт внизу */}
          <div className="mt-4 border-t border-zinc-200 pt-2 text-center text-[9px] text-zinc-500">
            For full ASMR cooking video and visual steps, visit:
            {siteConfig.links.youtube}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ЗВИЧАЙНА ЕКРАННА ВЕРСТКА ДЛЯ ВІДВІДУВАЧІВ САЙТУ (При друці ХОВАЄТЬСЯ) */}
        {/* ========================================================================= */}
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

            <PrintModal recipe={recipe} />
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

          <RecipeInteractiveView recipe={recipe} />

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
