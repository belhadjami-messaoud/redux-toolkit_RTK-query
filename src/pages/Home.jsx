import Navbar from "../component/navbar/navbar";
import Slider from "../component/hero/slider";
import About from "../component/about/about";

import { logout } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../services/auth/authAPI";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <Navbar />
      <Slider />
      <About />
    </>
  );
}
