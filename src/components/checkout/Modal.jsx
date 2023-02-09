import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import success from '../../assets/signup-login/success.svg'
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
};

export default function BasicModal({ open, handleClose }) {

    const navigate = useNavigate();

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="success w-40 h-40 mt-10 mx-auto mb-10 bg-white border-4 border-green-400 p-8 rounded-full">
                        <img src={success} alt="" className=' w-26 ' />
                    </div>
                    <div className="congrulation bg-green-400 h-56 flex flex-col align-center justify-around rounded-b-lg">
                        <p className='mx-auto text-white text-lg'>Təbriklər ! Ödəniş uğurla həyata keçirildi</p>
                        <button to={'/login'} className='continue bg-white w-60 h-12 rounded-lg mx-auto text-xl text-green-500 shadow-inner hover:shadow-green-600 hover:text-green-500 font-semibold transition-all duration-300' onClick={() => {
                            navigate('/', { replace: true })
                            // handleClose();
                        }}>Alış-verişə davam et</button>
                        <button to={'/login'} className='continue bg-white w-60 h-12 rounded-lg mx-auto text-xl text-green-500 shadow-inner hover:shadow-green-600 hover:text-green-500 font-semibold transition-all duration-300' onClick={() => {
                            navigate('/profile/orders', { replace: true })
                            // handleClose();
                        }}>Sifarişə keç</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}