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

export const updateArticle = createAsyncThunk(
  "articles/update",
  async ({_id, article}, { dispatch }) => {
    try {
      const response = await fetch(`/api/articles/article/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...getAuthHeader(),
        },
        body: JSON.stringify(article),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      dispatch(successGlobal("Post updated!"));
      return await response.json();
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);

export const getArticleById = createAsyncThunk(
  "articles/getArticleById",
  async (_id, { dispatch }) => {
    try {
      const response = await fetch(`/api/articles/article/${_id}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...getAuthHeader(),
        },
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return await response.json();
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);
