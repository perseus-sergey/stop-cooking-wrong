import { TUnitSystem } from '@/types/recipe.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type PreferencesState = {
  unitSystem: TUnitSystem;
};

const initialState: PreferencesState = {
  unitSystem: 'us',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setUnitSystem: (state, action: PayloadAction<TUnitSystem>) => {
      state.unitSystem = action.payload;
    },
  },
});

export const { setUnitSystem } = preferencesSlice.actions;

export default preferencesSlice.reducer;
