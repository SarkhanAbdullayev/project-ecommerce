import React from 'react'

import { BarLoader } from 'react-spinners'

const CheckoutForm = ({ register, handleSubmit, captureOrder, loading }) => {
    return <div className='flex flex-col'>
        <form className='checkoutForm' >
            <label htmlFor="" className='label'>Kart nömrəsi</label>
            <input type="number" className='cardNumber' {...register("cardNumber", {
                required: true,
                minLength: 16,
                maxLength: 16,
            })}/>
            <label htmlFor="" className='expiryDateLabel'>Bitmə tarixi</label>
            <div className="expiryInputs">
                <input type="number"  className='expiryMonth' placeholder='Ay' {...register("expiryMonth", {
                required: true,
                minLength: 2,
                maxLength: 2,
            })}/>
                <input type="number" className='expiryYear' placeholder='il' {...register("expiryYear", {
                required: true,
                minLength: 4,
                maxLength: 4,
            })}/>
            </div>
            <label htmlFor="">CVC</label>
            <input type="number" className='cvcInput' {...register("cvc", {
                required: true,
                minLength: 3,
                maxLength: 3,
            })}/>
        </form>
        {loading ? <BarLoader color='#2DD06E'className='mx-auto'/> : <button type='submit' className='captureOrderBtn' onClick={handleSubmit(captureOrder)}>Ödənişi təstiqlə</button>}
    </div>
}

export default CheckoutForm