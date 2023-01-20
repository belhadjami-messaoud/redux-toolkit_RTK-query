import React from 'react'
import { useState } from 'react'
import { useLoginMutation } from '../services/auth/authAPI'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, refresh, setCredentials, userRefresh } from '../features/authSlice';


export default function Login() {
    const [login, { data, isLoading, isSuccess, error }] = useLoginMutation()

    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUserInfo((perv) => (
            { ...perv, [e.target.name]: e.target.value }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = userInfo
        if (!email || !password) {
            toast.error("please provide email and password")
            return
        }

        try {
            const { msg, user } = await login(userInfo).unwrap()
            dispatch(setCredentials({ ...user, isAuthenticated: true }))
            toast.success(msg)
        } catch (error) {
            toast.error(error.data.msg)
        }
    }



    useEffect(() => {
        console.log(isSuccess);
        if (isSuccess) {
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000)
        }

    }, [isSuccess])

    return (
        <>
            <div className="login">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" name='email' value={userInfo.email} className="form-control" placeholder="email" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="password" name='password' value={userInfo.password} className="form-control" placeholder="password" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" >submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}


