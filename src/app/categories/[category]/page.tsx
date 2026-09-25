import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockRecipes } from '@/data/mock-recipe';
import RecipeCard from '@/components/recipe/RecipeCard';
import { Button, buttonVariants } from '@/components/ui/button';
import { siteConfig, ROUTES } from '@/config/site';
import { Flame, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string }>;
}

// Список допустимих категорій та їхній гарний опис для людей та SEO
const CATEGORY_INFO: Record<string, { title: string; desc: string }> = {
  breakfast: {
    title: 'Air Fryer Breakfast Recipes',
    desc: 'Quick, crispy, and protein-packed morning meals made simple with your air fryer.',
  },
  dinner: {
    title: 'Easy Air Fryer Dinners',
    desc: 'Tender on the inside, crispy on the outside. Weeknight dinners with minimal cleanup.',
  },
  sides: {
    title: 'Crispy Sides & Potatoes',
    desc: 'The crunchiest diner-style potatoes, roasted veggies, and unforgettable side dishes.',
  },
  snacks: {
    title: 'Air Fryer Snacks & Appetizers',
    desc: 'Quick bites, party finger foods, and crispy comfort snacks made in minutes.',
  },
};

// 1. Статична генерація (SSG) для миттєвого завантаження на Vercel
export async function generateStaticParams() {
  return Object.keys(CATEGORY_INFO).map((cat) => ({
    category: cat,
  }));
}

// 2. SEO-метадані для кожної категорії
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_INFO[category.toLowerCase()];

  if (!info) return {};

  return {
    title: `${info.title} | ${siteConfig.name}`,
    description: info.desc,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryKey = category.toLowerCase();
  const info = CATEGORY_INFO[categoryKey];

  // Якщо такої категорії немає в списку — показуємо акуратну 404
  if (!info) {
    notFound();
  }

  // Фільтруємо рецепти за категорією
  const filteredRecipes = mockRecipes.filter((r) => {
    if (categoryKey === 'sides') {
      return (
        r.category.toLowerCase().includes('side') ||
        r.subCategories.some((sub) => sub.toLowerCase().includes('side'))
      );
    }
    return r.category.toLowerCase() === categoryKey;
  });

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
          {info.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          {info.desc}
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
