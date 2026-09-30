'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ROUTES } from '@/config/site';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
          <AlertCircle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-widest text-red-600 uppercase dark:text-red-400">
            Something went wrong
          </p>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Our Air Fryer Hit a Snag
          </h1>
          <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
            {
              "We couldn't load this page right now. It might be a momentary glitch. Please try again."
            }
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <Button
            onClick={() => reset()}
            className="w-full gap-2 bg-orange-600 text-xs font-semibold text-white hover:bg-orange-700 sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>

          <Link
            href={ROUTES.home}
            className={buttonVariants({
              variant: 'outline',
              className: 'w-full gap-2 text-xs sm:w-auto',
            })}
          >
            <Home className="h-4 w-4" /> Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
