import { Navigate, useNavigate, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserRefreshMutation } from "../services/auth/authAPI";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { reset, userRefresh } from "../features/authSlice";

export default function PrivateRouter({ children, auth }) {
  const { isSuccess, isLoading, user, isAuthenticated } = useSelector(
    (store) => store.auth
  );
  const location = useLocation();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(userRefresh());
  //   }, [location]);
  //   console.log(auth);

  //   if (isLoading) {
  //     return <div>loding...........................</div>;
  //   }

  if (auth) {
    return (
      <>{auth && auth.role === "admin" ? children : <Navigate to="/" />}</>
    );
  }
}
// return user && user?.role === "admin" ?//go to dash
// children : user?.role === "user" ? // go to home if he is user else go to login
//     <Navigate to="/" />
//     : <Navigate to="/login" />
