import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../../lib/weather";

// Define the WeatherData type
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  name: string;
}

// Define the state type
interface WeatherState {
  data: { [city: string]: WeatherData };
  loading: boolean;
  error: string | null;
}

export const getWeather = createAsyncThunk(
  "weather/fetch",
  async (city: string) => fetchWeather(city)
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    loading: false,
    error: null,
  } as WeatherState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.meta.arg] = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weather";
      });
  },
});

export default weatherSlice.reducer;