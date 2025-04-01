import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cities: [] as string[],
    cryptos: [] as string[],
  },
  reducers: {
    addFavoriteCity: (state, action: { payload: string }) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeFavoriteCity: (state, action: { payload: string }) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
    },
    addFavoriteCrypto: (state, action: { payload: string }) => {
      if (!state.cryptos.includes(action.payload)) {
        state.cryptos.push(action.payload);
      }
    },
    removeFavoriteCrypto: (state, action: { payload: string }) => {
      state.cryptos = state.cryptos.filter((crypto) => crypto !== action.payload);
    },
  },
});

export const { addFavoriteCity, removeFavoriteCity, addFavoriteCrypto, removeFavoriteCrypto } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;