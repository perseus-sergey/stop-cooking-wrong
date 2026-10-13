import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FavoriteState = {
  recipeIds: string[];
};

const initialState: FavoriteState = {
  recipeIds: [],
};

const favoritesSlice = createSlice({
  name: `favorites`,
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.recipeIds.includes(action.payload))
        state.recipeIds.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.recipeIds = state.recipeIds.filter((id) => action.payload !== id);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;
      const isFavorite = state.recipeIds.includes(recipeId);

      if (isFavorite)
        state.recipeIds = state.recipeIds.filter((id) => recipeId !== id);
      else state.recipeIds.push(recipeId);
    },
    hydrateFavorites: (_state, action: PayloadAction<string[]>) => {
      return { recipeIds: [...new Set(action.payload)] };
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, hydrateFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
