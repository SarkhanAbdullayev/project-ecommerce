import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/login/login.css'
import google from '../assets/signup-login/google.svg'
import facebook from '../assets/signup-login/facebook.svg'
import gotoSignup from '../assets/signup-login/gotoSignUp.svg'
import {BsEye} from 'react-icons/bs'
import { BsEyeSlashFill } from 'react-icons/bs'
import { MoonLoader } from 'react-spinners'

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();


    async function login() {

        setLoading(true)
        
        const url = new URL(
            "https://api.chec.io/v1/customers/email-token"
        );
        
        const headers = {
            "X-Authorization": "sk_49295c0fcbdb14af33d4805587b898a0041c7829bc9f8",
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        const body = {
            email,
            base_url: 'http://127.0.0.1:5173/login/logged',
        }
        
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
            setUser(response);
            console.log(response);
            navigate('/login/checkEmail', { replace: true });
            setLoading(false);
        });
    }
    

    return (
        <div className='login'>
            <div className="loginContent">
                <h2 className='loginTitle'>Daxil ol</h2>
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
                <form className='loginForm' onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}>
                    <label className='emailLabel' htmlFor="">E-mail</label>
                    <input className='email' type="email" placeholder='nümunə@gmail.com' onChange={(e)=> setEmail(e.target.value)}/>
                    <label className='passwordLabel' htmlFor="">Şifrə</label>
                    <input className='password' type={showPassword ? 'text' : 'password'} placeholder='Şifrənizi daxil edin' />
                    <div className="showPassword" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <BsEye/> : <BsEyeSlashFill/>}</div>
                    <Link className='forgetPassword'>Şifrəni unutmusunuz?</Link>
                    {loading ? <div className='mb-44 w-full h-12 flex justify-center items-center border-2 border-green-400 rounded'><MoonLoader size={24} color='#00D68F'/></div> : <button className='submitBtn' type="submit">Daxil ol</button>}
                </form>
            </div>
            <div className="goToSignup">
                <img className='bgGrid' src={gotoSignup} alt="" />
                <p className='signupP'>Hesabınız yoxdur?<Link to='/signup' className='signupLink'>Qeydiyyatdan keçin</Link></p>
            </div>
        </div>
    )
}

export default Login