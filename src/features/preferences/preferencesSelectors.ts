import type { RootState } from '@/app/store';

export const selectUnitSystem = (state: RootState) =>
  state.preferences.unitSystem;
