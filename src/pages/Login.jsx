import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { userLogin } from "../features/authSlice";

export default function Login() {
  // const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

  const { user, isAuthenticated, error } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserInfo((perv) => ({ ...perv, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userInfo;
    if (!email || !password) {
      toast.error("please provide email and password");
      return;
    }

    dispatch(userLogin(userInfo));
  };

  useEffect(() => {
    if (error) {
      toast.error("error");
    }

    if (isAuthenticated) {
      // dispatch(reset());
      console.log(user);

      navigate("/dash");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="login">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={userInfo.email}
                className="form-control"
                placeholder="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={userInfo.password}
                className="form-control"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
