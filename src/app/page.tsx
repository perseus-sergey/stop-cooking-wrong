import Link from 'next/link';
import Image from 'next/image';
import { mockRecipes } from '@/data/mock-recipe';
import RecipeCard from '@/components/recipe/RecipeCard';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteConfig, ROUTES } from '@/config/site';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Volume2,
  ShieldCheck,
} from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';

export default function HomePage() {
  const featuredRecipe = mockRecipes[0];
  const recentRecipes = mockRecipes.slice(1);

  return (
    <main className="space-y-16 pb-20">
      {/* 1. HERO СЕКЦІЯ */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center sm:px-6">
          <Badge
            variant="outline"
            className="inline-flex items-center gap-1.5 border-orange-500/30 bg-white px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-zinc-800 dark:text-orange-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Air Fryer Secrets & Technique
          </Badge>

          <h1 className="mx-auto max-w-3xl text-4xl leading-[1.1] font-black tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
            Stop Cooking Wrong. <br />
            <span className="text-orange-600 dark:text-orange-500">
              Master Your Air Fryer.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
            Transform everyday ingredients into restaurant-quality meals. No
            complicated steps — just knowing the right move at the right moment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href={ROUTES.recipe(featuredRecipe.slug)}
              className={buttonVariants({
                size: 'lg',
                className:
                  'gap-2 bg-orange-600 font-semibold text-white shadow-md hover:bg-orange-700',
              })}
            >
              Explore Latest Recipe <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'gap-2 border-zinc-300 dark:border-zinc-700',
              })}
            >
              <YoutubeIcon className="h-5 w-5 fill-current text-red-600" />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6">
        {/* 2. FEATURED RECIPE (ГОЛОВНИЙ РЕЦЕПТ ТИЖНЯ) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                Featured Recipe
              </h2>
              <p className="text-xs text-zinc-500">
                The most popular crispy technique this week
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md lg:grid-cols-12 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative aspect-16/10 w-full lg:col-span-7">
              <Image
                src={featuredRecipe.featuredImage}
                alt={featuredRecipe.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="space-y-4 p-6 sm:p-8 lg:col-span-5">
              <Badge className="bg-orange-600 text-white">
                {featuredRecipe.category}
              </Badge>
              <h3 className="text-2xl leading-tight font-extrabold sm:text-3xl">
                <Link
                  href={ROUTES.recipe(featuredRecipe.slug)}
                  className="transition-colors hover:text-orange-600"
                >
                  {featuredRecipe.title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {featuredRecipe.description}
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <span>⏱️ {featuredRecipe.cookTimeMinutes} mins cook</span>
                <span>🔥 2 Temperature stages</span>
              </div>

              <div className="pt-4">
                <Link
                  href={ROUTES.recipe(featuredRecipe.slug)}
                  className={buttonVariants({
                    size: 'sm',
                    className:
                      'gap-2 bg-zinc-900 text-xs font-medium text-white hover:bg-orange-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-orange-600 dark:hover:text-white',
                  })}
                >
                  View Full Recipe & Pro Secret →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. КАТАЛОГ ОСТАННІХ РЕЦЕПТІВ (GRID) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Recent Recipes
              </h2>
              <p className="text-xs text-zinc-500">
                Crispy, quick, and tested in simple air fryers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* 4. БРЕНДОВИЙ БЛОК: ЧОМУ НАШІ ВІДЕО ТАКІ ОСОБЛИВІ */}
        <section className="relative overflow-hidden rounded-3xl bg-orange-600 p-8 text-white shadow-lg sm:p-12">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl leading-snug font-black tracking-tight sm:text-4xl">
              Cooking without the noise. Just pure food & sound.
            </h2>
            <p className="text-sm leading-relaxed text-orange-100 sm:text-base">
              Every video on Stop Cooking Wrong is recorded with soothing ASMR
              cooking sounds, clear dual-measurement subtitles in 56 languages,
              and zero unnecessary chatter.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-4 text-xs sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-orange-200" />
                <span>Crispy & Sizzling ASMR Audio</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-orange-200" />
                <span>US & Metric Dual Units</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-orange-600 shadow transition-colors hover:bg-orange-50"
              >
                <YoutubeIcon className="h-4 w-4 fill-current text-red-600" />
                Join Our YouTube Channel
              </a>
            </div>
          </div>

          {/* Фонова декоративна іконка вогню */}
          <Flame className="pointer-events-none absolute -right-12 -bottom-12 h-80 w-80 text-orange-500/40" />
        </section>
      </div>
    </main>
  );
}
