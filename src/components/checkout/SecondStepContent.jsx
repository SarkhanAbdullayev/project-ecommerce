import React from 'react'

const SecondStepContent = ({register, errors, handleSubmit, deliverySubmit, index, setActiveStep}) => {


    return (
        <div className="stepContent">
            <form className='deliveryForm' onSubmit={handleSubmit(deliverySubmit)}>
                <div className='inputDiv'>
                    <label className='addressLabel label' htmlFor="">Ünvan</label>
                    <input className='input' type="text" placeholder='Ünvanı daxil edin' {...register("address", {
                        required: true,
                        minLength: 4
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.address?.type == 'required' && 'Ünvanı daxil edin'}
                            {errors?.address?.type == 'minLength' && 'Ünvan minimum 10 herfden ibaret olmalidir'}</p>
                    </div>
                </div>

                <div className="inputDiv">
                    <label className='homeLabel label' htmlFor="">Bina/Mənzil</label>
                    <input className='input' type="text" placeholder='Daxil edin' {...register("home", {
                        required: true,
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.home?.type == 'required' && 'Evin nömrəsini qeyd edin'}</p>
                    </div>
                </div>

                <div className="deliveryInputDiv inputDiv">
                    <label className='noteLabel label' htmlFor="">Kuryer üçün əlavə qeydlər</label>
                    <input className='input noteInput' type="text" placeholder='Mətni daxil edin...' {...register("note")} />
                </div>
            <button className='saveInputs' type="submit">Yadda saxla</button>
            </form>
        </div>
    )
}

export default SecondStepContent