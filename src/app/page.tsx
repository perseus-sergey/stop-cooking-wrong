import Link from 'next/link';
import Image from 'next/image';
import RecipeCard from '@/components/recipe/RecipeCard';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteConfig, ROUTES } from '@/config/site';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Clock,
  Volume2,
  ShieldCheck,
} from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import { prisma } from '@/lib/prisma';

const getRecipes = async () =>
  await prisma.recipe.findMany({
    orderBy: { publishedAt: 'desc' },

    include: {
      categories: {
        include: { category: true },
        orderBy: {
          category: { order: 'asc' },
        },
      },
    },
  });

export default async function HomePage() {
  const recipes = await getRecipes();

  const featuredRecipe = recipes[0];
  const recentRecipes = recipes.slice(1);

  if (!featuredRecipe) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-zinc-500">
            No recipes found. Add some in Prisma Studio!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-20">
      {/* =================================================================== */}
      {/* HERO / FEATURED RECIPE                                               */}
      {/* =================================================================== */}
      <section
        aria-labelledby="hero-heading"
        className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="relative min-h-170 sm:min-h-180 lg:min-h-190">
          {/* ----------------------------------------------------------------- */}
          {/* Background image                                                  */}
          {/* Decorative because the recipe information is also available      */}
          {/* as actual text content.                                           */}
          {/* ----------------------------------------------------------------- */}
          <div className="absolute inset-0">
            <Image
              src={featuredRecipe.featuredImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
            />

            {/* Main gradient — protects text readability */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/10"
            />

            {/* Bottom gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/10"
            />

            {/* Subtle overall contrast layer */}
            <div aria-hidden="true" className="absolute inset-0 bg-black/10" />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* Hero content                                                       */}
          {/* ----------------------------------------------------------------- */}
          <div className="relative z-10 mx-auto flex min-h-170 max-w-7xl items-center px-5 py-20 sm:min-h-180 sm:px-8 lg:min-h-190 lg:px-10">
            <div className="max-w-3xl space-y-7">
              {/* Eyebrow */}
              <Badge
                variant="outline"
                className="inline-flex items-center gap-1.5 border-orange-400/40 bg-orange-600/90 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm"
              >
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                Air Fryer Secrets & Technique
              </Badge>

              {/* Main page heading */}
              <h1
                id="hero-heading"
                className="text-5xl leading-[0.98] font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                Stop Cooking Wrong.
                <br />
                <span className="text-orange-400">Master Your Air Fryer.</span>
              </h1>

              {/* Hero description */}
              <p className="max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg lg:text-xl">
                Transform everyday ingredients into restaurant-quality meals. No
                complicated steps — just knowing the right move at the right
                moment.
              </p>

              {/* Primary actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={ROUTES.recipe(featuredRecipe.slug)}
                  className={buttonVariants({
                    variant: 'orange',
                    size: 'lg',
                    className:
                      'h-12 gap-2 px-6 font-bold shadow-xl shadow-orange-950/30',
                  })}
                >
                  Explore Latest Recipe
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>

                <a
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    className:
                      'h-12 gap-2 border-white/30 bg-white/10 px-5 text-white backdrop-blur-md hover:bg-white/20 hover:text-white',
                  })}
                >
                  <YoutubeIcon
                    aria-hidden="true"
                    className="h-5 w-5 fill-current text-red-500"
                  />
                  Subscribe
                </a>
              </div>

              {/* ---------------------------------------------------------------- */}
              {/* Featured recipe metadata                                        */}
              {/* ---------------------------------------------------------------- */}
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-sm">
                <li className="font-bold text-orange-300">
                  🔥 Trending Recipe
                </li>

                <li aria-hidden="true" className="text-white/40">
                  •
                </li>

                <li className="flex items-center gap-1.5 text-zinc-200">
                  <Clock
                    aria-hidden="true"
                    className="h-4 w-4 text-orange-300"
                  />
                  <span>{featuredRecipe.cookTimeMinutes} mins</span>
                </li>

                <li aria-hidden="true" className="text-white/40">
                  •
                </li>

                <li className="text-zinc-300">
                  {featuredRecipe.categories[0].category.name}
                </li>
              </ul>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* Featured recipe                                                    */}
          {/*                                                                    */}
          {/* Mobile: normal document flow, so it can never overlap metadata.  */}
          {/* Desktop: positioned over the image for the editorial layout.     */}
          {/* ----------------------------------------------------------------- */}
          <article className="relative z-10 px-5 pb-8 sm:px-8 lg:absolute lg:right-10 lg:bottom-10 lg:max-w-md lg:px-0 lg:pb-0">
            <Link
              href={ROUTES.recipe(featuredRecipe.slug)}
              className="group block rounded-2xl border border-white/15 bg-black/40 p-4 text-left shadow-xl backdrop-blur-md transition-colors hover:bg-black/55 sm:p-5"
            >
              <div className="mb-1 text-[10px] font-bold tracking-[0.18em] text-orange-300 uppercase">
                Latest Recipe
              </div>

              <h2 className="text-lg leading-snug font-extrabold text-white transition-colors group-hover:text-orange-300 sm:text-xl">
                {featuredRecipe.title}
              </h2>

              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                {featuredRecipe.description}
              </p>
            </Link>
          </article>
        </div>
      </section>

      {/* =================================================================== */}
      {/* MAIN CONTENT                                                         */}
      {/* =================================================================== */}
      <div className="mx-auto max-w-7xl space-y-20 px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        {/* ================================================================= */}
        {/* RECENT RECIPES                                                     */}
        {/* ================================================================= */}
        <section aria-labelledby="recent-recipes-heading" className="space-y-8">
          {/* Section heading */}
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 text-xs font-bold tracking-[0.16em] text-orange-600 uppercase dark:text-orange-400">
                From the kitchen
              </div>

              <h2
                id="recent-recipes-heading"
                className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
              >
                Recent Recipes
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
                Crispy, quick, and tested for real home kitchens.
              </p>
            </div>

            {recentRecipes.length > 0 && (
              <p className="hidden text-sm font-medium text-zinc-400 sm:block">
                {recentRecipes.length}{' '}
                {recentRecipes.length === 1 ? 'recipe' : 'recipes'}
              </p>
            )}
          </header>

          {/* Recipe list */}
          {recentRecipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentRecipes.map((recipe) => (
                <article key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
              <p className="text-sm text-zinc-500">
                More recipes are coming soon.
              </p>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* CHANNEL / BRAND BLOCK                                              */}
        {/* ================================================================= */}
        <section
          aria-labelledby="channel-heading"
          className="relative overflow-hidden rounded-[2rem] bg-orange-600 shadow-xl shadow-orange-900/10"
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-orange-500 via-orange-600 to-orange-700"
          />

          <Flame
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-20 h-96 w-96 text-orange-500/50"
          />

          <div className="relative z-10 grid items-center gap-10 px-7 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-16">
            {/* Copy */}
            <div className="max-w-2xl space-y-5">
              <div className="text-xs font-bold tracking-[0.18em] text-orange-100 uppercase">
                The Stop Cooking Wrong approach
              </div>

              <h2
                id="channel-heading"
                className="text-3xl leading-[1.05] font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Cooking without the noise.
                <br />
                Just pure food & sound.
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-orange-100 sm:text-base">
                Every video is built around soothing ASMR cooking sounds, clear
                dual-measurement subtitles in 56 languages, and zero unnecessary
                chatter.
              </p>

              {/* Channel features */}
              <ul className="grid grid-cols-1 gap-4 pt-2 text-sm sm:grid-cols-2">
                <li className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15"
                  >
                    <Volume2 className="h-4 w-4 text-orange-100" />
                  </span>

                  <span className="text-orange-50">
                    Crispy & sizzling ASMR audio
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15"
                  >
                    <ShieldCheck className="h-4 w-4 text-orange-100" />
                  </span>

                  <span className="text-orange-50">US & metric dual units</span>
                </li>
              </ul>

              {/* YouTube CTA */}
              <div className="pt-3">
                <a
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl"
                >
                  <YoutubeIcon
                    aria-hidden="true"
                    className="h-4 w-4 fill-current text-red-600"
                  />
                  Join Our YouTube Channel
                </a>
              </div>
            </div>

            {/* Decorative visual */}
            <div
              aria-hidden="true"
              className="relative hidden min-h-65 lg:block"
            >
              <div className="absolute top-1/2 right-4 -translate-y-1/2 rotate-3">
                <div className="rounded-3xl border border-white/20 bg-black/10 p-3 shadow-2xl backdrop-blur-sm">
                  <div className="flex h-52 w-72 items-end rounded-2xl bg-white/10 p-5">
                    <div>
                      <div className="mb-2 text-xs font-bold tracking-widest text-orange-100 uppercase">
                        No noise.
                      </div>

                      <div className="text-3xl leading-none font-black text-white">
                        Just
                        <br />
                        <span className="text-orange-200">great food.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-16 h-16 w-16 rounded-full border border-white/10 bg-white/10" />

              <div className="absolute right-0 bottom-8 h-24 w-24 rounded-full border border-white/10 bg-white/5" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
