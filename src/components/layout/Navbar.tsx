'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig, ROUTES } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Flame,
  Menu,
  ChevronRight,
  Home,
  Egg,
  UtensilsCrossed,
  Sparkles,
  Cookie,
} from 'lucide-react';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { cn } from 'cn'; // або '@/lib/utils'

const NAV_LINKS = [
  {
    name: 'Breakfast',
    href: ROUTES.category('breakfast'),
    icon: Egg,
    badge: 'Quick',
  },
  {
    name: 'Dinner',
    href: ROUTES.category('dinner'),
    icon: UtensilsCrossed,
  },
  {
    name: 'Sides & Potatoes',
    href: ROUTES.category('sides'),
    icon: Sparkles,
    badge: 'Crispy',
  },
  {
    name: 'Snacks',
    href: ROUTES.category('snacks'),
    icon: Cookie,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Логотип */}
        <Link href={ROUTES.home} className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-none font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              STOP COOKING WRONG
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-orange-600 uppercase dark:text-orange-400">
              Air Fryer Master
            </span>
          </div>
        </Link>

        {/* Навігація для комп'ютерів (Desktop) */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Дії справа: Тема + Кнопка YouTube */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* YouTube кнопка на десктопі */}
          <a
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'hidden gap-2 bg-red-600 text-xs font-medium text-white shadow-sm hover:bg-red-700 sm:inline-flex'
            )}
          >
            <YoutubeIcon className="h-4 w-4 fill-current" />
            Subscribe
          </a>

          {/* Мобільне меню (Бургер) */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-80 flex-col justify-between p-6 sm:w-96"
              >
                {/* 1. Верхній брендинг шторки */}
                <div>
                  <SheetHeader className="border-b border-zinc-100 pb-4 text-left dark:border-zinc-800">
                    <SheetTitle className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm">
                        <Flame className="h-4 w-4 fill-current" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base leading-none font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                          STOP COOKING WRONG
                        </span>
                        <span className="mt-0.5 text-[9px] font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
                          Air Fryer Master Series
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-1">
                    {/* Home Link */}
                    <Link
                      href={ROUTES.home}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-zinc-900 transition-all active:scale-[0.98] active:bg-zinc-100 dark:text-zinc-100 dark:active:bg-zinc-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                          <Home className="h-4 w-4" />
                        </div>
                        <span>Home</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </Link>

                    <div className="pt-4 pb-2">
                      <p className="px-3 text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                        Recipe Categories
                      </p>
                    </div>

                    {/* Категорії */}
                    {NAV_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-zinc-800 transition-all active:scale-[0.98] active:bg-zinc-100 dark:text-zinc-200 dark:active:bg-zinc-800"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span>{link.name}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {link.badge && (
                              <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                                {link.badge}
                              </span>
                            )}
                            <ChevronRight className="h-4 w-4 text-zinc-400" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Преміальний підвал шторки з карткою YouTube */}
                <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <div className="mb-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-3.5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Relaxing ASMR Cooking
                    </p>
                    <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                      New air fryer recipes every week. Watch hands-only visual
                      steps.
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
                    <YoutubeIcon className="h-4 w-4 fill-current" />
                    Subscribe on YouTube
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
