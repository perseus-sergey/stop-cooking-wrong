import { Skeleton } from '@/components/ui/skeleton';

export default function RecipeLoading() {
  return (
    <main className="min-h-screen bg-white py-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
        {/* Бейджі та кнопка друку */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>

        {/* Заголовок і опис */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/4 rounded-lg sm:h-12" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>

        {/* Скелетон головного фото */}
        <Skeleton className="aspect-video w-full rounded-2xl" />

        {/* Скелетон швидкої статистики (4 плашки) */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 p-4 sm:grid-cols-4 dark:border-zinc-800">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Скелетон колонок інгредієнтів і кроків */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
          <div className="space-y-4 lg:col-span-7">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
