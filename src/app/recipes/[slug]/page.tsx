import Image from 'next/image';
import { mockRecipe } from '@/data/mock-recipe';
import RecipeInteractiveView from '@/components/recipe/RecipeInteractiveView';
import { Badge } from '@/components/ui/badge';

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Коли підключимо БД, тут буде await prisma.recipe.findUnique(...)
  const recipe = mockRecipe;

  return (
    <main className="min-h-screen bg-white py-10 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <article className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
        {/* Шапка статті */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-orange-600 font-medium text-white hover:bg-orange-700">
              {recipe.category}
            </Badge>
            {recipe.subCategories.map((sub) => (
              <Badge
                key={sub}
                variant="outline"
                className="text-zinc-600 dark:text-zinc-400"
              >
                {sub}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {recipe.title}
          </h1>

          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            {recipe.description}
          </p>
        </header>

        {/* Головне фото страви */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
          <Image
            src={recipe.featuredImage}
            alt={recipe.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Інтерактивна частина (інгредієнти, перемикач, кроки) */}
        <RecipeInteractiveView recipe={recipe} />

        {/* Відео з YouTube */}
        {recipe.youtubeId && (
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Watch the ASMR Recipe
            </h2>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${recipe.youtubeId}`}
                title={recipe.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
