import React from 'react';
import ProductsList from '../components/homepage/ProductsList';
import Taksit from '../components/homepage/Taksit';
import '../styles/homepage/Homepage.css';
import Services from '../components/homepage/Services';
import Brends from '../components/homepage/Brends';
import { useSelector } from 'react-redux';

import BootstrapCarouselComponent from '../components/homepage/BootstrapCarouselComponent'

const Homepage = () => {

    const auth = useSelector(state => state.authReducer.isLogin)

    return (
        <div className='Homepage'>
            <BootstrapCarouselComponent/>
            <ProductsList title={'Bütün məhsullar'} path={'/products'} />
            <ProductsList title={'Yeni gələn məhsullar'} args={{
                sortBy: 'price',
                sortOrder: 'desc',
            }} path={'/products'}/>
            <Taksit/>   
            <ProductsList title={'Yeni gələn aksesuarlar'} path={'/products?kategoriya=Aksesuarlar'} args={
                {category_slug: 'aksesuarlar'}
            } />
            <Services />
            <Brends/>
        </div>
    )
}

export default Homepage