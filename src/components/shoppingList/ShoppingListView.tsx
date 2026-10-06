'use client';

import Link from 'next/link';

import { ArrowLeft, ShoppingBasket } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

import { useAppSelector } from '@/src/hooks/redux';
import { selectShoppingList } from '@/features/shoppingList/shoppingListSelectors';
import ShoppingListCategory from './ShoppingListCategory';
import { ROUTES } from '@/config/site.config';
import { TFormatterUnit } from '@/types/formatter.type';
import { selectUnitSystem } from '@/features/preferences/preferencesSelectors';
import { useMemo } from 'react';

type Props = {
  units: TFormatterUnit[];
};

export default function ShoppingListView({ units }: Props) {
  const unitSystem = useAppSelector(selectUnitSystem);
  const categories = useAppSelector(selectShoppingList);

  const itemCount = categories.reduce(
    (total, category) => total + category.items.length,
    0
  );

  const unitsById = useMemo(
    () => new Map(units.map((unit) => [unit.id, unit])),
    [units]
  );

  if (categories.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="bg-card mx-auto flex max-w-xl flex-col items-center rounded-2xl border px-6 py-14 text-center shadow-sm">
          <div className="bg-muted mb-5 flex size-14 items-center justify-center rounded-full">
            <ShoppingBasket className="text-muted-foreground size-7" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Your shopping list is empty
          </h1>

          <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
            Select ingredients from a recipe and they will appear here
            automatically.
          </p>

          <Link
            href={ROUTES.home}
            className={buttonVariants({ className: 'mt-6' })}
          >
            Browse recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <Link
            href={ROUTES.home}
            className={buttonVariants({
              variant: 'ghost',
              className: 'mb-4 -ml-2',
              size: 'sm',
            })}
          >
            <ArrowLeft />
            Recipes
          </Link>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Shopping List
              </h1>

              <p className="text-muted-foreground mt-1 text-sm">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {categories.map((category) => (
            <ShoppingListCategory
              key={category.categoryId}
              category={category}
              unitSystem={unitSystem}
              units={units}
              unitsById={unitsById}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
