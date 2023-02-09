import React from 'react'
import {useForm} from 'react-hook-form'

const FirstStepContent = ({register, errors, handleSubmit, infoFormSubmit, index, setActiveStep}) => {

    return (
        <div className="stepContent">
            <form className='infoForm' onSubmit={handleSubmit(infoFormSubmit)}>
                <div className='inputDiv'>
                    <label className='nameLabel label' htmlFor="">Ad</label>
                    <input className='input' type="text" placeholder='Adınızı daxil edin' {...register("firstname", {
                        required: true,
                        minLength: 4
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.firstname?.type == 'required' && 'Adınızı qeyd edin'}
                            {errors?.firstname?.type == 'minLength' && 'Ad minimum 3 herfden ibaret olmalidir'}</p>
                    </div>
                </div>
                
                <div className="inputDiv">
                    <label className='nameLabel label' htmlFor="">Soyad</label>
                    <input className='input' type="text" placeholder='Soyadınızı daxil edin' {...register("lastname", {
                        required: true,
                        minLength: 4
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.lastname?.type == 'required' && 'Soyadınızı qeyd edin'}
                            {errors?.lastname?.type == 'minLength' && 'Soyad minimum 3 herfden ibaret olmalidir'}</p>
                    </div>
                </div>
                
                <div className="inputDiv">
                    <label className='numberLabel label' htmlFor="">Mobil nömrə</label>
                    <input className='input mobileNumberInput' type="number" placeholder='0770000000' {...register("phone", {
                        required: 'Mobil nömrəni qeyd edin',
                    })} />
                    <div className='errorMsgDiv'>
                        <p>
                            {errors?.phone?.type == 'required' && 'Mobil nömrənizi qeyd edin'}
                        </p>
                    </div>
                </div>

                <div className="inputDiv">
                    <label className='emailLabel label' htmlFor="">E-mail</label>
                    <input className='input email' type="text" placeholder='nümunə@gmail.com' {...register("email", {
                        required: 'ad minimum 5 herfden ibaret olmalidir',
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.email?.type == 'required' && 'Emailinizi qeyd edin'}</p>
                    </div>
                </div>
            <button className='saveInputs' type="submit">Yadda saxla</button>
            </form>
        </div>
    )
}

export default FirstStepContent