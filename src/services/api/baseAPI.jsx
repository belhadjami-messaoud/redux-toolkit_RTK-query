import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from '../../features/authSlice'

// export const baseAPI = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:3000/api/v1",
//         credentials: "include",
//     }),

//     endpoints: (builder) => ({}),

// })

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: 'include',
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // if (result.data) {
    //     const res = await baseQuery('/user/me', api, extraOptions)
    //     if (res?.data) {
    //         api.dispatch(setCredentials(res.data))
    //         result = await baseQuery(args, api, extraOptions)
    //     } else {
    //         // api.dispatch(logout())
    //     }
    // }

    return result
}

export const baseAPI = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})


