'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FullRecipe } from '@/types/recipe.type';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Printer, Eye } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface Props {
  recipe: FullRecipe;
}

type FontSize = 'sm' | 'base' | 'lg';

export default function PrintModal({ recipe }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [unitSystem, setUnitSystem] = useState<'us' | 'metric'>('us');
  const [fontSize, setFontSize] = useState<FontSize>('sm');

  const handlePrint = () => {
    window.print();
  };

  const fontStyles = {
    sm: {
      body: 'text-[10px] sm:text-[10px] leading-snug',
      heading: 'text-base sm:text-lg font-bold',
      subheading: 'text-xs sm:text-[11px] font-semibold',
      gap: 'space-y-1',
    },
    base: {
      body: 'text-xs sm:text-xs leading-normal',
      heading: 'text-lg sm:text-xl font-bold',
      subheading: 'text-xs sm:text-xs font-semibold',
      gap: 'space-y-1.5',
    },
    lg: {
      body: 'text-sm sm:text-sm leading-relaxed',
      heading: 'text-xl sm:text-2xl font-bold',
      subheading: 'text-sm sm:text-sm font-semibold',
      gap: 'space-y-2',
    },
  }[fontSize];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 print:hidden">
        <Printer className="h-4 w-4 text-zinc-500" />
        Print Recipe
      </DialogTrigger>

      {/* На мобільному займає майже весь екран (96vh), на десктопі - sm:max-w-4xl */}
      <DialogContent className="flex h-[96vh] w-full flex-col overflow-hidden p-0 sm:h-auto sm:max-h-[92vh] sm:max-w-4xl print:max-w-none print:border-none print:p-0 print:shadow-none">
        {/* ============================================================ */}
        {/* ПАНЕЛЬ КЕРУВАННЯ (Адаптивна під мобільні)                     */}
        {/* ============================================================ */}
        <div className="flex flex-col gap-2.5 border-b border-zinc-200 bg-zinc-50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4 dark:border-zinc-800 dark:bg-zinc-900 print:hidden">
          {/* Верхній рядок на мобільному: Назва + кнопка Print */}
          <div className="flex items-center justify-between pr-8 sm:pr-0">
            <DialogHeader className="p-0 text-left">
              <DialogTitle className="flex items-center gap-1.5 text-sm font-bold">
                <Eye className="h-4 w-4 text-orange-500" /> Print Setup
              </DialogTitle>
            </DialogHeader>

            {/* На мобільному кнопку Print виносимо сюди для швидкого тапу */}
            <div className="sm:hidden">
              <Button
                onClick={handlePrint}
                size="sm"
                className="h-7 gap-1 bg-orange-600 px-2.5 text-xs font-semibold text-white hover:bg-orange-700"
              >
                <Printer className="h-3 w-3" />
                Print
              </Button>
            </div>
          </div>

          {/* Панель опцій */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Вкл/Викл Фото */}
            <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2 py-1 select-none dark:border-zinc-700 dark:bg-zinc-800">
              <Checkbox
                checked={showImage}
                onCheckedChange={(c) => setShowImage(!!c)}
                className="h-3.5 w-3.5"
              />
              <span className="text-[11px] font-medium">Photo</span>
            </label>

            {/* Вкл/Викл Секрету */}
            <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2 py-1 select-none dark:border-zinc-700 dark:bg-zinc-800">
              <Checkbox
                checked={showTips}
                onCheckedChange={(c) => setShowTips(!!c)}
                className="h-3.5 w-3.5"
              />
              <span className="text-[11px] font-medium">Pro Secret</span>
            </label>

            {/* US / Metric */}
            <div className="flex items-center rounded-md border border-zinc-200 bg-zinc-200/80 p-0.5 dark:border-zinc-700 dark:bg-zinc-800">
              <button
                type="button"
                className={`rounded px-1.5 py-0.5 text-[11px] font-medium transition ${
                  unitSystem === 'us'
                    ? 'bg-white shadow-xs dark:bg-zinc-700 dark:text-white'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
                onClick={() => setUnitSystem('us')}
              >
                US
              </button>
              <button
                type="button"
                className={`rounded px-1.5 py-0.5 text-[11px] font-medium transition ${
                  unitSystem === 'metric'
                    ? 'bg-white shadow-xs dark:bg-zinc-700 dark:text-white'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
                onClick={() => setUnitSystem('metric')}
              >
                Metric
              </button>
            </div>

            {/* Розмір шрифту */}
            <div className="flex items-center rounded-md border border-zinc-200 bg-zinc-200/80 p-0.5 dark:border-zinc-700 dark:bg-zinc-800">
              {(['sm', 'base', 'lg'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`rounded px-1.5 py-0.5 text-[11px] font-medium capitalize transition ${
                    fontSize === size
                      ? 'bg-white font-semibold shadow-xs dark:bg-zinc-700 dark:text-white'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                  onClick={() => setFontSize(size)}
                >
                  {size === 'sm' ? 'S' : size === 'base' ? 'M' : 'L'}
                </button>
              ))}
            </div>

            {/* Десктопна кнопка Print Now */}
            <Button
              onClick={handlePrint}
              size="sm"
              className="hidden h-7 gap-1.5 bg-orange-600 px-3 text-xs font-semibold text-white hover:bg-orange-700 sm:inline-flex"
            >
              <Printer className="h-3.5 w-3.5" />
              Print Now
            </Button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ЖИВИЙ ПЕРЕГЛЯД: На мобільному економимо кожен міліметр!       */}
        {/* ============================================================ */}
        <div className="flex flex-1 justify-center overflow-y-auto bg-white p-0 sm:bg-zinc-100 sm:p-6 dark:bg-zinc-950 print:overflow-visible print:bg-white print:p-0">
          <div
            id="printable-card"
            className={`min-h-full w-full max-w-185 rounded-none border-0 bg-white p-4 pb-12 text-zinc-900 shadow-none sm:rounded-lg sm:border sm:border-zinc-200 sm:p-8 sm:shadow-xs print:w-full print:max-w-none print:border-none print:p-0 print:shadow-none ${fontStyles.body}`}
          >
            {/* Шапка з назвою */}
            <div className="mb-3 flex items-start justify-between gap-3 border-b-2 border-zinc-900 pb-3">
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-wider text-orange-600 uppercase sm:text-[10px]">
                  {siteConfig.name} • {siteConfig.brand.printBadge}
                </span>
                <h1 className={fontStyles.heading}>{recipe.title}</h1>
                <p className="text-[11px] text-zinc-600 italic sm:text-xs">
                  {recipe.description}
                </p>
              </div>

              {/* Фото */}
              {showImage && (
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md border border-zinc-300 sm:h-20 sm:w-28">
                  <Image
                    src={recipe.featuredImage}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Інфо-панель: на мобільному 2x2 сітка, на десктопі 4 в ряд */}
            <div className="mb-3 grid grid-cols-2 gap-1 divide-zinc-200 rounded border border-zinc-200 bg-zinc-50 p-1.5 text-center text-[10px] font-medium sm:grid-cols-4 sm:gap-0 sm:divide-x sm:text-[11px]">
              <div>
                <span className="text-zinc-500">Prep: </span>
                <strong>{recipe.prepTimeMinutes} mins</strong>
              </div>
              <div>
                <span className="text-zinc-500">Air Fry: </span>
                <strong>{recipe.cookTimeMinutes} mins</strong>
              </div>
              <div>
                <span className="text-zinc-500">Servings: </span>
                <strong>{recipe.servings}</strong>
              </div>
              <div>
                <span className="text-zinc-500">Calories: </span>
                <strong>{recipe.caloriesPerServing ?? 'N/A'} kcal</strong>
              </div>
            </div>

            {/* Секрет The Right Move */}
            {showTips && (
              <div className="mb-3 rounded-r border-l-4 border-orange-500 bg-orange-50/60 p-2 text-[10px] sm:p-2.5">
                <strong className="mb-0.5 block font-bold text-orange-950 uppercase">
                  💡 {siteConfig.brand.theRightMoveLabel}:
                </strong>
                <span className="text-zinc-800">{recipe.theRightMove}</span>
              </div>
            )}

            {/* ІНГРЕДІЄНТИ ТА КРОКИ:
                - На екрані смартфона: йдуть акуратно один під одним (flex-col)
                - На десктопі та на папері при друці (print): суворо у 2 колонки (sm:grid print:grid grid-cols-12)!
            */}
            <div className="flex flex-col items-start gap-4 sm:grid sm:grid-cols-12 sm:gap-5 print:grid print:grid-cols-12">
              {/* Колонка 1: Інгредієнти */}
              <div className="w-full border-zinc-200 sm:col-span-5 sm:border-r sm:pr-3 print:col-span-5 print:border-r print:pr-3">
                <h2
                  className={`${fontStyles.subheading} mb-1.5 border-b border-zinc-300 pb-1 tracking-wider uppercase`}
                >
                  Ingredients
                </h2>
                <ul className={fontStyles.gap}>
                  {recipe.ingredients.map((ing) => (
                    <li
                      key={ing.id}
                      className="flex items-start gap-1.5 leading-snug"
                    >
                      <span className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 rounded-sm border border-zinc-400" />
                      <span>
                        <strong>
                          {unitSystem === 'us'
                            ? ing.amountUS
                            : ing.amountMetric}
                        </strong>{' '}
                        {ing.name}
                        {ing.notes && (
                          <span className="block text-[9px] text-zinc-500">
                            ({ing.notes})
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Колонка 2: Кроки приготування */}
              <div className="w-full sm:col-span-7 print:col-span-7">
                <h2
                  className={`${fontStyles.subheading} mb-1.5 border-b border-zinc-300 pb-1 tracking-wider uppercase`}
                >
                  Instructions
                </h2>
                <ol className={fontStyles.gap}>
                  {recipe.steps.map((step) => (
                    <li key={step.stepNumber} className="leading-snug">
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="font-bold">
                          {step.stepNumber}. {step.title}
                        </span>
                        {step.tempF && (
                          <span className="rounded border border-zinc-200 bg-zinc-100 px-1 py-0.5 font-mono text-[9px] font-semibold">
                            {unitSystem === 'us'
                              ? `${step.tempF}°F`
                              : `${step.tempC}°C`}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-zinc-700">{step.instruction}</p>
                      {step.isShakePoint && (
                        <span className="mt-0.5 inline-block text-[9px] font-bold text-orange-700">
                          ↳ ⚠️ Shake basket thoroughly
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Копірайт знизу */}
            <div className="mt-4 flex justify-between border-t border-zinc-200 pt-2 text-[9px] text-zinc-400">
              <span>{siteConfig.links.youtube}</span>
              <span>{siteConfig.brand.printBadge}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
