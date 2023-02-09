import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import commerce from '../commerce/commerce'
import '../styles/cart/cart.css'
import shopping from '../assets/cart/shopping-cart.svg'
import { setCartItems } from '../Redux/reducer/cartItems';
import { ClipLoader } from "react-spinners";
import { GridLoader } from 'react-spinners';
import Total from '../components/Total';
import CartItem from '../components/cart/CartItem';


const Cart = () => {



    let cartItems = useSelector(state => state.cartItemsReducer.cartItems);
    const dispatch = useDispatch();

    const [data, setData] = useState([])
    const [cart, setCart] = useState({})
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        commerce.cart.retrieve().then((cart) => {
            setCart(cart);
            setData(cart.line_items);
            setLoading(false)
        });
    },[])
    useEffect(() => {
        // setLoading(true)
        commerce.cart.retrieve().then((cart) => {
            setCart(cart);
            setData(cart.line_items);
            // setLoading(false)
        });
    }, [cartItems])

    const EmptyCart = () => {
        return <div className="emptyCart">
            <img className='shoppingImg' src={shopping} alt="" />
            <p className='emptyP'>Səbətiniz halhazırda boşdur</p>
            <Link to='/' className='continueShopping'>Alış-verişə davam et</Link>
        </div>
    }

    const Items = () => {
        return <div className="items">
            {data.map((el, i) => {
                return <CartItem key={i} el={el} i={i} setCart={setCart} setData={setData} />
            })}
        </div>
    }


    return (
        <div className='cart'>
            <p className='cartItemsCount'>{`Səbət (${cart?.total_unique_items || 0} məhsul)`}</p>
            <div className="cartContent">
                {loading ? <div><GridLoader color='#2DD06E' className='gridLoader' /></div> : !cartItems ?
                    <EmptyCart /> :
                    <>
                        <Items />
                        <div className='totalContent'>
                            <Total subTotal={cart?.subtotal?.formatted_with_symbol} />
                            <Link  to='/checkout'><button id='passToCheckout'>Sifarişi rəsmiləşdir</button></Link>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Cart