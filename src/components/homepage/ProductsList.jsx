import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import '../../styles/homepage/productsList.css'
import commerce from '../../commerce/commerce'
import arrowRight from '../../assets/homepage/arrow-right.svg'
import { useDispatch } from 'react-redux/es/exports'
import { setProduct } from '../../Redux/reducer/currentProduct'



const ProductsList = ({ title, args, path }) => {
    
    const dispatch = useDispatch();

    const [data, setData] = useState([])
    
    useEffect(() => {
        commerce.products.list(args).then((product) => setData(product.data));
        
    }, [])


    return (
        <div className='productsList'>
            <div className="listHead">
                <h3>{title}</h3>
                <Link to={path} className='listArrow' >
                    <p>Hamısına bax</p>
                    <img src={arrowRight}></img>
                </Link>
            </div>
            <div className="contents">
                {data.map((el,index) => {
                    if (index <= 3) {
                        return <Link to={`/products/${el.name}`} key={index} className="listContent" onClick={() => { dispatch(setProduct(el.id)) }}>
                    <div className="imgDiv">
                        <img src={el?.image.url} alt="" />
                    </div>
                    <h3>{el?.name}</h3>
                    <p>{el?.price.formatted_with_symbol}</p>
                    </Link>
                }
                })}
            </div>
        </div>
    )
}

export default ProductsList