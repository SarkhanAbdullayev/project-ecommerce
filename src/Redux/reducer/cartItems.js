import { createSlice } from "@reduxjs/toolkit";

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState: {
        cartItems: 0
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        }
    },
})

export const { setCartItems } = cartItemsSlice.actions;

export default  cartItemsSlice.reducer;