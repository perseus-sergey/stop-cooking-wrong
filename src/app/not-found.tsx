import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ROUTES } from '@/config/site';
import { Flame, Home } from 'lucide-react';

const SUGGESTED_CATEGORIES = [
  { name: 'Breakfast', href: ROUTES.category('breakfast') },
  { name: 'Dinner', href: ROUTES.category('dinner') },
  { name: 'Sides & Potatoes', href: ROUTES.category('sides') },
  { name: 'Snacks', href: ROUTES.category('snacks') },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/50">
          <Flame className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
            Error 404
          </p>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Page Not Found
          </h1>
          <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
            {
              "The recipe or category you're looking for doesn't exist or has moved. Explore our popular sections below:"
            }
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {SUGGESTED_CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className:
                  'rounded-full border-zinc-300 text-xs dark:border-zinc-700',
              })}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <Link
            href={ROUTES.home}
            className={buttonVariants({
              className:
                'gap-2 bg-orange-600 text-xs font-semibold text-white hover:bg-orange-700',
            })}
          >
            <Home className="h-4 w-4" /> Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
