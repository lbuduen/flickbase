import { createSlice } from "@reduxjs/toolkit";

import { addArticle, getPaginateArticles, changeArticleStatus } from "../actions/articles";

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    homeSort: {
      sortby: "_id",
      order: "desc",
      limit: 4,
      skip: 0,
    },
    loading: false,
    articles: [],
    current: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      /// ADD ARTICLES
      .addCase(addArticle.pending, state => {
        state.loading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.loading = false;
        // state.articles.push(action.payload);
        // state.current = action.payload;
        state.lastAdded = action.payload;
      })
      .addCase(addArticle.rejected, state => {
        state.loading = false;
      })
      /// PAGINATE
      .addCase(getPaginateArticles.pending, state => {
        state.loading = true;
      })
      .addCase(getPaginateArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.adminArticles = action.payload;
      })
      .addCase(getPaginateArticles.rejected, state => {
        state.loading = false;
      })
      /// CHANGE STATUS
      .addCase(changeArticleStatus.fulfilled, (state, action) => {
        const pos = state.adminArticles.docs.findIndex(article => article._id === action.payload._id);
        state.adminArticles.docs[pos] = action.payload;
      });
  },
});

export default articlesSlice.reducer;
