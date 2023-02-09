import React from 'react'
import { useNavigate } from 'react-router-dom'

import success from '../assets/signup-login/success.svg'

const Registered = () => {

    const navigate = useNavigate();
    return (
        <div className="Registered mx-auto my-12 flex flex-col w-96 border-2 border-green-400 rounded-4 overflow-hidden">
            <div className="success w-40 h-40 mt-10 mx-auto mb-10 bg-white border-4 border-green-400 p-8 rounded-full">
                <img src={success} alt="" className=' w-26 '/>
            </div>
            <div className="congrulation bg-green-400 h-56 flex flex-col align-center justify-around">
                <p className='mx-auto text-white text-lg'>Təbriklər ! Qeydiyyatınız uğurla tamamlandı</p>
                <button to={'/login'} className='continue bg-white w-40 h-12 rounded-full mx-auto text-xl text-green-500 shadow-inner hover:shadow-green-600 hover:text-green-500 font-semibold' onClick={()=>{
                    navigate('/login', {replace: true})
                }}>Davam et</button>
            </div>
        </div>
    )
}

export default Registered