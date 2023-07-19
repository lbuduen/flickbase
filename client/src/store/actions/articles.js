import { createAsyncThunk } from "@reduxjs/toolkit";
import { successGlobal, errorGlobal } from "../reducers/notifications";
import { getAuthHeader } from "../../utils/tools";

export const addArticle = createAsyncThunk(
  "articles/add",
  async (article, { dispatch }) => {
    try {
      const response = await fetch("/api/articles/", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...getAuthHeader(),
        },
        body: JSON.stringify(article),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      dispatch(successGlobal("Post created!"));
      return await response.json();
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);
