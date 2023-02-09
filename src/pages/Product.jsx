import React, { useState, useEffect, } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import commerce from "../commerce/commerce";
import { setCartItems } from "../Redux/reducer/cartItems";
import { setProduct } from "../Redux/reducer/currentProduct";
import ReactImageGallery from "react-image-gallery";
import ReactStars from "react-rating-stars-component";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FiMinus } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'

import { ClipLoader } from "react-spinners";

import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import "../styles/product/product.css";

import card from "../assets/product/card.svg";

const Product = () => {

  const productId = useSelector(state => state.productReducer.product);
  const auth = useSelector(state => state.authReducer.isLogin);

  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cartItemsReducer.cartItems);
  const dispatch = useDispatch();

  const params = useParams()

  const [searParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    commerce.products
      .list({
        query: params.product,
      })
      .then((product) => dispatch(setProduct(product.data[0].id)));
  }, [])


  const [phone, setPhone] = useState({});

  const [count, setCount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [addToCardLoading, setAddToCardLoading] = useState(false);

  const [images, setImages] = useState([])

  const [currentVariantOptn, setCurrentVariantOptn] = useState({});

  useEffect(() => {
    setLoading(true);
    setImages([...[]]);
    commerce.products.retrieve(productId)
      .then((product) => {
        setPhone(product);
        product?.assets?.map(el => {
          setImages(prev => [...prev, { original: el.url, thumbnail: el.url }])
        })

        setLoading(false);
      });
  }, [productId]);


  const addToCart = () => {
    setAddToCardLoading(true)
    auth ? commerce.cart.add(productId, count, {
      // currentVariantOptn[0] : currentVariantOptn[1],
    }).then((response) => {
      dispatch(setCartItems(response.total_unique_items));
      setAddToCardLoading(false)
    }) : navigate('/login')

  }

  const CommentDiv = () => {
    return <div className="commentDiv">
      <div className="raitDiv">
        <h2>4</h2>
        <ReactStars value={4} edit={false} classNames={"stars"} size={32} />
      </div>
      <div className="commentContent">
        <div className="raitTitle">
          <h3>Gunel Mammadova</h3>
          <p>5 gün əvvəl</p>
        </div>
        <p className="raitRom">Yaddaş - 64, Rəng - Qara</p>
        <p className="raitDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis viverra lacus ut et
          etiam. Vel ut in nunc nunc ut sit nibh tortor sit. Consectetur sit auctor odio quis suspendisse
          tincidunt quis. Et tristique amet aenean nibh porttitor quis aliquam integer. Consectetur lacus,
          volutpat malesuada libero. Sollicitudin libero pharetra a.</p>
      </div>
    </div>
  }


  return (
    loading ? <div style={{height: '800px'}}><ClipLoader id="loading" color="#2DD06E" /></div> : <div className="product">
      <div className="productContent">
        <div className="productSlider">
          <ReactImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            className='imageGallery'
          />
        </div>
        <div className="productInfo">
          <h3 className="productName">{phone?.name}</h3>
          <ReactStars classNames={"stars"} size={24} />
          <p className="price">{phone?.price?.formatted_with_symbol}</p>
          <div className="underLine"></div>
          <div className="roms">
            <p className="romsP">Yaddaş:</p>
            <div className="rom">256GB</div>
            <div className="rom">128GB</div>
            <div className="rom">64GB</div>
          </div>
          <div className="underLine"></div>
          <div className="countDiv">
            <div className="dec" onClick={() => setCount(prev => prev - 1)}>
              <FiMinus />
            </div>
            <div className="count">{count}</div>
            <div className="inc" onClick={() => setCount(prev => prev + 1)}>
              <FiPlus />
            </div>
          </div>
          {addToCardLoading ? <div className="addCardLoading border-2 border-solid border-green-400 h-12 w-48 flex justify-center items-center rounded-3"><ClipLoader color="#2DD06E"/></div> : <div className="card" onClick={() => addToCardLoading ? {} : addToCart()}>
            <img className="cardImg" src={card} alt="" />
            <p className="addToCard">Səbətə at</p>
          </div>}
        </div>
      </div>
      <div className="characterAbout">
        <Tabs
          defaultActiveKey="Texniki"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Texniki" title="Texniki Xüsusiyyətləri">
            <div className="tab1 mt-8 flex flex-col md:flex-row">
              <div className="character sm:w-100 md:w-1/2">
                <h3 className="title w-11/12 mx-auto mb-6 text-xl" >Əsas göstəricilər</h3>
                <div className="charts flex justify-between w-10/12 mx-auto mb-6">
                  <p className="main text-gray-400">İstehsalçı</p>
                  <p className="subMain text-gray-400">Apple</p>
                </div>
                <div className="charts flex justify-between w-10/12 mx-auto mb-6">
                  <p className="main text-gray-400">Processor</p>
                  <p className="subMain text-gray-400">Bionic A14</p>
                </div>
                <div className="charts flex justify-between w-10/12 mx-auto mb-6">
                  <p className="main text-gray-400">Ram</p>
                  <p className="subMain text-gray-400">6 GB</p>
                </div>
                <div className="charts flex justify-between w-10/12 mx-auto mb-6">
                  <p className="main text-gray-400">Yaddaş</p>
                  <p className="subMain text-gray-400">128 GB</p>
                </div>
              </div>
              <div className="about sm:w-100 md:w-1/2">
                <h3 className="aboutH3 text-xl mb-4 w-11/12 mx-auto">Məhsul haqqında</h3>
                <p className="abputP text-gray-400 w-10/12 mx-auto" dangerouslySetInnerHTML={{ __html: phone?.description }} />
              </div>
            </div>
          </Tab>
          <Tab eventKey="Rəylər" title="Rəylər">
            <CommentDiv />
            <CommentDiv />
            <CommentDiv />
            <CommentDiv />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};



export default Product;
