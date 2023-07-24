/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { successGlobal, errorGlobal } from "../reducers/notifications";
import { getAuthHeader } from "../../utils/tools";

export const authUser = createAsyncThunk(
  "users/authUser",
  async ({ values, register }, { dispatch }) => {
    try {
      const URL = register ? "/api/auth/register" : "/api/auth/signin";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const { user } = await response.json();
      const welcomeMsg = register
        ? "Welcome onboard, please check your email to confirm your account!"
        : `Hey ${user.email}, welcome back!`;
      dispatch(successGlobal(welcomeMsg));
      return { data: user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);

export const isAuth = createAsyncThunk("users/isAuth", async () => {
  try {
    const response = await fetch("/api/auth/isauth", {
      headers: getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error("Error checking user auth");
    }
    const user = await response.json();
    return { data: user, auth: true };
  } catch (error) {
    return { data: {}, auth: false };
  }
});

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (data, { dispatch }) => {
    try {
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error updating user profile");
      }
      const user = await response.json();
      dispatch(successGlobal("Profile updated!"));
      return user;
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);

export const updateUserEmail = createAsyncThunk(
  "users/updateUserEmail",
  async (data, { dispatch }) => {
    try {
      const response = await fetch("/api/users/email", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error updating user email");
      }
      const res = await response.json();
      dispatch(successGlobal("Email updated!"));
      return res.user;
    } catch (error) {
      dispatch(errorGlobal(error.message));
      throw error;
    }
  }
);
