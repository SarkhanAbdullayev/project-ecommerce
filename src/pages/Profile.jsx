import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useNavigate, Outlet , Route , Routes} from 'react-router-dom'
import Sidebar from '../components/profile/Sidebar'
import { logout } from '../Redux/reducer/authReducer'

import '../styles/profile/profile.css'




const Profile = () => {
    
    const auth = useSelector(state => state.authReducer.isLogin);
    const navigate = useNavigate()

    const dispatch = useDispatch();
    
    useEffect(() => {
        const customerId = localStorage.getItem('commercejs_customer_id');
        const customerJwt = localStorage.getItem('commercejs_customer_token');
        if (!auth || !customerId || !customerJwt) {
            dispatch(logout());
            navigate('/login');
        }
    },[])

    return (
        <div className="profile">
            <Sidebar />
            <Outlet/>
        </div>
    )
}

export default Profile