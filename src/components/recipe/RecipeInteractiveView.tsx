'use client';

import { useState } from 'react';
import { Recipe } from '@/types/recipe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  Flame,
  Users,
  RotateCw,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';

interface Props {
  recipe: Recipe;
}

export default function RecipeInteractiveView({ recipe }: Props) {
  const [unitSystem, setUnitSystem] = useState<'us' | 'metric'>('us');
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-10">
      {/* Швидка статистика */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Prep Time
            </p>
            <p className="text-sm font-semibold">
              {recipe.prepTimeMinutes} mins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Flame className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Air Fry Time
            </p>
            <p className="text-sm font-semibold">
              {recipe.cookTimeMinutes} mins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Servings
            </p>
            <p className="text-sm font-semibold">{recipe.servings} people</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Calories
            </p>
            <p className="text-sm font-semibold">
              {recipe.caloriesPerServing ?? 'N/A'} kcal
            </p>
          </div>
        </div>
      </div>

      {/* Блок каналу "Stop Cooking Wrong" */}
      <Card className="overflow-hidden border-orange-500/30 bg-orange-50/40 shadow-sm dark:bg-orange-950/20">
        <div className="flex items-center gap-1.5 bg-orange-500 px-4 py-2 text-xs font-medium tracking-wider text-white uppercase">
          <Sparkles className="h-4 w-4" /> Stop Cooking Wrong: Pro Secret
        </div>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
              <XCircle className="h-4 w-4" />
              <span>Common Mistake</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {recipe.mistakeToAvoid}
            </p>
          </div>

          <div className="space-y-1.5 sm:border-l sm:border-orange-200 sm:pl-4 dark:sm:border-orange-900/50">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>The Right Move</span>
            </div>
            <p className="text-sm leading-relaxed font-medium text-zinc-800 dark:text-zinc-100">
              {recipe.theRightMove}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Інгредієнти та Кроки */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Ліва колонка: Інгредієнти */}
        <div className="space-y-4 lg:sticky lg:top-6 lg:col-span-5">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xl font-bold">Ingredients</CardTitle>

              {/* Тогл систем мір */}
              <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
                <Button
                  size="sm"
                  type="button"
                  variant={unitSystem === 'us' ? 'default' : 'ghost'}
                  className="h-7 px-2.5 text-xs font-medium"
                  onClick={() => setUnitSystem('us')}
                >
                  US Standard
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant={unitSystem === 'metric' ? 'default' : 'ghost'}
                  className="h-7 px-2.5 text-xs font-medium"
                  onClick={() => setUnitSystem('metric')}
                >
                  Metric
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-3 pt-4">
              {recipe.ingredients.map((ing) => {
                const isChecked = checkedIngredients.includes(ing.id);
                return (
                  <div
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    className="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors select-none hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <Checkbox checked={isChecked} className="mt-0.5" />
                    <div className="flex-1 text-sm leading-snug">
                      <span
                        className={
                          isChecked
                            ? 'text-zinc-400 line-through dark:text-zinc-500'
                            : 'text-zinc-900 dark:text-zinc-100'
                        }
                      >
                        <strong className="mr-1.5 font-semibold text-orange-600 dark:text-orange-400">
                          {unitSystem === 'us'
                            ? ing.amountUS
                            : ing.amountMetric}
                        </strong>
                        {ing.name}
                      </span>
                      {ing.notes && (
                        <span className="mt-0.5 block text-xs text-zinc-500">
                          ({ing.notes})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Права колонка: Кроки приготування */}
        <div className="space-y-6 lg:col-span-7">
          <h2 className="text-2xl font-bold tracking-tight">
            Step-by-Step Instructions
          </h2>

          <div className="space-y-6">
            {recipe.steps.map((step) => (
              <Card
                key={step.stepNumber}
                className="relative overflow-hidden shadow-sm"
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {step.stepNumber}
                      </span>
                      <h3 className="text-base font-semibold">{step.title}</h3>
                    </div>

                    {(step.tempF || step.durationMinutes) && (
                      <div className="flex items-center gap-1.5">
                        {step.tempF && (
                          <Badge
                            variant="secondary"
                            className="border-none bg-orange-100 font-mono text-xs text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"
                          >
                            {unitSystem === 'us'
                              ? `${step.tempF}°F`
                              : `${step.tempC}°C`}
                          </Badge>
                        )}
                        {step.durationMinutes && (
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {step.durationMinutes} min
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-1">
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {step.instruction}
                  </p>

                  {step.isShakePoint && (
                    <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                      <RotateCw className="h-3.5 w-3.5" />
                      Shake the basket thoroughly
                    </div>
                  )}

                  {step.tip && (
                    <div className="flex items-start gap-2 rounded-lg border border-zinc-100 bg-zinc-50 p-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
