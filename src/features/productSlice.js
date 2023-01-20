// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { createSlice } from '@reduxjs/toolkit'



// const initialState = {
//     isLoading: false,
//     products: [],
//     value: 0
// }

// export const fetchProduct = createAsyncThunk("products/getAllProducts", async (data, thunkAPI) => {

//     try {
//         const products = await fetch('https://dummyjson.com/productsd')
//         return await products.json()

//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//     }
// })



// export const productSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//         increment: (state, action) => {
//             state.value += 1
//         },
//         decrement: (state, action) => {
//             state.value -= 1
//         }
//     },
//     extraReducers: {
//         [fetchProduct.pending]: (state, payload) => {
//             state.isLoading = true
//         },
//         [fetchProduct.fulfilled]: (state, { payload }) => {
//             state.isLoading = false
//             state.products = payload.products
//         },
//         [fetchProduct.rejected]: (state, action) => {
//             state.isLoading = false
//             console.log(action)
//         }
//     }
// })

// export const { increment, decrement } = productSlice.actions

// export default productSlice.reducer