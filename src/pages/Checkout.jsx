import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../Redux/reducer/cartItems';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Total from '../components/Total';
import { useForm } from 'react-hook-form'
import FirstStepContent from '../components/checkout/FirstStepContent';
import SecondStepContent from '../components/checkout/SecondStepContent';
import ThirdStepContent from '../components/checkout/ThirdStepContent';
import CheckoutForm from '../components/checkout/CheckoutForm';
import commerce from '../commerce/commerce'

import '../styles/checkout/checkout.css'

import BasicModal from '../components/checkout/Modal';




function Checkout() {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [checkoutToken, setCheckoutToken] = useState('');

    useEffect(() => {
        async function getCart() {
            const cart = await commerce.cart.retrieve();
            const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
            setCheckoutToken(token);
        }
        getCart();
    }, [])

    const infoFormSubmit = (data, i) => {
        setInfoData({
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email
        })
        handleNext();
    }
    const deliverySubmit = (data) => {
        setDeliveryData({
            address: data?.address,
            home: data?.home,
            note: data?.note,
        })
        handleNext();
    }
    const payVariantSubmit = () => {
        setPaymentData(checkoutVariant);
        handleNext();
    }


    const [infoData, setInfoData] = useState('');
    const [deliveryData, setDeliveryData] = useState('');
    const [paymentData, setPaymentData] = useState('');
    const [checkoutData, setCheckoutData] = useState('')
    const [activeStep, setActiveStep] = React.useState(0);
    const [checkoutVariant, setcheckoutVariant] = useState('');

    const [loading, setLoading] = useState(false);

    //modal state 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //* --------= steps data array =---------
    const steps = [
        {
            label: '1. Şəxsi məlumatlar',
            description: <FirstStepContent
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                infoFormSubmit={infoFormSubmit}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
            />,
            content: <div>
                <p>{`${infoData?.firstname} ${infoData?.lastname}`}</p>
                <p>{infoData?.phone}</p>
                <p>{infoData?.email}</p>
            </div>
        },
        {
            label: '2. Çatdırılma',
            description: <SecondStepContent
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                infoFormSubmit={infoFormSubmit}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                deliverySubmit={deliverySubmit}
            />,
            content: <div>
                <p>{deliveryData?.address}</p>
                <p>{deliveryData?.home}</p>
                <p>{deliveryData?.note}</p>
            </div>
        },
        {
            label: '3. Ödəmə üsulu',
            description: <ThirdStepContent
                payVariantSubmit={payVariantSubmit}
                checkoutVariant={checkoutVariant}
                setcheckoutVariant={setcheckoutVariant}
            />,
            content: <p>
                {paymentData == 'card' && 'Onlayn kart ilə ödəmə'}
                {paymentData == 'cash' && 'Qapıda nağd ödəmə'}
            </p>
        },
    ];


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const captureOrder = (data) => {
        setLoading(true)
        commerce.checkout.capture(checkoutToken?.id, {
            line_items: checkoutToken?.line_items,
            customer: {
                firstname: infoData.firstname,
                lastname: infoData.lastname,
                email: infoData.email,
            },
            shipping: {
                street: deliveryData.address,
                street_2: deliveryData.home,
                town_city: 'Baki',
                postal_zip_code: '1012',
                country: 'AZ',
                delivery_instructions: deliveryData.note
            },
            billing: {
                street: deliveryData.address,
                street_2: deliveryData.home,
                town_city: 'Baki',
                postal_zip_code: '1012',
                country: 'AZ',
                delivery_instructions: deliveryData.note
            },
            payment: {
                gateway: 'test_gateway',
                card: {
                    number: data.cardNumber,
                    expiry_month: data.expiryMonth,
                    expiry_year: data.expiryYear,
                    cvc: data.cvc,
                    postal_zip_code: '4242'
                }
            },
        }).then((response) => {
            handleOpen();
            setLoading(false);
            dispatch(setCartItems(0));
        }).catch((error) => {
            setLoading(false)
        });

    }


    return (
        <div className='checkout'>
            <Box className='box' sx={{ maxWidth: 400 }}>
                <Typography className='title'>Ödəmə</Typography>
                <Stepper className='stepper' activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => {
                        return (
                            <Step sx={{ marginTop: '30px' }} className='step' key={index}>
                                <StepLabel
                                    className='stepLabel'
                                    optional={
                                        <div>
                                            {infoData && step?.content}
                                        </div>
                                    }
                                >
                                    <div className='stepLabelTitle'>
                                        <p>{step?.label}</p>
                                        {<button className='edit' onClick={() => setActiveStep(index)}>Düzəliş et</button>}
                                    </div>
                                </StepLabel>

                                <StepContent className='stepContentDiv' sx={{ border: 'none' }}>
                                    <Typography variant={'div'}>{step?.description}
                                    </Typography>
                                </StepContent>
                            </Step>)
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper className='finishStep' square elevation={0} sx={{ p: 3 }}>
                        {checkoutVariant == 'cash' ?
                            <button className='finish'>Sifarişi tamamla</button> : <CheckoutForm loading={loading} register={register} handleSubmit={handleSubmit} captureOrder={captureOrder} />}
                    </Paper>
                )}
            </Box>
            <Total subTotal={checkoutToken?.total?.formatted_with_symbol} />
            <BasicModal open={open} handleClose={handleClose} />
        </div>
    );
}

export default Checkout