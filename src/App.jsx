import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PersistingLogin from "./pages/persistingLogin";
import { loadUser } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(loadUser());
    }
  }, [user, isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PersistingLogin />}>
          {/* الوصول للصفحات المحمية فقط */}
          <Route element={<PrivateRouter />}>
            <Route path="/dash" element={<ShareLayoat />}>
              <Route path="home" element={<HomeDash />} />
              <Route path="profile" element={<Profile />} />
              <Route path="addProduct" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;

/*
 element={
            <PrivateRouter auth={user}>
              <ShareLayoat />
            </PrivateRouter>
          }

*/
