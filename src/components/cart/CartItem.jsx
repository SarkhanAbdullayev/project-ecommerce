import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '../../Redux/reducer/cartItems'
import { ClipLoader } from 'react-spinners'
import commerce from '../../commerce/commerce'

const CartItem = ({ el, i, setCart, setData }) => {
    
    let cartItems = useSelector(state => state.cartItemsReducer.cartItems);
    const dispatch = useDispatch();

    const [countLoading, setCountLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    return (
        <div className="item">
            <div className="imgDiv">
                <img src={el.image.url} alt="" />
            </div>
            <div className="info">
                <h3 className='name'>{el.name}</h3>
                <div className="colorPrice">
                    <p className='color'>Rəng: <span className='colorSpan'>Bənövşəyi</span></p>
                    <p className='price'>{el.price.formatted_with_symbol}</p>
                </div>
            </div>
            {countLoading ? <div className="counterLoaderDiv">
                <ClipLoader color="#2DD06E" className='counterLoader' />
            </div> : <div className="counter">
                <div className="decrement" onClick={() => {
                    setCountLoading(true)
                    commerce.cart.update(el.id, { quantity: el.quantity - 1 }).then(response => {
                        setData(response.line_items);
                        setCart(response);
                        el.quantity == 1 && dispatch(setCartItems(cartItems - 1));
                        setCountLoading(false)
                    });

                }}></div>
                <div className="count">{el.quantity}</div>
                <div className="increment" onClick={() => {
                    setCountLoading(true)
                    commerce.cart.update(el.id, { quantity: el.quantity + 1 }).then(response => {
                        setData(response.line_items);
                        setCart(response);
                        setCountLoading(false)
                    });
                }}></div>
            </div>}
            {deleteLoading ? <ClipLoader color="#2DD06E" /> : <div className='deleteDiv'>
                <div className="delete" onClick={() => {
                    setDeleteLoading(true);
                    commerce.cart.remove(el.id).then(response => {
                        cartItems > 0 && dispatch(setCartItems(cartItems - 1));
                        setDeleteLoading(false);
                    });
                }}></div>
            </div>}
        </div>
    )
}

export default CartItem