import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUserLocalStorage,
  getUserLocalStorage,
  removeUserLocalStorage,
  getUserCookie,
} from "../utils/localStorage";
import { toast } from "react-toastify";

let initialState = {
  user: null,
  // user: getUserLocalStorage(),
  isAuthenticated: getUserCookie(),
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data, thunkAPI) => {
    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // body: data
    });

    if (!res.ok) {
      //   console.log(res);
      return thunkAPI.rejectWithValue();
    }
    return await res.json();
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async (data, thunkAPI) => {
    const res = await fetch("http://localhost:3000/api/v1/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: data
    });

    if (!res.ok) {
      //   console.log(res);
      return thunkAPI.rejectWithValue();
    }
    return await res.json();
  }
);

export const userRefresh = createAsyncThunk(
  "user/me",
  async (data, thunkAPI) => {
    const res = await fetch("http://localhost:3000/api/v1/user/me", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      //   console.log(res);
      return thunkAPI.rejectWithValue();
    }

    return await res.json();
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      addUserLocalStorage(payload);
      state.user = payload;
    },
    logout: (state, { payload }) => {
      state.user = null;
      removeUserLocalStorage();
      toast.success(payload.msg);
    },
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    //************************login************************
    [userLogin.pending]: (state, payload) => {
      // console.log("loading...");
      state.isLoading = true;
      // state.isAuthenticated = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      //   addUserLocalStorage(payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload.user;
      // state.isAuthenticated = true;
      toast.success("success");
    },
    [userLogin.rejected]: (state, payload) => {
      state.isLoading = false;
      //   console.log(payload);

      console.log(payload);
    },
    // ************************refresh user info************************
    [userRefresh.pending]: (state, payload) => {
      // console.log("loading...");
      state.isLoading = true;
    },
    [userRefresh.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      // addUserLocalStorage(payload);
      state.isSuccess = true;
      // state.isAuthenticated = true;
      console.log(state.isAuthenticated);

      state.user = payload;
    },
    [userRefresh.rejected]: (state, payload) => {
      console.log(state.isAuthenticated);
      state.isLoading = false;
    },
    // ************************logout user info************************

    [logOutUser.pending]: (state, payload) => {
      state.isLoading = true;
    },
    [logOutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
      state.isAuthenticated = false;
    },
    [logOutUser.rejected]: (state, payload) => {
      state.isLoading = false;
    },
  },
});

export const { setCredentials, logout, refresh, reset } = auth.actions;

export default auth.reducer;
