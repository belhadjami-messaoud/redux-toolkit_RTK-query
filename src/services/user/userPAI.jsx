import { baseAPI } from "../api/baseAPI"

export const userAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "/user"
        }),
        getSingleUser: builder.query({
            query: (_id) => `user/${_id}`
        })

    })
})

export const { useGetAllUsersQuery, useGetSingleUserQuery, useGetCurrentUserQuery } = userAPI