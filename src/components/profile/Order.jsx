import React from 'react'
import iphone from '../../assets/homepage/12PlusBlack.webp'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderDetails } from '../../Redux/reducer/orderReducer'

const Order = ({ item}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const getDate = (date) => {
        const dateObj = new Date(date)
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const newdata = `${day}.${month}.${year}`
        return newdata;
    }



    return (
        <div className='order'>
            <div className="imgDiv w-1/2 flex justify-center items-center">
                {item?.order?.line_items?.map((product, i) => {
                    return i < 4 && <img src={product?.image?.url} alt="" key={i} className='orderImg'/>
                })}
            </div>
            <div className="information w-1/2 flex flex-col justify-center items-left">
                <p className='text-xs text-gray-500 mb-1'>Sifariş tarixi:</p>
                <p className='text-gray-700 mb-3'>{getDate(item?.created)}</p>
                <p className='text-xs text-gray-500 mb-1'>Status:</p>
                <p className='text-sm font-medium mb-3'>Yoldadır</p>
                <p className='text-xs text-gray-500 mb-1'>Ümumi məbləğ:</p>
                <p className='text-sm text-rose-700 font-medium mb-3'>{item?.order?.total.formatted_with_symbol}</p>
                <button className='w-4/5 p-1 flex justify-center items-center hover:text-gray-800 rounded bg-gray-100 font-medium text-s' onClick={() => {
                    dispatch(setOrderDetails(item));
                    navigate(`/profile/orders/${item?.id}`)
                }}>Sifarişin detalları</button>
            </div>
        </div>
    )
}

export default Order