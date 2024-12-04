import { configureStore } from "@reduxjs/toolkit";
// import productSlice from '../features/productSlice'
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    // [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authSlice,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(baseAPI.middleware),

  devTools: true,
});
