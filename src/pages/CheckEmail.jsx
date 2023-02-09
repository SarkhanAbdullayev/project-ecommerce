import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import commerce from '../commerce/commerce'
import checkEmail from '../assets/signup-login/checkEmail.svg'


const LoggedCheck = () => {

  return (
    <div className="Registered mx-auto my-12 flex flex-col w-96 overflow-hidden">
      <div className="success w-40 h-40 mt-10 mx-auto mb-10">
          <img src={checkEmail} alt="" className=' w-26 '/>
      </div>
      <div className="congrulation h-32 flex flex-col align-center justify-center mb-16">
          <p className='mx-auto text-gray-700 text-2xl text-center'>E - poçt ünvanınızı yoxlayın. Göndərilmiş linkə keçid edib sayta daxil olun</p>
      </div>
    </div>
  )
}

export default LoggedCheck