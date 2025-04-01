import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCrypto } from "../../lib/crypto";

export const getCrypto = createAsyncThunk("crypto/fetch", async () => fetchCrypto());

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch crypto data";
      });
  },
});

export default cryptoSlice.reducer;
