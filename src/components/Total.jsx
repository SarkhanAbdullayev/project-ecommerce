import React from 'react'

const Total = ({ subTotal }) => {
    return (
        <div className="total">
            <h3 className='totalH3'>Ümumi</h3>
            <div className="subTotal">
                <p>Məbləğ</p>
                <p>{subTotal}</p>
            </div>
            <div className="subTotal">
                <p>Çatdırılma</p>
                <p>0.00 m</p>
            </div>
            <div className="subTotal">
                <p>Hədiyyə paketi</p>
                <p>0.00 m</p>
            </div>
            <div className="subTotal">
                <p>Promo kod</p>
                <p>0.00 m</p>
            </div>
            <div className="line"></div>
            <div className="sum">
                <h5>Cəmi</h5>
                <p>{subTotal}</p>
            </div>
        </div>
    )
}

export default Total