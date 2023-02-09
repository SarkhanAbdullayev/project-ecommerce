import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../styles/signup/signup.css'
import google from '../assets/signup-login/google.svg'
import facebook from '../assets/signup-login/facebook.svg'
import gotoSignup from '../assets/signup-login/gotoSignup.svg'
import checked from '../assets/products/checked.svg'
import {BsEye} from 'react-icons/bs'
import { BsEyeSlashFill } from 'react-icons/bs'
import SignupModal from '../components/signup/SignupModal'
import { MoonLoader } from 'react-spinners'


const Signup = () => {

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm();

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    async function createCustomer(data) {

        setLoading(true);
        
        const headers = {
            "X-Authorization": "sk_49295c0fcbdb14af33d4805587b898a0041c7829bc9f8",
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        const body = {
            email: data.email,
            phone: data.phone,
            password: data.password,
            firstname: data.name,
        }
        
        const res = await fetch('https://api.chec.io/v1/customers', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        if (res.status == 201) {
            setLoading(false);
            navigate('/signup/success')
        }
        else {
            setLoading(false);
            handleOpen();
        }
    }

    return (
        <div className='signup'>
            <div className="signupContent">
                <h2 className='signupTitle'>Qeydiyyat</h2>
                <div className="withSocials">
                    <Link className="facebook">
                        <div className="facebookImgDiv">
                            <img className='facebookImg' src={facebook} alt="" />
                        </div>
                        <p>Facebook ilə</p>
                    </Link>
                    <Link className="google">
                        <div className="googleImgdiv">
                            <img className='googleImg' src={google} alt="" />
                        </div>
                        <p>Google ilə</p>
                    </Link>
                </div>
                <p className='or'>və ya</p>
                <form className='signupForm' onSubmit={handleSubmit(createCustomer)}>
                    <label className='nameLabel label' htmlFor="">Ad, Soyad</label>
                    <input className='input name' type="text" placeholder='Ad və soyadınızı daxil edin' {...register("name", {
                        required: true,
                        minLength: 3
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.name?.type == 'required' && 'Adınızı qeyd edin'}
                            {errors?.name?.type == 'minLength' && 'Ad minimum 3 herfden ibaret olmalidir'}</p>
                    </div>

                    <label className='emailLabel label' htmlFor="">E-mail</label>
                    <input className='input email' type="text" placeholder='nümunə@gmail.com' {...register("email", {
                        required: 'ad minimum 5 herfden ibaret olmalidir',
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.email?.type == 'required' && 'Emailinizi qeyd edin'}</p>
                    </div>

                    <label className='numberLabel label' htmlFor="">Mobil nömrə</label>
                    <input className='input mobileNumberInput' type="text" placeholder='0770000000' {...register("phone", {
                        required: 'Mobil nömrəni qeyd edin',
                        minLength: 10,
                        maxLength: 10,
                    })} />
                    <div className='errorMsgDiv'>
                        <p>{errors?.phone?.type == 'minLength' && 'Nömrə 10 rəqəmdən ibarət olmalıdır'}
                            {errors?.phone?.type == 'required' && 'Mobil nömrənizi qeyd edin'}
                        </p>
                    </div>
                    
                    <label className='passwordLabel label' htmlFor="">Şifrə</label>
                    <input className='input password' type={showPassword ? 'text' : 'password'} placeholder='Şifrənizi daxil edin' {...register("password", {
                        required: 'Parol minimum 6 hərf və ya rəqəmdən ibarət olmalıdır',
                        minLength: 6,
                    })} />
                    <div className="showPassword" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEye /> : <BsEyeSlashFill />}</div>
                    <div className='errorMsgDiv'>
                        <p>{errors?.password?.type == 'minLength' && 'Parol minimum 6 hərf və rəqəmlərdən ibarət olmalıdır'}
                            {errors?.password?.type == 'required' && 'Şifrənizi qeyd edin'
                        }</p>
                    </div>

                    <div className='rulesDiv'>
                        <input className='rulesCheck' type="checkbox" {...register("checkRules" ,{required : true})}/>
                        <div className="checkDiv" ><img className='checkImg' src={checked} alt="" /></div>
                        <Link className='rules'>İstifadəçi şərtləri</Link>
                        <p className='agree'>ilə razıyam</p>
                    </div>
                    {loading ? <div className='mb-44 w-full h-12 flex justify-center items-center border-2 border-green-400 rounded'><MoonLoader size={24} color='#00D68F'/></div> : <button className='submitBtn' type="submit" style={{opacity: isValid ? '1' : '0.3'}}>Qeydiyyat</button>}
                </form>
            </div>
            <div className="goToSignup">
                <img className='bgGrid' src={gotoSignup} alt=""/>
                <p className='signupP'>Artıq hesabınız var?<Link to='/login' className='signupLink'>Daxil olun </Link></p>
            </div>
            <SignupModal handleOpen={handleOpen} open={open} setOpen={setOpen} />
        </div>
    )
}

export default Signup