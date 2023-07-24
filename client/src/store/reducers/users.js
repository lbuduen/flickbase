import { createSlice } from "@reduxjs/toolkit";

import {
  authUser,
  isAuth,
  updateProfile,
  updateUserEmail,
} from "../actions/users";
import { delTokenCookie } from "../../utils/tools";

const DEFAULT_USER_STATE = {
  loading: false,
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    age: null,
    role: null,
    verified: null,
  },
  auth: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: DEFAULT_USER_STATE,
  reducers: {
    signOut: state => {
      delTokenCookie();
      state.data = DEFAULT_USER_STATE.data;
      state.auth = false;
    },
  },
  extraReducers: builder => {
    builder
      // AUTH USER
      .addCase(authUser.pending, state => {
        state.loading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(authUser.rejected, state => {
        state.loading = false;
      })
      //IS AUTH
      .addCase(isAuth.pending, state => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload.data };
        state.auth = action.payload.auth;
      })
      .addCase(isAuth.rejected, state => {
        state.loading = false;
      })
      // UPDATE USER PROFILE
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // UPDATE USER EMAIL
      .addCase(updateUserEmail.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUserEmail.rejected, state => {
        state.loading = false;
      })
  },
});

export const { signOut } = usersSlice.actions;
export default usersSlice.reducer;
