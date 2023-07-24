/* eslint-disable no-useless-catch */
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
  async ({ _id, article }, { dispatch }) => {
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
      dispatch(successGlobal("Article updated!"));
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

export const getPaginateArticles = createAsyncThunk(
  "articles/getPaginateArticles",
  async ({ page = 1, limit = 4, keywords = "" }) => {
    try {
      const response = await fetch("/api/articles/admin/paginate", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ page, limit, keywords }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (_id, { dispatch, getState }) => {
    try {
      const response = await fetch(`/api/articles/article/${_id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const page = getState().articles.adminArticles.page;
      dispatch(getPaginateArticles({ page }));
      dispatch(successGlobal("Post deleted!"));
      return true;
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);

export const changeArticleStatus = createAsyncThunk(
  "articles/changeStatus",
  async ({ _id, newStatus }, { dispatch, getState }) => {
    try {
      const response = await fetch(`/api/articles/article/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      dispatch(successGlobal("Status changed!"));
      return await response.json();
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);

export const getHomeArticles = createAsyncThunk(
  "articles/getHomeArticles",
  async (sort) => {
    try {
      const response = await fetch("/api/articles/more", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(sort),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return {articles: await response.json(), sort};
    } catch (error) {
      throw error;
    }
  }
);

export const getGuestArticleById = createAsyncThunk(
  "articles/getGuestArticleById",
  async (_id, { dispatch }) => {
    try {
      const response = await fetch(`/api/articles/guest/${_id}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
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