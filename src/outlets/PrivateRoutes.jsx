import React, {useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import commerce from '../commerce/commerce';
import { logout } from '../Redux/reducer/authReducer';
import { useDispatch } from 'react-redux';


const PrivateRoutes = () => {

    const customerId = localStorage.getItem('commercejs_customer_id');
    const dispatch = useDispatch();

    useEffect(() => {
        commerce.customer.about(customerId).then((customer) => customer)
            .catch(error => {
                (error.statusCode == 401 || error.statusCode == 500 || error.statusCode == 404) && dispatch(logout());
                <Navigate to='/login'/>
        }); 
    },[])

    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default PrivateRoutes