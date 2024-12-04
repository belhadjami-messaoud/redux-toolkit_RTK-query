// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   addUserLocalStorage,
//   getUserLocalStorage,
//   removeUserLocalStorage,
//   getUserCookie,
// } from "../utils/localStorage";
// import { toast } from "react-toastify";

// let initialState = {
//   user: null,
//   // user: getUserLocalStorage(),
//   isAuthenticated: getUserCookie(),
//   isError: false,
//   isLoading: false,
//   isSuccess: false,

//   isErrorGetMe: false,
//   isLoadingGetMe: false,
//   isSuccessGetMe: false,
// };

// export const userLogin = createAsyncThunk(
//   "auth/userLogin",
//   async (data, thunkAPI) => {
//     const res = await fetch("http://localhost:5000/api/v1/auth/login", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//       // body: data
//     });
//     if (!res.ok) {
//       //   console.log(res);
//       return thunkAPI.rejectWithValue();
//     }
//     return await res.json();
//   }
// );

// export const logOutUser = createAsyncThunk(
//   "auth/logOutUser",
//   async (data, thunkAPI) => {
//     const res = await fetch("http://localhost:3000/api/v1/auth/logout", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // body: data
//     });

//     if (!res.ok) {
//       //   console.log(res);
//       return thunkAPI.rejectWithValue();
//     }
//     return await res.json();
//   }
// );

// export const refreshTokenn = createAsyncThunk(
//   "auth/refreshToken",
//   async (_, thunkAPI) => {
//     const res = await fetch("http://localhost:5000/api/v1/user/me", {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!res.ok) {
//       return thunkAPI.rejectWithValue();
//     }
//     const data = await res.json();
//     console.log("User data:", data);
//     return data; // قم بإعادة بيانات المستخدم
//     // return await res.json();
//   }
// );

// const auth = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, { payload }) => {
//       addUserLocalStorage(payload);
//       state.user = payload.user;
//     },
//     logout: (state, { payload }) => {
//       state.user = null;
//       removeUserLocalStorage();
//       toast.success(payload.msg);
//     },
//     reset: (state) => {
//       state.isError = false;
//       state.isLoading = false;
//       state.isSuccess = false;
//     },
//   },
//   extraReducers: {
//     //************************login************************
//     [userLogin.pending]: (state, payload) => {
//       // console.log("loading...");
//       state.isLoading = true;
//       // state.isAuthenticated = false;
//     },
//     [userLogin.fulfilled]: (state, { payload }) => {
//       //   addUserLocalStorage(payload);
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.user = payload.user;
//       // state.isAuthenticated = true;
//       toast.success("success");
//     },
//     [userLogin.rejected]: (state, payload) => {
//       state.isLoading = false;
//       //   console.log(payload);

//       console.log(payload);
//     },
//     // ************************refresh Token************************
//     [refreshTokenn.pending]: (state, payload) => {
//       state.isLoadingGetMe = true;
//     },
//     [refreshTokenn.fulfilled]: (state, { payload }) => {
//       state.isLoadingGetMe = false;
//       state.isSuccessGetMe = true;
//       state.user = payload;
//     },
//     [refreshTokenn.rejected]: (state, payload) => {
//       state.isLoading = false;
//     },
//     // ************************logout user info************************

//     [logOutUser.pending]: (state, payload) => {
//       state.isLoading = true;
//     },
//     [logOutUser.fulfilled]: (state) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//     [logOutUser.rejected]: (state, payload) => {
//       state.isLoading = false;
//     },
//   },
// });

// export const { setCredentials, logout, refresh, reset } = auth.actions;

// export default auth.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        return thunkAPI.rejectWithValue(error.msg || "Login failed");
      }

      return await res.json(); // Assuming server responds with user info
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/user/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.error = payload || "Login failed";
        state.loading = false;
      })

      // Handle loading user
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

      // Handle logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
