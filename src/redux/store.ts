import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import cryptoReducer from "./slices/cryptoSlice";
import newsReducer from "./slices/newsSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(), // redux-thunk is included by default
});

export type RootState = ReturnType<typeof store.getState>;
// Use ThunkDispatch to handle async thunks
export type AppDispatch = typeof store.dispatch;