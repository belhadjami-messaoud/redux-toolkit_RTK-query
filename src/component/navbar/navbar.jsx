import React from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../features/authSlice";

export default function navbar() {
  // const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
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
            {!isAuthenticated && !loading && (
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
                dispatch(logoutUser());
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
