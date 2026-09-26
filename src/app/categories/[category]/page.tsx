import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import RecipeCard from '@/components/recipe/RecipeCard';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig, ROUTES } from '@/config/site';
import { Flame, ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    select: {
      slug: true,
    },
  });

  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;

  const categoryData = await prisma.category.findUnique({
    where: {
      slug: category.toLowerCase(),
      isActive: true,
    },
    select: {
      name: true,
      description: true,
    },
  });

  if (!categoryData) return {};

  return {
    title: `${categoryData.name} | ${siteConfig.name}`,
    description: categoryData.description ?? undefined,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = await prisma.category.findUnique({
    where: {
      slug: category.toLowerCase(),
      isActive: true,
    },
    include: {
      recipes: {
        include: {
          recipe: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!categoryData) notFound();

  const filteredRecipes = categoryData.recipes.map(({ recipe }) => recipe);

  //   const info = CATEGORY_INFO[categoryKey];

  // Якщо такої категорії немає в списку — показуємо акуратну 404
  //   if (!info) notFound();

  //   // Фільтруємо рецепти за категорією
  //   const filteredRecipes = mockRecipes.filter((r) => {
  //     if (categoryKey === 'sides') {
  //       return (
  //         r.category.toLowerCase().includes('side') ||
  //         r.subCategories.some((sub) => sub.toLowerCase().includes('side'))
  //       );
  //     }
  //     return r.category.toLowerCase() === categoryKey;
  //   });

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      {/* Кнопка "Назад на головну" */}
      <div>
        <Link
          href={ROUTES.home}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className:
              'gap-2 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100',
          })}
        >
          <ArrowLeft className="h-4 w-4" /> Back to All Recipes
        </Link>
      </div>

      {/* Заголовок розділу */}
      <header className="space-y-3 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-400">
          <Flame className="h-3.5 w-3.5 fill-current" /> Category
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          {categoryData.name}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          {categoryData.description}
        </p>
      </header>

      {/* Список рецептів цієї категорії */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 py-20 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">
            New recipes for this category are being filmed right now. Stay
            tuned!
          </p>
        </div>
      )}
    </main>
  );
}
