import { baseAPI } from "../api/baseAPI"

export const productsAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "product"
        })
    })
})

export const { useGetAllProductsQuery } = productsAPI