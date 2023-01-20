import { logout, setCredentials } from "../../features/authSlice";
import { baseAPI } from "../api/baseAPI";

export const authAPI = baseAPI.injectEndpoints({
    credentials: 'include',
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data
            })
        }),
        login: (builder).mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),

        logout: (builder).mutation({
            query: () => ({
                url: "/auth/logout",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                try {
                    const { data } = await queryFulfilled
                    dispatch(logout(data))
                    return data
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        //using this method for refreshing info user every request to check info user every request
        userRefresh: (builder).mutation({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                try {
                    const { data } = await queryFulfilled
                    const { role, user, userId } = data
                    dispatch(setCredentials({ role, user, userId, isAuthenticated: true }))
                    return data
                } catch (err) {
                    console.log(err)
                }
            }

        }),


    })
})

export const { useLoginMutation, useRegisterMutation, useUserRefreshMutation, useLogoutMutation } = authAPI