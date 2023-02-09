import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import commerce from '../../commerce/commerce';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderDetails } from '../../Redux/reducer/orderReducer';
import { NavItem } from 'react-bootstrap';
import OrderItem from './OrderItem';
import Order from './Order';
import card from '../../assets/checkout/card.svg'
import { BiArrowBack } from 'react-icons/bi'

const OrderDetails = () => {

    const orders = useSelector(state => state.orderReducer.orders);

    console.log(orders);

    const orderDetails = useSelector(state => state?.orderReducer?.orderDetails);
    const { customerId, token } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     const url = new URL(
    //         `https://api.chec.io/v1/customers/${customerId}/orders/${orderDetails}`
    //     );

    //     const headers = {
    //         "X-Authorization": token,
    //         "Accept": "application/json",
    //         "Content-Type": "application/json",
    //     };

    //     fetch(url, {
    //         method: "GET",
    //         headers: headers,
    //     })
    //         .then(response => console.log(response.json()));
    // },[])


    return (
        <div className='orderDetails'>
            <div className="backToOrders">
                <Link to='/profile/orders'><BiArrowBack /></Link>
                <p>Sifarişin detalları</p>
            </div>
            <div id='orderDetailsContent'>
                <div className="orderItems">
                    {orderDetails?.order?.line_items?.map((item, i) => <OrderItem created={orderDetails?.created} item={item} key={i} />)}
                </div>
                <div className="customerDetails">
                    <div className="customer">
                        <h3>Şəxsi məlumatlar</h3>
                        <p className='firstname'>{orderDetails?.customer?.firstname}</p>
                        <p className='lastname'>{orderDetails?.customer?.lastname}</p>
                        <p className='number'>{orderDetails?.customer?.phone}</p>
                        <p className='email'>{orderDetails?.customer?.email}</p>
                    </div>
                    <div className="delivery">
                        <h3>Çatdırılma ünvanı</h3>
                        <p className='street'>{orderDetails?.shipping?.street}</p>
                        <p className='home'>{orderDetails?.shipping?.street_2}</p>
                    </div>
                </div>
                <div className="checkoutDetails">
                    <h3 className='detailsTitle'>Ödəmə detalları</h3>
                    <div className="details">
                        <div className="detailsRow">
                            <h5>Ödəmə metodu</h5>
                            <div className="rowContent flex">
                                <img src={card} alt="" className='mr-2' />
                                <p>Kart ilə</p>
                            </div>
                        </div>
                        <div className="detailsRow">
                            <h5>Toplam məbləğ</h5>
                            <p>{orderDetails?.order?.subtotal?.formatted_with_symbol}</p>
                        </div>
                        <div className="detailsRow">
                            <h5>Promo kod</h5>
                            <p>0 ₼ </p>
                        </div>
                    </div>
                </div>
                <div className="totalPrice">
                    <p className="totalTitle">Cəmi</p>
                    <p className="total">{orderDetails?.order?.total?.formatted_with_symbol}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails