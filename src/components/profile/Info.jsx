import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import commerce from '../../commerce/commerce'
import { useForm } from 'react-hook-form'
import edit from '../../assets/profile/edit.svg'
import InfoModal from './InfoModal'

import '../../styles/profile/profile.css'



const Info = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const [customer, setCustomer] = useState({});
    
    const customerId = useSelector(state => state.authReducer.customerId);
    useEffect(() => {
        commerce.customer.about(customerId).then((customer) => {
            setCustomer(customer);
            setValue('email', customer?.email);
            setValue('firstname', customer?.firstname);
            setValue('lastname', customer?.lastname);
            setValue('phone', customer?.phone);
            setValue('date', '1991-10-01');
        });
    }, [])
    
    const { register, handleSubmit, formState: { errors } , setValue } = useForm();
    

    const updateCustomer = (data) => {
        commerce.customer.update({
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone
        }, customerId)
            .then((customer) => {
                handleOpen();
            }).catch(error => console.log(error))
    }

    

    return (
        <div className='infoTab'>
            <h1>Şəxsi məlumatlar</h1>
            <div className="infoContent">
                <form className="information" onSubmit={handleSubmit(updateCustomer)}>
                    <div className="inputDiv">
                        <label className='label' htmlFor="firstname">Ad</label>
                        <input className='input' type="text" {...register("firstname")}/>
                    </div>
                    <div className="inputDiv">
                        <label className='label' htmlFor="lastname">Soyad</label>
                        <input className='input' type="text" {...register("lastname")}/>
                    </div>
                    <div className="inputDiv">
                        <label className='label' htmlFor="email">E-mail</label>
                        <input className='input' type="email" {...register("email")}/>
                    </div>
                    <div className="inputDiv">
                        <label className='label' htmlFor="phone">Mobil nömrə</label>
                        <input className='input' type="text" {...register("phone")}/>
                    </div>
                    <div className="inputDiv">
                        <label className='label' htmlFor="date">Doğum tarixi</label>
                        <input className='input'  type='date' {...register("date")}/>
                    </div>
                    <button></button>
                </form>
                <div className="update" onClick={handleSubmit(updateCustomer)}>
                    <img className='editImg' src={edit} alt="" />
                    <p>Məlumatları yenilə</p>
                </div>
            </div>
            <InfoModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default Info
