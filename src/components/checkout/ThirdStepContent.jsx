import React from 'react'
import { TbCashBanknote, TbCreditCard } from 'react-icons/tb'

const ThirdStepContent = ({ register, errors, handleSubmit, index, setActiveStep, checkoutVariant, setcheckoutVariant, payVariantSubmit }) => {


    return (
        <div className='paymentContent'>
            <div className="payVariants">
                <div className={`card ${checkoutVariant == 'card' && 'confirmed'}`} onClick={() => setcheckoutVariant('card')}>
                    <TbCreditCard style={{ fontSize: '22px' }} />
                    <p>Onlayn kart ilə ödəmə</p>
                </div>
                <div className={`cash ${checkoutVariant == 'cash' && 'confirmed'}`} onClick={() => setcheckoutVariant('cash')}>
                    <TbCashBanknote style={{ fontSize: '22px' }} />
                    <p>Qapıda nağd ödəmə</p>
                </div>
            </div>
            <button className='confirm' onClick={() => payVariantSubmit()}>Təsdiq et</button>
        </div>
    )
}

export default ThirdStepContent