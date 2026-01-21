import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const searchArticles = createAsyncThunk(
  "articles/search",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/articles/?q=${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const SearchArticleSlice = createSlice({
  name: "articles",
  initialState: {
    items: [],
    loading: false,
    error: null,
    isSearchMode: false, // 👈 important
  },
  reducers: {
    clearSearch(state) {
      state.isSearchMode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
        state.isSearchMode = true;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearch } = SearchArticleSlice.actions;
export default SearchArticleSlice.reducer;
