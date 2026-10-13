import FavoritesList from '@/components/layout/FavoritesList';

export default function FavoritesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Favorite Recipes</h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Your saved recipes, all in one place.
        </p>
      </div>

      <FavoritesList />
    </main>
  );
}
