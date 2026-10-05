import { getNavCategories } from '@/queries/categories.query';
import DesktopNavigation from './DesktopNavigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import MobileNavigation from './MobileNavigation';
import NavbarLogo from './NavbarLogo';
import YouTubeButton from './YouTubeButton';
import Link from 'next/link';

export default async function Navbar() {
  const categories = await getNavCategories();

  const categoryGroups = categories.reduce(
    (groups, category) => {
      (groups[category.type] ??= []).push(category);

      return groups;
    },
    {} as Record<string, typeof categories>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavbarLogo />

        <DesktopNavigation categoryGroups={categoryGroups} />

        <Link href="/shopping-list">Shopping List</Link>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <YouTubeButton />

          <MobileNavigation categoryGroups={categoryGroups} />
        </div>
      </div>
    </header>
  );
}
