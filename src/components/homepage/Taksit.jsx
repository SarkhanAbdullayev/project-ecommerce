import React from 'react'

import iphone14 from '../../assets/homepage/12PlusBlack.webp'
import iphone14violet from '../../assets/homepage/14PlusViolet.webp'

const Taksit = () => {
    return (
        <div className='taksit'>
            <div className="first">
                <div className="info">
                    <h3>iPhone 14.<br></br>
                        Rəngli və güclü.
                        Əsl sizə lazım olan.
                    </h3>
                    <h4> 2 519 AZN</h4>
                    <p>Faizsiz taksitlə 227 AZN-dən</p>
                    <button className='indiAl'>İndi alın</button>
                </div>
                <div className="productImg">
                    <img src={iphone14} alt="iphone14" />
                </div>
            </div>
            <div className="first">
                <div className="info">
                    <h3>iPhone 14.<br></br>
                        Rəngli və güclü.
                        Əsl sizə lazım olan.
                    </h3>
                    <h4> 2 519 AZN</h4>
                    <p>Faizsiz taksitlə 227 AZN-dən</p>
                    <button className='indiAl'>İndi alın</button>
                </div>
                <div className="productImg">
                    <img src={iphone14violet} alt="iphone14" />
                </div>
            </div>
        </div>
    )
}

export default Taksit