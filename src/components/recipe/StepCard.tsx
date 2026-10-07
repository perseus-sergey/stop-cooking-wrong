import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { celsiusToFahrenheit } from '@/lib/formatters/fahrenheitConverter';
import type { ICookingStep, TUnitSystem } from '@/types/recipe.type';
import { Lightbulb, RotateCw } from 'lucide-react';

type TStepCard = {
  step: ICookingStep;
  unitSystem: TUnitSystem;
};

export default function StepCard({ step, unitSystem }: TStepCard) {
  return (
    <Card className="overflow-hidden shadow-sm print:break-inside-avoid print:border-zinc-300 print:shadow-none">
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

          {(step.tempC || step.durationMinutes) && (
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {step.tempC && (
                <span className="rounded bg-orange-100 px-1.5 py-0.5 font-semibold text-orange-800 print:border print:bg-zinc-100 print:text-black">
                  {unitSystem === 'us'
                    ? `${celsiusToFahrenheit(step.tempC)}°F`
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
        <p className="text-zinc-700 dark:text-zinc-300 print:text-black">
          {step.instruction}
        </p>

        {step.isShakePoint && (
          <div className="inline-flex items-center gap-1 rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 print:border-zinc-400 print:bg-transparent print:text-black">
            <RotateCw className="h-3 w-3" />
            Shake basket
          </div>
        )}

        {step.tip && (
          <div className="flex items-start gap-1.5 rounded border border-zinc-100 bg-zinc-50 p-1.5 text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 print:border-zinc-300 print:bg-zinc-50 print:text-zinc-800">
            <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-amber-500 dark:text-amber-400" />
            <span>{step.tip}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
