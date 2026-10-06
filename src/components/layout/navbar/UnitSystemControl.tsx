'use client';

import UnitSystemToggle from '@/components/recipe/UnitSystemToggle';
import { selectUnitSystem } from '@/features/preferences/preferencesSelectors';
import { setUnitSystem } from '@/features/preferences/preferencesSlice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux';

export default function UnitSystemControl() {
  const dispatch = useAppDispatch();
  const unitSystem = useAppSelector(selectUnitSystem);

  return (
    <UnitSystemToggle
      value={unitSystem}
      onChange={(value) => {
        dispatch(setUnitSystem(value));
      }}
    />
  );
}
