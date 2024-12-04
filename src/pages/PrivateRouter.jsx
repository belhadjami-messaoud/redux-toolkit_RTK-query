import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ form: location }} replace to="/" />
  );
};

export default PrivateRouter;

// import { Navigate, useNavigate, BrowserRouter, Form } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import { refreshTokenn } from "../features/authSlice";

// export default function PrivateRouter({ children, auth }) {
//   const { isSuccessGetMe, isLoadingGetMe, user, isAuthenticated } = useSelector(
//     (store) => store.auth
//   );
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(refreshTokenn());
//   // }, [isLoadingGetMe]);

//   console.log("in private route", isSuccessGetMe);
//   console.log("user", user);
//   return isSuccessGetMe ? (
//     <Outlet />
//   ) : (
//     <Navigate state={{ form: location }} replace to="/login" />
//   );
// }
