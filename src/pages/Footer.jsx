import React from 'react'
import '../styles/footer/footer.css'
import emailSvg from '../assets/footer/email.svg'
import facebookSvg from '../assets/footer/facebook.svg'
import instagramSvg from '../assets/footer/instagram.svg'
import locationSvg from '../assets/footer/location.svg'
import phoneSvg from '../assets/footer/phone.svg'
import twitterSvg from '../assets/footer/twitter.svg'
import youtubeSvg from '../assets/footer/youtube.svg'
import telloSvg from '../assets/telloIcon.svg'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footerMain">
                <div className="telloSocial">
                    <div className="telloDiv">
                        <img src={telloSvg} alt="" />
                        <h5 className='telloH5'>Tello</h5>
                    </div>
                    <div className="socials">
                        <img src={instagramSvg} alt="" />
                        <img src={facebookSvg} alt="" />
                        <img src={youtubeSvg} alt="" />
                        <img src={twitterSvg} alt="" />
                    </div>
                </div>
                <div className="menuDiv">
                    <a className='footmenu' href="">Menu</a>
                    <a href="">Yeni</a>
                    <a href="">Endirimlər</a>
                    <a href="">Aksesuarlar</a>
                    <a href="">Bütün brendlər</a>
                </div>
                <div className="helpDiv">
                    <a className='foothelp' href="">Kömək</a>
                    <a href="">Tez-tez soruşulan suallar</a>
                    <a href="">Çatdırılma xidməti</a>
                    <a href="">Geri qaytarılma şərtləri</a>
                </div>
                <div className="connectDiv">
                    <a className='footConnect' href="">Əlaqə</a>
                    <div className='locationDiv'>
                        <img src={locationSvg} alt="" />
                        <p>M. K. Ataturk avenue 89, Baku, Azerbaijan</p>
                    </div>
                    <div className='emailDiv'>
                        <img src={emailSvg} alt="" />
                        <p>example@gmail.com</p>
                    </div>
                    <div className='phoneDiv'>
                        <img src={phoneSvg} alt="" />
                        <p>*2108</p>
                    </div>
                </div>
            </div>
            <div id='footerLine'></div>
            <div className="footerEnd">
                <p className='copyright'>© Tello 2023. Bütün hüquqlar qorunur.</p>
                <div className='rules'>
                    <a href="#">Qaydalar və şərtlər</a>
                    <a href="#">Məxfilik siyasəti</a>
                </div>
            </div>
        </div>
    )
}

export default Footer