import { getNavCategories } from '@/queries/categories.query';
import DesktopNavigation from './DesktopNavigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import MobileNavigation from './MobileNavigation';
import NavbarLogo from './NavbarLogo';
import YouTubeButton from './YouTubeButton';
import ShoppingListLink from './ShoppingListLink';
import UnitSystemControl from './UnitSystemControl';

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
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-3 sm:gap-4 sm:px-6">
        <NavbarLogo />

        <DesktopNavigation categoryGroups={categoryGroups} />

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <ShoppingListLink />

          {/* Desktop-only controls */}
          <div
            aria-label="Site controls"
            className="hidden items-center gap-2.5 lg:flex"
          >
            <ThemeToggle />
            <UnitSystemControl />
            <YouTubeButton />
          </div>

          {/* Mobile-only controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <MobileNavigation categoryGroups={categoryGroups} />
          </div>
        </div>
      </div>
    </header>
  );
}
