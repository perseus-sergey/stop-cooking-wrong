'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Flame, Home, Menu, Sparkles } from 'lucide-react';

import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

import { capitalize, cn } from '@/lib/utils';
import { NavCategory } from '@/types/category.type';
import { ROUTES, siteConfig } from '@/config/site.config';
import { CATEGORY_UI } from '@/config/categories.config';

type MobileNavbarProps = {
  categoryGroups: Record<string, NavCategory[]>;
};

export default function MobileNavigation({
  categoryGroups,
}: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900">
          <Menu className="h-5 w-5" />

          <span className="sr-only">Open navigation menu</span>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex h-full w-[min(20rem,100vw)] flex-col gap-0 p-0 sm:w-96"
        >
          {/* Fixed header */}
          <SheetHeader className="shrink-0 border-b border-zinc-100 px-6 py-5 text-left dark:border-zinc-800">
            <SheetTitle className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm">
                <Flame className="h-4 w-4 fill-current" />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-base leading-none font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                  {siteConfig.name.toUpperCase()}
                </span>

                <span className="mt-0.5 text-[9px] font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
                  Air Fryer Master Series
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable navigation */}
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-1">
              {/* Home */}
              <Link
                href={ROUTES.home}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-zinc-900 transition-all active:scale-[0.98] active:bg-zinc-100 dark:text-zinc-100 dark:active:bg-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    <Home className="h-4 w-4" />
                  </div>

                  <span>Home</span>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
              </Link>

              {/* Categories heading */}
              <div className="pt-4 pb-2">
                <p className="px-3 text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                  Recipe Categories
                </p>
              </div>

              {Object.entries(categoryGroups).map(
                ([type, group], groupIndex) => {
                  const groupLabel = capitalize(type);

                  return (
                    <div key={type}>
                      {groupIndex > 0 && (
                        <Separator className="mx-3 my-3 w-auto" />
                      )}

                      <div className="pt-4 pb-2">
                        <p className="px-3 text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                          {groupLabel}
                        </p>
                      </div>

                      {group.map((category) => {
                        const ui =
                          CATEGORY_UI[
                            category.slug as keyof typeof CATEGORY_UI
                          ];

                        const Icon = ui?.icon ?? Sparkles;

                        return (
                          <Link
                            key={category.id}
                            href={ROUTES.category(category.slug)}
                            onClick={closeMenu}
                            className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-zinc-800 transition-all active:scale-[0.98] active:bg-zinc-100 dark:text-zinc-200 dark:active:bg-zinc-800"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                                <Icon className="h-4 w-4" />
                              </div>

                              <span className="truncate">{category.name}</span>
                            </div>

                            <div className="ml-2 flex shrink-0 items-center gap-2">
                              {ui?.badge && (
                                <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                                  {ui.badge}
                                </span>
                              )}

                              <ChevronRight className="h-4 w-4 text-zinc-400" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Fixed footer */}
          <div className="shrink-0 border-t border-zinc-100 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-3.5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Relaxing ASMR Cooking
              </p>

              <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                New air fryer recipes every week. Watch hands-only visual steps.
              </p>
            </div>

            <a
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                'w-full gap-2 bg-red-600 py-5 text-sm font-semibold text-white shadow-md hover:bg-red-700'
              )}
            >
              <YoutubeIcon className="h-4 w-4" aria-hidden="true" />
              Subscribe on YouTube
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
