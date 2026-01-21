import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { getUserUUID } from "../../utils/user";

//Fetch Bookmarked Articles using createAsyncThunk middleware for asynchronous actions.
export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchBookmarks",

  //function to fetch bookmarks from the backend API.
  async (_, { rejectWithValue }) => {
    const user_uuid = getUserUUID();
    try {
      const res = await api.get(
        `/user/${user_uuid}/bookmark/`
      );
      return res.data; // array of articles
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//save bookmark
export const saveBookmark = createAsyncThunk(
  "bookmarks/saveBookmark",
  async (article, { rejectWithValue }) => {
    try {
      const user_uuid = getUserUUID();

      // map article → backend fields
      const payload = {
        article_id: article.article_id,
        article_title: article.article_title,
        description: article.description,
        weburl: article.weburl,
        article_image: article.article_image,
        sectionname: article.sectionname,
      };

      const res = await api.post(
        `/user/${user_uuid}/bookmark/`,
        payload
      );
      // Redux state gets the complete bookmark object with the uuid field needed for deletion.
      return res.data; // return backend response with uuid
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


//Delete bookmark
export const deleteBookmark = createAsyncThunk(
  "bookmarks/deleteBookmark",

  //function to delete a bookmark from the backend API and return the bookmark_uuid to update the state.
  async (bookmark_uuid, { rejectWithValue }) => {
    try {
      const user_uuid = getUserUUID();
      await api.delete(
        `/user/${user_uuid}/bookmark/${bookmark_uuid}/`
      );
      return bookmark_uuid;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//defining the bookmark slice to manage the state of bookmarks in the application.
const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  /*defining extra reducers to handle the different states of the bookmark async thunks and 
  builder to add cases for pending, fulfilled, and rejected states.
  */
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(saveBookmark.fulfilled, (state, action) => {
        const exists = state.items.some(
        (b) => b.article_id === action.payload.article_id
      );
      //only add if it doesn't already exist
      if (!exists) {
      state.items.push(action.payload);
      }
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (bookmark) => bookmark.uuid !== action.payload
        );
      });
  },
});

export default bookmarkSlice.reducer;
