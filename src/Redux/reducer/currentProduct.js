import { createSlice } from "@reduxjs/toolkit";

const currentSlice = createSlice({
    name: 'product',
    initialState: {
        product: ''
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        }
    },
})

export const { setProduct } = currentSlice.actions;

export default  currentSlice.reducer;