import Link from 'next/link';
import { siteConfig, ROUTES } from '@/config/site.config';
import { Flame } from 'lucide-react';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { cacheLife } from 'next/cache';
import { getNavCategories } from '@/queries/categories.query';

const CAT_QUANTITY = 3;

export default async function Footer() {
  const categories = await getNavCategories();

  const exploreCategories = [...categories]
    .sort((a, b) => b._count.recipes - a._count.recipes)
    .slice(0, CAT_QUANTITY);

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 print:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-4">
        {/* Про канал */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-600 text-white">
              <Flame className="h-4 w-4 fill-current" />
            </div>
            <span className="font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              {siteConfig.name.toUpperCase()}
            </span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed">
            {siteConfig.description} Every recipe is designed with practical
            dual measurements and the right technique at the right moment.
          </p>
        </div>

        {/* Швидкі посилання */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-zinc-900 uppercase dark:text-zinc-100">
            Explore
          </p>
          <ul className="space-y-1.5 text-xs">
            {exploreCategories.map(({ id, slug, name }) => (
              <li key={id}>
                <Link
                  href={ROUTES.category(slug)}
                  className="hover:text-orange-600"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* YouTube Community */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-zinc-900 uppercase dark:text-zinc-100">
            Join Community
          </p>
          <p className="text-xs">
            Watch weekly relaxing ASMR air fryer recipes.
          </p>
          <a
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-red-600 hover:text-red-700"
          >
            <YoutubeIcon className="h-4 w-4" aria-hidden="true" />
            Visit YouTube Channel →
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-zinc-200 px-4 pt-6 text-center text-xs text-zinc-400 sm:px-6 dark:border-zinc-800">
        © <CurrentYear /> {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}

async function CurrentYear() {
  'use cache';

  cacheLife('days');

  return new Date().getFullYear();
}
