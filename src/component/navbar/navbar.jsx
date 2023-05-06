import React from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../../services/auth/authAPI";
import { logOutUser } from "../../features/authSlice";

export default function navbar() {
  // const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            {/* <img src="images/logo.png" alt="Archidni"> */}
            <span>myLogo</span>
          </div>
          <ul className="nav-bar">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link href="">Services</Link>
            </li>
            <li>
              <Link href="">News</Link>
            </li>
            <li>
              <Link href="">Contact Us</Link>
            </li>
            <li>
              <Link href="">About Us</Link>
            </li>
            {!user && (
              <li>
                <Link to="/login" className="login">
                  Log in
                </Link>
              </li>
            )}
          </ul>
          {user && (
            <Link
              onClick={() => {
                dispatch(logOutUser());
              }}
              to="/"
              className="button active"
            >
              logout
            </Link>
          )}
          {user && (
            <Link to="/dash/home" className="button active">
              dash
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
