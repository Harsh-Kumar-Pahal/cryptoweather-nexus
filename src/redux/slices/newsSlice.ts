import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "../../lib/news";

export const getNews = createAsyncThunk("news/fetch", async () => fetchNews());

const newsSlice = createSlice({
  name: "news",
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results.slice(0, 5);
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;

