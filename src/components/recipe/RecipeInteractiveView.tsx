'use client';

import { useState } from 'react';
import { Recipe } from '@/types/recipe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { siteConfig } from '@/config/site';

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
    <div className="space-y-10 print:space-y-4">
      {/* 1. Швидка статистика (компактна на друці) */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900 print:border-zinc-300 print:bg-transparent print:p-2">
        <div className="flex items-center gap-3 print:gap-1.5">
          <Clock className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
              Prep
            </p>
            <p className="text-sm font-semibold print:text-xs">
              {recipe.prepTimeMinutes} mins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 print:gap-1.5">
          <Flame className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
              Air Fry
            </p>
            <p className="text-sm font-semibold print:text-xs">
              {recipe.cookTimeMinutes} mins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 print:gap-1.5">
          <Users className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
              Servings
            </p>
            <p className="text-sm font-semibold print:text-xs">
              {recipe.servings} people
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 print:gap-1.5">
          <Sparkles className="h-5 w-5 text-orange-500 print:h-4 print:w-4" />
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase print:text-[10px]">
              Calories
            </p>
            <p className="text-sm font-semibold print:text-xs">
              {recipe.caloriesPerServing ?? 'N/A'} kcal
            </p>
          </div>
        </div>
      </div>

      {/* 2. Stop Cooking Wrong (на друці компактна рамка) */}
      <Card className="overflow-hidden border-orange-500/30 bg-orange-50/40 shadow-sm dark:bg-orange-950/20 print:break-inside-avoid print:border-zinc-300 print:bg-zinc-50 print:shadow-none">
        <div className="flex items-center gap-1.5 bg-orange-500 px-4 py-1.5 text-xs font-medium tracking-wider text-white uppercase print:bg-zinc-800 print:py-1 print:text-[10px]">
          <Sparkles className="h-4 w-4" /> {siteConfig.brand.secretBadge}
        </div>
        <CardContent className="grid gap-3 p-4 text-xs leading-relaxed sm:grid-cols-2 print:p-2.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
              <XCircle className="h-4 w-4" />
              <span>{siteConfig.brand.commonMistakeLabel}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 print:text-zinc-700">
              {recipe.mistakeToAvoid}
            </p>
          </div>

          <div className="space-y-1 sm:border-l sm:border-orange-200 sm:pl-3 dark:sm:border-orange-900/40 print:border-zinc-300">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>{siteConfig.brand.theRightMoveLabel}</span>
            </div>
            <p className="font-medium text-zinc-800 dark:text-zinc-100 print:text-black">
              {recipe.theRightMove}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Двоколонковий макет для друку (Інгредієнти зліва, Кроки справа) */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 print:grid-cols-12 print:gap-4">
        {/* Ліва колонка: Інгредієнти */}
        <div className="space-y-4 lg:sticky lg:top-6 lg:col-span-5 print:col-span-5 print:break-inside-avoid print:space-y-2">
          <Card className="shadow-sm print:border-zinc-300 print:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 print:p-2 print:pb-1.5">
              <CardTitle className="text-xl font-bold print:text-base">
                Ingredients
              </CardTitle>

              {/* Ховаємо перемикач на друці */}
              <div className="flex items-center rounded-lg bg-zinc-100 p-1 print:hidden">
                <Button
                  size="sm"
                  variant={unitSystem === 'us' ? 'default' : 'ghost'}
                  className="h-7 px-2 text-xs"
                  onClick={() => setUnitSystem('us')}
                >
                  US
                </Button>
                <Button
                  size="sm"
                  variant={unitSystem === 'metric' ? 'default' : 'ghost'}
                  className="h-7 px-2 text-xs"
                  onClick={() => setUnitSystem('metric')}
                >
                  Metric
                </Button>
              </div>
            </CardHeader>
            <Separator className="print:hidden" />
            <CardContent className="space-y-2 pt-4 print:space-y-1.5 print:p-2 print:pt-1">
              {recipe.ingredients.map((ing) => (
                <div
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className="flex cursor-pointer items-start gap-2.5 text-sm leading-tight print:text-xs"
                >
                  {/* Квадратик для відмітки ручкою на папері */}
                  <div className="mt-0.5 hidden h-3 w-3 shrink-0 rounded-sm border border-zinc-400 print:block" />
                  <Checkbox
                    checked={checkedIngredients.includes(ing.id)}
                    className="mt-0.5 print:hidden"
                  />

                  <div>
                    <span className="mr-1 font-semibold text-orange-600 print:text-black">
                      {unitSystem === 'us' ? ing.amountUS : ing.amountMetric}
                    </span>
                    <span>{ing.name}</span>
                    {ing.notes && (
                      <span className="block text-xs text-zinc-500 print:text-[10px]">
                        ({ing.notes})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Права колонка: Кроки */}
        <div className="space-y-4 lg:col-span-7 print:col-span-7 print:space-y-2">
          <h2 className="text-2xl font-bold tracking-tight print:text-base">
            Instructions
          </h2>

          <div className="space-y-4 print:space-y-2">
            {recipe.steps.map((step) => (
              <Card
                key={step.stepNumber}
                className="overflow-hidden shadow-sm print:break-inside-avoid print:border-zinc-300 print:shadow-none"
              >
                <CardHeader className="pb-1.5 print:p-2 print:pb-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                        {step.stepNumber}
                      </span>
                      <h3 className="text-sm font-semibold print:text-xs">
                        {step.title}
                      </h3>
                    </div>

                    {(step.tempF || step.durationMinutes) && (
                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        {step.tempF && (
                          <span className="rounded bg-orange-100 px-1.5 py-0.5 font-semibold text-orange-800 print:border print:bg-zinc-100 print:text-black">
                            {unitSystem === 'us'
                              ? `${step.tempF}°F`
                              : `${step.tempC}°C`}
                          </span>
                        )}
                        {step.durationMinutes && (
                          <span className="rounded border border-zinc-200 px-1.5 py-0.5">
                            {step.durationMinutes}m
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-1.5 pt-1 text-xs leading-relaxed print:p-2 print:pt-1 print:text-[11px]">
                  <p className="text-zinc-700 print:text-black">
                    {step.instruction}
                  </p>

                  {step.isShakePoint && (
                    <div className="inline-flex items-center gap-1 rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 print:border-zinc-400 print:bg-transparent print:text-black">
                      <RotateCw className="h-3 w-3" /> Shake basket
                    </div>
                  )}

                  {step.tip && (
                    <div className="flex items-start gap-1.5 rounded border border-zinc-100 bg-zinc-50 p-1.5 text-[10px] text-zinc-600 print:border-zinc-300 print:bg-zinc-50 print:text-zinc-800">
                      <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
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
