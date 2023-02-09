import React from 'react'

import delivery from '../../assets/homepage/delivery.svg'
import card from '../../assets/homepage/card.svg'
import warrant from '../../assets/homepage/warrant.svg'

const Services = () => {
    return (
        <div className='services'>
            <div className="delivery">
                <img src={delivery} alt="" />
                <h5>Çatdırılma</h5>
                <p>Qısa zamanda istədiyiniz məhsulların lazımi ünvana çatdırılması</p>
            </div>
            <div className="card">
                <img src={card} alt="" />
                <h5>Kredit</h5>
                <p>Qısa zamanda istədiyiniz məhsulların lazımi ünvana çatdırılması</p>
            </div>
            <div className="warrant">
                <img src={warrant} alt="" />
                <h5>Zəmanət</h5>
                <p>Qısa zamanda istədiyiniz məhsulların lazımi ünvana çatdırılması</p>
            </div>
        </div>
    )
}

export default Services