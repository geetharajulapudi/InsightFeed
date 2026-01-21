import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//Fetch Home page Articles using createAsyncThunk middlware for asynchronous actions.
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",

  //function to fetch articles from the backend API, optionally with a search query.
  async (query = '', { rejectWithValue }) => {
    try {

      //encodeURIComponent ensures that special characters in the query are properly handled.
      const url = query ? `/api/articles/?q=${encodeURIComponent(query)}` : "/api/articles/";
      const res = await api.get(url);

      //returns articles along with search metadata to backend.
      return { articles: res.data, isSearch: !!query, searchQuery: query };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//defining the article slice to manage the state of articles in the application.
const articleSlice = createSlice({
  name: "articles",
  initialState: {
    items: [],
    loading: false,
    error: null,
    isSearchResults: false,
    searchQuery: '',
  },

  //reducers to handle synchronous actions related to articles.
  reducers: {
    clearSearch: (state) => {
      state.isSearchResults = false;
      state.searchQuery = '';
    },
  },

  /*defining extra reducers to handle the different states of the fetchArticles async thunk.
  builder allows for adding cases for pending, fulfilled, and rejected states.

  */
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {

        //updates the state with fetched articles and search metadata.
        state.loading = false;
        state.items = action.payload.articles;
        state.isSearchResults = action.payload.isSearch;
        state.searchQuery = action.payload.searchQuery || '';
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//exporting the action creators and reducer for use in the application.               
export const { clearSearch } = articleSlice.actions;
export default articleSlice.reducer;
