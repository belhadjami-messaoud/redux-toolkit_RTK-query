import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShareLayoat from "./pages/Dashborad/ShareLayoat";
import HomeDash from "./pages/Dashborad/Home";
import AddProduct from "./pages/Dashborad/AddProduct";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRouter from "./pages/PrivateRouter";
import Profile from "./pages/Dashborad/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useUserRefreshMutation } from "./services/auth/authAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, userRefresh } from "./features/authSlice";
import { useLocation } from "react-router-dom";

function App() {
  const { user, isSuccess, isLoading, isAuthenticated } = useSelector(
    (store) => store.auth
  );
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRefresh());
  }, [location]);

  // useEffect(() => {
  //   dispatch(reset());
  // }, [isSuccess]);

  // if (isLoading) {
  //   return <div>loding ..................</div>;
  // }

  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>

        <Route
          path="dash"
          element={
            <PrivateRouter auth={user}>
              <ShareLayoat />
            </PrivateRouter>
          }
        >
          <Route index path="home" element={<HomeDash />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addProduct" element={<AddProduct />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
