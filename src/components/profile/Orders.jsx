import React, { useState, useEffect } from 'react'
import shopping from '../../assets/cart/shopping-cart.svg'
import commerce from '../../commerce/commerce';
import { useSelector, useDispatch } from 'react-redux'
import Order from './Order';
import { GridLoader } from 'react-spinners';
import { setOrders } from '../../Redux/reducer/orderReducer';

const Orders = () => {

    const [loading, setLoading] = useState(false)
    const [ordersList, setOrdersList] = useState([])

    const dispatch = useDispatch();

    const customerId = useSelector(state => state.authReducer.customerId)
    const ordersData = useSelector(state => state.orderReducer.orders)

    console.log(ordersData);

    useEffect(() => {

        if (!ordersData) {
            setLoading(true)
            commerce.customer.getOrders(customerId).then((orders) => {
                console.log(orders.data);
                setOrdersList(orders.data);
                dispatch(setOrders(orders.data));
                setLoading(false)
            })
        }
        else {
            setOrdersList(ordersData)
        }

    }, [])


    const EmptyCart = () => {
        return <div className="emptyCart">
            <img className='shoppingImg' src={shopping} alt="" />
            <p className='emptyP text-gray-400 text-center'>Səbətinizdə hazırda heç bir sifarişiniz yoxdur</p>
        </div>
    }

    return (
        <div className='ordersTab'>
            <h1>Sifarişlərim</h1>
            <div className="ordersContent">
                {loading ? <div style={{height : '600px', marginTop: '200px'}}><GridLoader color='#2DD06E' /></div> : ordersList?.length > 0 ? ordersList.map((item, i) => {
                    return (
                        <Order key={i} item={item} />
                    )
                }) : <EmptyCart />}


            </div>
        </div>
    )
}

export default Orders