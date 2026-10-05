'use client';

import { useState } from 'react';
import type { TUnitSystem } from '@/types/recipe.type';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

import UnitSystemToggle from './UnitSystemToggle';
import StepCard from './StepCard';
import {
  formatIngredient,
  formatIngredientQuantity,
  FormatterUnit,
  toFormatterIngredient,
} from '@/lib/formatIngredient';
import { TGetRecipe } from '@/queries/recipes.query';
import { Button } from '@/components/ui/button';

interface Props {
  recipe: TGetRecipe;
  units: FormatterUnit[];
}

export default function RecipeInteractiveView({ recipe, units }: Props) {
  const [unitSystem, setUnitSystem] = useState<TUnitSystem>('us');
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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

            <UnitSystemToggle
              value={unitSystem}
              onChange={setUnitSystem}
              className="print:hidden"
            />
          </CardHeader>
          <Separator className="print:hidden" />
          <CardContent className="space-y-2 pt-4 print:space-y-1.5 print:p-2 print:pt-1">
            {recipe.ingredients.map((ing) => {
              const formatted = formatIngredient(toFormatterIngredient(ing), {
                unitSystem,
                units,
              });

              return (
                <div
                  key={ing.id}
                  className="flex items-start gap-2.5 text-sm leading-tight print:text-xs"
                >
                  <div className="mt-0.5 hidden h-3 w-3 shrink-0 rounded-sm border border-zinc-400 print:block" />

                  <Checkbox
                    id={`ingredient-${ing.id}`}
                    checked={checkedIngredients.includes(ing.id)}
                    onCheckedChange={() => toggleIngredient(ing.id)}
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
            <Button
              type="button"
              className="cursor-pointer"
              disabled={checkedIngredients.length === 0}
              onClick={() => {
                console.log('Selected ingredients:', checkedIngredients);
              }}
            >
              {checkedIngredients.length === 0
                ? 'Select ingredients'
                : `Add ${checkedIngredients.length} ingredient${
                    checkedIngredients.length === 1 ? '' : 's'
                  } to shopping list`}
            </Button>
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
              unitSystem={unitSystem}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
