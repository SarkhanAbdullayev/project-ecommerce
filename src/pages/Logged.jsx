import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import commerce from '../commerce/commerce';
import { authReducer } from '../Redux/reducer/authReducer';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import { login } from '../Redux/reducer/authReducer';

import success from '../assets/signup-login/success.svg'

const Logged = () => {

    const auth = useSelector(state => state.authReducer)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const params = useParams('token');

    useEffect(() => {
        commerce.customer.getToken(params.token).then((jwt) => {
            console.log(jwt);
            localStorage.setItem('commercejs_customer_id', jwt.customer_id);
            localStorage.setItem('commercejs_customer_token', jwt.jwt);

            dispatch(login({
                token: jwt.jwt,
                id: jwt.customer_id,
            }))
        }).catch(error => console.log('expared', error.message));

        
    }, [])
    
    return (
        <div className="Registered mx-auto my-12 flex flex-col w-96 border-2 border-green-400 rounded-4 overflow-hidden">
            <div className="success w-40 h-40 mt-10 mx-auto mb-10 bg-white border-4 border-green-400 p-8 rounded-full">
                <img src={success} alt="" className=' w-26 '/>
            </div>
            <div className="congrulation bg-green-400 h-56 flex flex-col align-center justify-around">
                <p className='mx-auto text-white text-lg'>Təbriklər ! Siz uğurla sayta daxil oldunuz</p>
                <button to={'/login'} className='continue bg-white w-40 h-12 rounded-full mx-auto text-xl text-green-500 shadow-inner hover:shadow-green-600 hover:text-green-500 font-semibold' onClick={()=>{
                    navigate('/profile/info', {replace: true})
                }}>Davam et</button>
            </div>
        </div>
    )
}

export default Logged