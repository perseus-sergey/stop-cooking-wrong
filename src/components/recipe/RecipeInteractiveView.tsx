'use client';

// import { useState } from 'react';
// import type { TUnitSystem } from '@/types/recipe.type';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

import StepCard from './StepCard';
import {
  formatIngredient,
  formatIngredientQuantity,
  toFormatterIngredient,
} from '@/lib/formatters/formatIngredient';
import { TGetRecipe, TRecipeIngredient } from '@/queries/recipes.query';
import { buttonVariants } from '@/components/ui/button';
import {
  addIngredient,
  removeIngredient,
} from '@/features/shoppingList/shoppingListSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Link from 'next/link';
import { ROUTES } from '@/config/site.config';
import { selectUnitSystem } from '@/features/preferences/preferencesSelectors';
import type { TFormatterUnit } from '@/types/formatter.type';
import { useHydrated } from '@/hooks/useHydrated';
import type { TUnitSystem } from '@/types/recipe.type';
// import { Skeleton } from '../ui/skeleton';

interface Props {
  recipe: TGetRecipe;
  units: TFormatterUnit[];
}

export default function RecipeInteractiveView({ recipe, units }: Props) {
  const hydrated = useHydrated();

  const unitSystem = useAppSelector(selectUnitSystem);
  const dispatch = useAppDispatch();

  const selectedIngredients = useAppSelector(
    (state) => state.shoppingList.selectedIngredients
  );

  const displayUnitSystem: TUnitSystem = hydrated ? unitSystem : 'us';

  // if (!hydrated) {
  //   return <RecipeInteractiveSkeleton />;
  // }

  const handleIngredientSelectionChange = (
    ingredient: TRecipeIngredient,
    checked: boolean
  ) => {
    if (checked) {
      dispatch(
        addIngredient({
          recipeId: recipe.id,
          recipeSlug: recipe.slug,
          recipeTitle: recipe.title,

          ingredientId: ingredient.id,

          productId: ingredient.product.id,
          productName: ingredient.product.name,

          categoryId: ingredient.product.shoppingCategory.id,
          categoryName: ingredient.product.shoppingCategory.name,

          quantity: {
            amount:
              ingredient.amount == null ? null : Number(ingredient.amount),

            amountMax:
              ingredient.amountMax == null
                ? null
                : Number(ingredient.amountMax),

            unitId: ingredient.unit.id,
            unitCode: ingredient.unit.code,
            unitSymbol: ingredient.unit.symbol,
            unitName: ingredient.unit.name,
            unitCategory: ingredient.unit.category,
          },
        })
      );

      return;
    }

    dispatch(
      removeIngredient({
        recipeId: recipe.id,
        ingredientId: ingredient.id,
      })
    );
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 print:grid-cols-12 print:gap-4">
      {/* Ліва колонка: Інгредієнти */}
      <div className="space-y-4 lg:sticky lg:top-6 lg:col-span-5 print:col-span-5 print:break-inside-avoid print:space-y-2">
        <Card className="shadow-sm print:border-zinc-300 print:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 print:p-2 print:pb-1.5">
            <CardTitle className="text-xl font-bold print:text-base">
              Ingredients
            </CardTitle>

            {/* <UnitSystemToggle
              value={unitSystem}
              onChange={setUnitSystem}
              className="print:hidden"
            /> */}
          </CardHeader>
          <Separator className="print:hidden" />
          <CardContent className="space-y-2 pt-4 print:space-y-1.5 print:p-2 print:pt-1">
            {recipe.ingredients.map((ing) => {
              const formatted = formatIngredient(toFormatterIngredient(ing), {
                unitSystem: displayUnitSystem,
                units,
              });

              const isSelected =
                hydrated &&
                selectedIngredients.some(
                  (item) =>
                    item.recipeId === recipe.id && item.ingredientId === ing.id
                );

              return (
                <div
                  key={ing.id}
                  className="flex items-start gap-2.5 text-sm leading-tight print:text-xs"
                >
                  <div className="mt-0.5 hidden h-3 w-3 shrink-0 rounded-sm border border-zinc-400 print:block" />

                  <Checkbox
                    id={`ingredient-${ing.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleIngredientSelectionChange(ing, checked === true)
                    }
                    className="mt-0.5 print:hidden"
                    aria-label={`Add ${formatted.productName} to shopping list`}
                  />

                  <label
                    htmlFor={`ingredient-${ing.id}`}
                    className="cursor-pointer"
                  >
                    <div>
                      <span className="mr-2 font-semibold text-orange-600 print:text-black">
                        {formatIngredientQuantity(formatted)}
                      </span>

                      <span>{formatted.productName}</span>
                    </div>

                    {formatted.notes && (
                      <span className="block pl-0 text-xs text-zinc-500 print:text-[10px]">
                        {formatted.notes}
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </CardContent>

          <CardFooter>
            {hydrated && selectedIngredients.length > 0 && (
              <Link
                href={ROUTES.shoppingList}
                className={buttonVariants({ className: 'm-auto' })}
              >
                Go to shopping list
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Права колонка: Кроки */}
      <section className="space-y-4 lg:col-span-7 print:col-span-7 print:space-y-2">
        <h2 className="text-2xl font-bold tracking-tight print:text-base">
          Instructions
        </h2>

        <div className="space-y-4 print:space-y-2">
          {recipe.steps.map((step) => (
            <StepCard
              key={step.stepNumber}
              step={step}
              unitSystem={displayUnitSystem}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

// function RecipeInteractiveSkeleton() {
//   return (
//     <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-6 w-40" />
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {[...Array(10)].map((_, i) => (
//             <Skeleton key={i} className="h-10 w-full" />
//           ))}
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <Skeleton className="h-6 w-32" />
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {[...Array(10)].map((_, i) => (
//             <Skeleton key={i} className="h-10 w-full" />
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
