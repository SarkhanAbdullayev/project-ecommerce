import React, {useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';


const AuthRoutesProvider = () => {

    const navigate = useNavigate()

    const auth = useSelector(state => state?.authReducer?.isLogin);

    useEffect(() => {
        if (auth) {
            navigate('/profile/info')
        }
    },[])

    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default AuthRoutesProvider