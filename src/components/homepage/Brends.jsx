import React from 'react';
import ReactImageGallery from "react-image-gallery";
import { Swiper } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import { SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper';



import '../../../node_modules/swiper/swiper.min.css'
import '../../../node_modules/swiper/swiper-bundle.css'
import '../../../node_modules/swiper/swiper-bundle.min.css'

import toshiba from '../../assets/homepage/toshiba.svg'
import philips from '../../assets/homepage/philips.svg'
import hp from '../../assets/homepage/hp.svg'
import electrolux from '../../assets/homepage/electrolux.svg'
import gorenje from '../../assets/homepage/gorenje.svg'
import bosch from '../../assets/homepage/bosch.svg'
import samsung from '../../assets/homepage/samsung.png'


const images = [
    {
      original: toshiba
    },
    {
      original: philips
    },
    {
      original: hp
    },
    {
      original: electrolux
    },
    {
      original: gorenje
    },
    {
      original: bosch
    },
    {
      original: samsung
    },
];


const Brends = () => {
    return (
      <div className='brends'>
        <Swiper className="mySwiper"
          // initialSlide={0}
          slidesPerView={5}
          spaceBetween={20}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[Pagination, Autoplay]}

          autoplay={
            {delay:5000}
          }

          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        loop={true}>
          {images.map((el, i) => {
            return <SwiperSlide data-swiper-autoplay="2000" key={i}><img src={el.original} alt="" /></SwiperSlide>
          })}
      </Swiper>
        </div>
    )
}

export default Brends