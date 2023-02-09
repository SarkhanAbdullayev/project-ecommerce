import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import commerce from '../commerce/commerce.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { setProduct } from '../Redux/reducer/currentProduct.js'
import '../styles/header/header.css'
import telloSvg from '../assets/telloIcon.svg'
import personSvg from '../assets/header/person.svg'
import favoriteSvg from '../assets/header/favorite.svg'
import basketSvg from '../assets/header/basket.svg'
import searchSVG from '../assets/header/search.svg'
import { setCartItems } from '../Redux/reducer/cartItems.js'
import { GridLoader } from 'react-spinners';


const Header = () => {

    const location = useLocation();

    useEffect(() => {
        const body = document.querySelector('body');
        body.addEventListener('click', (e) => {
            !searchedRef?.current?.contains(e.target) && !inputRef?.current?.contains(e.target) && sethideSearched(false);
        })
    }, [])


    const auth = useSelector(state => state.authReducer.isLogin)

    const cartItems = useSelector(state => state.cartItemsReducer.cartItems);

    const [burger, setBurger] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [brands, setBrands] = useState([]);
    const [searchedData, setSearchedData] = useState([])

    const [hideSearched, sethideSearched] = useState(false)
    const [loading, setLoading] = useState(false)


    const inputRef = useRef();
    const searchedRef = useRef();
    const chechboxRef = useRef();

    const dispatch = useDispatch()

    let historyData = JSON.parse(localStorage.getItem('searchHistory')) || []


    //navbar products search useffect
    useEffect(() => {

        const id = setTimeout(() => {
            inputValue && commerce.products.list({
                query: `${inputValue}`,
            }).then(response => setSearchedData(response.data));
            addToHistory()
        }, 1500);

        return () => clearTimeout(id)

    }, [inputValue])

    useEffect(() => {
        setLoading(true)
        commerce.cart.retrieve().then((cart) => dispatch(setCartItems(cart.total_unique_items)));
        async function getBrands() {
            const { data } = await commerce.categories.list();
            setBrands(data[2].children);
            setLoading(false)
        }
        getBrands()
    }, [])


    const addToHistory = () => {
        if (inputValue) {
            const newData = historyData.filter(el => el != inputValue);
            newData.push(inputValue)
            localStorage.setItem('searchHistory', JSON.stringify(newData));

        }
    }

    const clearHistory = () => {
        localStorage.removeItem('searchHistory');
        setInputValue(null);
    }

    return (
        loading ? <div className='fixed top-0 z-20 w-full h-full bg-white flex items-center justify-center'><GridLoader color='#2DD06E'/></div> : 
        <nav className="header">
            <div className="headerMain">
                <div className="burger">
                    <input className="checkbox" ref={chechboxRef} type="checkbox" name="" id="" onChange={(e) => {
                        e.target.checked ? setBurger('translateX(0%)') : setBurger('translateX(-100%)')
                    }} />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                </div>
                <Link to='/' className="telloBox">
                    <img className='telloImg' src={telloSvg} alt="a" />
                    <h2 className='telloText'>Tello</h2>
                </Link>
                <form className="searchDiv" onSubmit={(e) => {
                    e.preventDefault();
                    addToHistory();
                    setInputValue('');
                    inputRef.current.value = '';
                }}>
                    <button type="submit"><img className='searchSvg' src={searchSVG} alt="" /></button>
                    <input ref={inputRef} className='search' type="text" placeholder='Axtarış...' onChange={(e) => setInputValue(e.target.value)} onClick={(e) => {
                        sethideSearched(true);
                    }} />
                    <div className="searchedProducts" ref={searchedRef} style={{ display: hideSearched ? 'block' : 'none' }}>
                        <div className="historyDiv">
                            <h5 className='lastSearch'>Son axtarışlar</h5>
                            <button className='clearBtn' onClick={() => clearHistory()}>Təmizlə</button>
                        </div>
                        <div className="history">
                            {historyData.map((el, i) => {
                                return <span key={i} className='keyword' onClick={() => setInputValue(el)}>{el}</span>
                            })}
                        </div>
                        <div className="productList">
                            {searchedData ? searchedData.map((el, i) => {
                                return <Link to={`/products/${el.name}`} key={i} className='item' onClick={() => {
                                    dispatch(setProduct(el.id));
                                    inputRef.current.value = '';
                                    sethideSearched(false)
                                }}>
                                    <img className='itemImg' src={el.image.url} alt="" />
                                    <div className="itemInfo">
                                        <h5 className='itemName'>{el.name}</h5>
                                        <p className='itemPrice'>{el.price.formatted_with_symbol}</p>
                                    </div>
                                </Link>
                            }) : <p>Nəticə tapılmadı..</p>}
                        </div>
                    </div>
                </form>
                <div className="navigation">
                    <Link to={auth ? '/profile/info' : '/login'} className='navIcon person'><img className='navIconImg personImg' src={personSvg} alt="" srcSet="" /></Link>
                    <div className='favoritIcon person'>
                        <img className='favoritIconImg personImg' src={favoriteSvg} alt="" srcSet="" />
                    </div>
                    <Link to={auth ? '/card' : '/login'} className='basketIcon person'><img className='basketIconImg personImg' src={basketSvg} alt="" srcSet="" /></Link>
                    {auth && <div className="itemCount"><p>{cartItems}</p></div>}
                </div>
            </div>
            <div className="categories" style={{ transform: burger }}>
                {brands.map((el, i) => {
                    return <Link key={i} to={`/products${el.name == 'Bütün Brendlər' ? '' : `?${el.name != 'Aksesuarlar' ? 'brand' : 'kategoriya'}=${el.name}`}`} onClick={() => {
                        setBurger(false);
                        chechboxRef.current.checked = false;
                        setInputValue('')
                    }}>{el.name}</Link>
                })}
            </div>
        </nav>
    )
}

export default Header