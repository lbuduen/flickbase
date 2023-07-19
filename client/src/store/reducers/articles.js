import { createSlice } from "@reduxjs/toolkit";

import { addArticle } from "../actions/articles";

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
  extraReducers: (builder) => {
    builder
    .addCase(addArticle.pending, (state) => {
      state.loading = true;
    })
    .addCase(addArticle.fulfilled, (state, action) => {
      state.loading = false;
      // state.articles.push(action.payload);
      // state.current = action.payload; 
      state.lastAdded = action.payload; 
    })
    .addCase(addArticle.rejected, (state) => {
      state.loading = false;
    })
  },
});

export default articlesSlice.reducer;
