import { createSlice } from "@reduxjs/toolkit";

/*   Slice to manage the state of the article reading panel.
It handles opening and closing the panel and storing the article data to be displayed.

 */
const initialState = {
  showPanel: false,
  articles: null,
};

//defining action creators and reducers for opening and closing the article panel.
const articlePanelSlice = createSlice({
  name: "articlePanel",
  initialState,
  reducers: {
    openArticlePanel: (state, action) => {
      state.showPanel = true;
      state.articles = action.payload;
    },
    closeArticlePanel: (state) => {
      state.showPanel = false;
      state.articles = null;
    },
  },
});

/*exporting the action creators and reducer for use in the application.
action creators are functions that create actions to be dispatched to the store.
*/
export const { openArticlePanel, closeArticlePanel } = articlePanelSlice.actions;
export default articlePanelSlice.reducer;
