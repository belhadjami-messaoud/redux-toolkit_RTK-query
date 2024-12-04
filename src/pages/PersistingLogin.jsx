import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const PersistingLogin = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user && isAuthenticated === false) {
  //     dispatch(loadUser());
  //   }
  // }, [user, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? <Navigate to={"/"} /> : <Outlet />;
};

export default PersistingLogin;

//here we don't need async await beacuse in loadUser use it in redux store
// useEffect(() => {
//   const verifyUser = async () => {
//     try {
//       if (!user && isAuthenticated === false) {
//         // حمل بيانات المستخدم إذا لم تكن موجودة
//         const result = await dispatch(loadUser()).unwrap();
//         console.log("User loaded successfully:", result);
//       }
//     } catch (error) {
//       console.error("User verification failed:", error);
//     } finally {
//       setLoading(false); // إنهاء حالة التحميل
//     }
//   };

//   verifyUser();
// }, [user, isAuthenticated, dispatch]);
