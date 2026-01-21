import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "../features/bookmarks/BookmarkSlice.jsx";
import articlesReducer from "../components/articles/articleSlice.jsx";
import articlePanelReducer from "../components/articles/articleReaderSlice.jsx";

//configures the redux store to manage the state of bookmarks, articles, and the article panel.

export const store = configureStore({

  //reducers helps to manage different slices of the application state.
  reducer: {
    bookmarks: bookmarksReducer,
    articles: articlesReducer,
    articlePanel: articlePanelReducer,
  },
});
