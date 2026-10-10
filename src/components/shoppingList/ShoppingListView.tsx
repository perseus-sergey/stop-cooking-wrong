'use client';

import Link from 'next/link';

import { ArrowLeft, ShoppingBasket } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  selectCheckedProductIds,
  selectShoppingList,
} from '@/features/shoppingList/shoppingListSelectors';
import ShoppingListCategory from './ShoppingListCategory';
import { ROUTES } from '@/config/site.config';
import type { TFormatterUnit } from '@/types/formatter.type';
import { selectUnitSystem } from '@/features/preferences/preferencesSelectors';
import { useMemo } from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { clearShoppingList } from '@/features/shoppingList/shoppingListSlice';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatShoppingQuantity } from '@/lib/formatters/formatShoppingQuantity';

type Props = {
  units: TFormatterUnit[];
};

export default function ShoppingListView({ units }: Props) {
  const hydrated = useHydrated();
  const dispatch = useAppDispatch();

  const unitSystem = useAppSelector(selectUnitSystem);
  const categories = useAppSelector(selectShoppingList);
  const checkedProductIds = useAppSelector(selectCheckedProductIds);

  const itemCount = categories.reduce(
    (total, category) => total + category.items.length,
    0
  );

  const unitsById = useMemo(
    () => new Map(units.map((unit) => [unit.id, unit])),
    [units]
  );

  if (!hydrated) {
    return null;
  }

  const handleClearShoppingList = () => {
    dispatch(clearShoppingList());
  };

  const products = categories.flatMap((category) => category.items);

  const checkedCount = products.filter((item) =>
    checkedProductIds.includes(item.productId)
  ).length;

  const progress =
    itemCount === 0 ? 0 : Math.round((checkedCount / itemCount) * 100);

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
            {categories.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Clear shopping list
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear shopping list?</AlertDialogTitle>

                    <AlertDialogDescription>
                      This will remove all ingredients from your shopping list.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={handleClearShoppingList}>
                      Clear shopping list
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </header>

        <section
          aria-labelledby="shopping-overview-title"
          className="bg-card mb-8 rounded-2xl border p-4 sm:p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="shopping-overview-title"
                className="text-lg font-semibold"
              >
                Quick overview
              </h2>

              <p className="text-muted-foreground mt-1 text-sm">
                {checkedCount} of {itemCount} products purchased
              </p>
            </div>

            <span className="text-sm font-semibold text-orange-700 tabular-nums dark:text-orange-400">
              {progress}%
            </span>
          </div>

          <div
            className="bg-muted mt-3 h-2 overflow-hidden rounded-full"
            role="progressbar"
            aria-label="Shopping progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-orange-600 transition-[width] dark:bg-orange-400"
              style={{ width: `${progress}%` }}
            />
          </div>

          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {products.map((item) => {
              const isChecked = checkedProductIds.includes(item.productId);

              const total = item.totals
                .map((quantity) =>
                  formatShoppingQuantity(quantity, {
                    unitSystem,
                    units,
                    unitsById,
                  })
                )
                .join(' + ');

              return (
                <li
                  key={item.productId}
                  className="flex min-w-0 items-baseline justify-between gap-3 text-sm"
                >
                  <span
                    className={`min-w-0 truncate ${
                      isChecked ? 'text-muted-foreground line-through' : ''
                    }`}
                  >
                    {item.productName}
                  </span>

                  <span
                    className={`shrink-0 text-right tabular-nums ${
                      isChecked
                        ? 'text-muted-foreground line-through'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {total}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="space-y-8"></div>

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
