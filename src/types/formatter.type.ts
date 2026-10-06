import { UnitSystem, UnitCategory } from '@prisma/client';
import { TUnitSystem } from './recipe.type';

export type TFormatterUnit = {
  id: string;
  code: string;
  name: string;
  symbol: string;

  system: UnitSystem;
  category: UnitCategory;

  baseUnitId: string | null;
  conversionFactor: number | string | null;
};

export type TFormatIngredientOptions = {
  unitSystem: TUnitSystem;
  units: TFormatterUnit[];
};

export type TConvertedQuantity = {
  amount: number | null;
  amountMax: number | null;
  unit: TFormatterUnit;
};
