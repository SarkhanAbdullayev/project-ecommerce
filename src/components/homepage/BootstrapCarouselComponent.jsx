import React from "react";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import sliderImg1 from '../../assets/slider/air.png'
import sliderImg2 from '../../assets/slider/iPhone13slider.png'
import sliderImg3 from '../../assets/slider/iWatch.png'

const data = [
    {
        title: 'Macbook Air',
        description: 'Yeni nəsil M2 çipi ilə yenilənmiş MacBook Air heyrətamiz dərəcədə nazikdir. O, tamamilə alüminiumdan hazırlanmış korpusa, müstəsna sürətə və enerji səmərəliliyinə malikdir.Bu, ürəyiniz istəyən yerdə işləmək, oyun oynamaq və ya demək olar ki, istənilən növ yaradıcılıqla məşğul olmaq imkanı verən ultrakompakt və ultraməhsuldar noutbukdur.',
        url: sliderImg1,
        transform: 0,
    },
    {
        title: 'Iphone 14',
        description: 'Qarşınızda iPhone 14 . Crash Detection funksiyası Heç vaxt olmadığı qədər uzun batareya ömrü. Və zəif işıq şəraitində daha möhtəşəm çəkilişlər. Bütün bunlar beş gözəl rəng seçimi ilə.',
        url: sliderImg2,
        transform: -33.33,
    },
    {
        title: 'Apple Watch',
        description: 'Möhkəm dizaynda güzəştsiz qabiliyyət. Sıx şəhər yerlərində misilsiz GPS dəqiqliyi. 36 saata qədər batareyanın işləmə müddəti. İdmançılar və macəra həvəskarları üçün hər növ üç xüsusi qayış. Sağlam, təhlükəsiz və bağlı qalmaq üçün sizə lazım olan bütün xüsusiyyətlər.',
        url: sliderImg3,
        transform: -66.66,
    },
]

class BootstrapCarouselComponent extends React.Component {
    render() {
    return (
    <div style={{width: '90%', margin: '40px auto'}}>
    <div className='container-fluid' >
    <div className="row">
    </div>
    <div className="row">
    <div className="col-12 p-0">
    <Carousel interval="3000" pause={'hover'} prevIcon={false} nextIcon={false}>
        {data.map((el, i) => {
            return (
                <Carousel.Item key={i}>
                    <div style={{height: '500px'}} className="sliderDiv w-100 item flex flex-col md:flex-row justify-between md:py-16">
                        <div className="information w-12/12 md:w-5/12 my-auto">
                            <h2 className="text-2xl md:text-5xl font-bold mb-4 text-center md:text-left">{el.title}</h2>
                            <p className="text-center md:text-left">{el.description}</p>
                        </div>
                        <div className="sliderImgDiv w-12/12 md:w-5/12 my-auto">
                            <img src={el.url} alt="" />
                        </div>
                    </div>
                </Carousel.Item>
            )
        })}
    </Carousel>
    </div>
    </div>
    </div>
    </div>
    )
    };
}
export default BootstrapCarouselComponent;