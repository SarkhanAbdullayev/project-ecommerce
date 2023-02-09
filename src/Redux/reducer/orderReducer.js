import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        orderDetails: {},
        orders: null
    },
    reducers: {
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        }
    },
})

export const { setOrderDetails, setOrders } = orderSlice.actions;

export default  orderSlice.reducer;