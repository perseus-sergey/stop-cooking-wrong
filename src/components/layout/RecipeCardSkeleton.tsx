import { Skeleton } from '@/components/ui/skeleton';

export default function RecipeCardSkeleton() {
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
