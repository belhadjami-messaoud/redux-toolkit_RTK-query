
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserRefreshMutation } from '../services/auth/authAPI';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { userRefresh } from '../features/authSlice';

export default function PrivateRouter({ children }) {
    const { user } = useSelector(store => store.auth)

    const [userRefresh, { isSuccess, isLoading }] = useUserRefreshMutation()
    useEffect(() => {
        if (user?.isAuthenticated) {
            userRefresh()
            console.log("userRefresh")
        }

    }, [])



    return (
        <>
            {

                user && user?.role === "admin" ?
                    children
                    : <Navigate to="/" />
            }
        </>
    )

}
// return user && user?.role === "admin" ?//go to dash
// children : user?.role === "user" ? // go to home if he is user else go to login
//     <Navigate to="/" />
//     : <Navigate to="/login" />