import { Skeleton } from '@/components/ui/skeleton';

function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {/* Фото */}
      <Skeleton className="aspect-4/3 w-full rounded-none" />

      {/* Контент картки */}
      <div className="space-y-3 p-5">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-4/5 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function CategoryLoading() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      {/* Кнопка "Назад на головну" */}
      <div>
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      {/* Заголовок категорії */}
      <header className="space-y-3 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <Skeleton className="h-6 w-24 rounded-full" />

        <Skeleton className="h-10 w-2/3 rounded-lg sm:h-12 sm:w-1/2" />

        <div className="max-w-2xl space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      </header>

      {/* Сітка рецептів */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
      </div>
    </main>
  );
}
