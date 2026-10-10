'use client';

import { ROUTES } from '@/config/site.config';
import { selectShoppingList } from '@/features/shoppingList/shoppingListSelectors';
import { useAppSelector } from '@/hooks/redux';
import { ShoppingBasket } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ShoppingListLink() {
  const categories = useAppSelector(selectShoppingList);

  const itemCount = categories.reduce(
    (total, category) => total + category.items.length,
    0
  );

  return (
    <Link
      href={ROUTES.shoppingList}
      aria-label={`Shopping list, ${itemCount} ${
        itemCount === 1 ? 'item' : 'items'
      }`}
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-lg',
        'transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900'
      )}
    >
      <span className="relative">
        <ShoppingBasket className="size-5" />

        {itemCount > 0 && (
          <span
            className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold"
            aria-hidden="true"
          >
            {itemCount}
          </span>
        )}
      </span>
    </Link>
  );
}
