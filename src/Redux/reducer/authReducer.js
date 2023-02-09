import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


const initialState = {
    token: localStorage.getItem('commercejs_customer_token') || '',
    customerId: localStorage.getItem('commercejs_customer_id') || '',
    isLogin: !!localStorage.getItem('commercejs_customer_token'),
    loading: false,
    error: null,
}
    
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.token = payload.token;
            state.isLogin = true;
            state.customerId = payload.id;
            return state
        },

        logout: (state, {payload}) => {
            state.token = '';
            state.isLogin = false;
            localStorage.setItem('commercejs_customer_token', '');
            localStorage.setItem('commercejs_customer_id', '');
            return state;
        }
    },
})

export const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;