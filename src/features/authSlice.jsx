import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserLocalStorage, getUserLocalStorage, removeUserLocalStorage } from '../utils/localStorage'
import { toast } from 'react-toastify'

let initialState = {
    user: getUserLocalStorage(),
    // user: getUserLocalStorage(),
    // isAuthenticated: false
}

export const userLogin = createAsyncThunk("auth/userLogin", async (data, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/auth/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            // body: data
        })

        return await res.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const userRefresh = createAsyncThunk("user/me", async (data, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/user/me", {
            method: 'GET',
            credentials: 'include',
        })

        return await res.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})



const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            addUserLocalStorage(payload)
            state.user = payload
        },
        logout: (state, { payload }) => {
            state.user = null
            removeUserLocalStorage()
            toast.success(payload.msg)
        },
    },
    extraReducers: {

        //************************login************************
        [userLogin.pending]: (state, payload) => {
            // console.log("loading...");
            state.isLoading = true
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            // addUserLocalStorage(payload)
            state.isLoading = false
            state.user = payload
            toast.success("success")
        },
        [userLogin.rejected]: (state, payload) => {
            state.isLoading = false
            console.log("userLogin.rejected");
        },
        // ************************refresh user info************************
        [userRefresh.pending]: (state, payload) => {
            // console.log("loading...");
            state.isLoading = true
        },
        [userRefresh.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            addUserLocalStorage(payload)
            console.log("userRefresh.fulfilled...");
            state.user = payload
        },
        [userRefresh.rejected]: (state, payload) => {
            state.isLoading = false
            console.log("userRefresh.rejected...");
        },
    }

})

export const { setCredentials, logout, refresh } = auth.actions

export default auth.reducer