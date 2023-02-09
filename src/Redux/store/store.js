import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/currentProduct";
import cartItemsReducer from '../reducer/cartItems';
import { authReducer } from "../reducer/authReducer";
import orderReducer from "../reducer/orderReducer";

export const store = configureStore({
    reducer: {
        productReducer,
        cartItemsReducer,
        authReducer,
        orderReducer
    }
})