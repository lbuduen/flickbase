import { createSlice } from "@reduxjs/toolkit";

import {
  addArticle,
  getPaginateArticles,
  changeArticleStatus,
  getHomeArticles,
  getGuestArticleById,
} from "../actions/articles";

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
        const pos = state.adminArticles.docs.findIndex(
          article => article._id === action.payload._id
        );
        state.adminArticles.docs[pos] = action.payload;
      })
      /// GET HOME ARTICLES
      .addCase(getHomeArticles.pending, state => {
        state.loading = true;
      })
      .addCase(getHomeArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = [...state.articles, ...action.payload.articles];
        state.homeSort.skip = action.payload.sort.skip;
      })
      .addCase(getHomeArticles.rejected, state => {
        state.loading = false;
      })
      /// GET GUEST ARTICLE
      .addCase(getGuestArticleById.pending, state => {
        state.loading = true;
      })
      .addCase(getGuestArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getGuestArticleById.rejected, state => {
        state.loading = false;
      });
  },
});

export default articlesSlice.reducer;
