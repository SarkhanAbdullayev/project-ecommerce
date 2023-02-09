import React from 'react'

const OrderItem = ({ item , created}) => {
    
    const getDate = (date) => {
        const dateObj = new Date(date)
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const newdata = `${day}.${month}.${year}`
        return newdata;
    }

    return (
        <div className="orderItem">
            <img src={item?.image?.url} alt="" />
            <div className="itemInfo">
                <p className='itemName'>{item?.product_name}</p>
                <div className="countDiv">
                    <p className="countP">Say:</p>
                    <div className="count">{item?.quantity}</div>
                </div>
                <div className="orderCreatedDiv">
                    <p className="createdP">Sifariş tarixi:</p>
                    <p className='created'>
                        07.02.2023
                        {/* {getDate(created)} */}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderItem