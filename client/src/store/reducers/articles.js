import { createSlice } from "@reduxjs/toolkit";

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
});

export default articlesSlice.reducer;
