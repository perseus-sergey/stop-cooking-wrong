import Link from 'next/link';
import { ChevronDown, Sparkles } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { capitalize } from '@/lib/utils';
import { CATEGORY_UI } from '@/config/categories.config';
import { ROUTES } from '@/config/site.config';
import { NavCategory } from '@/types/category.type';

type NavbarDesktopProps = {
  categoryGroups: Record<string, NavCategory[]>;
};

export default function DesktopNavigation({
  categoryGroups,
}: NavbarDesktopProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-2 text-sm font-medium text-zinc-600 lg:flex dark:text-zinc-300"
    >
      {Object.entries(categoryGroups).map(([type, group]) => {
        const groupLabel = capitalize(type);

        return (
          <DropdownMenu key={type}>
            <DropdownMenuTrigger
              openOnHover
              delay={100}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 transition-colors hover:bg-zinc-100 hover:text-orange-600 focus:outline-none dark:hover:bg-zinc-900 dark:hover:text-orange-400"
            >
              {groupLabel}

              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-48">
              {group.map((category) => {
                const ui =
                  CATEGORY_UI[category.slug as keyof typeof CATEGORY_UI];

                const Icon = ui?.icon ?? Sparkles;

                return (
                  <DropdownMenuItem
                    key={category.id}
                    render={<Link href={ROUTES.category(category.slug)} />}
                    className="cursor-pointer"
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />

                    <span>{category.name}</span>

                    <span className="ml-auto text-xs text-zinc-400">
                      {category._count.recipes}
                    </span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
}
