import React ,{useState, useEffect}from 'react';
import {Paper , Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import useStyles from './Styles';
import Paymentform from './Paymentform';
import Addressform from './Addressform';
import {commerce} from './commerce';

const steps = ['Shipping address','payment details'];

const Checkout = ({cart, onCaptureCheckout, order, handleempty}) =>{
    const [activestep, setStep]=useState(0);
    const classes = useStyles();
    const [Shipdata, setShipdata] = useState({});

    const [checkoutToken, setCheckoutToken] = useState(null);


    useEffect(()=>{
        const generateToken = async () =>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                console.log(token);
                setCheckoutToken(token);    
            } catch (error) {
                
            }
        }

        generateToken();
    },[]);

    const nextStep = () =>{
        setStep((activestep)=>activestep +1);
        console.log(activestep);
    }
    
    const backStep = () =>
        setStep((prevactivestep)=>prevactivestep -1);
    
    const next =(data)=>{
        setShipdata(data);
        nextStep();
    }

    const Form = ()=> activestep === 0?   <Addressform checkoutToken={checkoutToken} next ={next}/> : <Paymentform Shipdata={Shipdata} checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} handleempty={handleempty}/>
    const Confirmform = () =>(
        <div>confirm</div>
    )
    return(<>
    <div className={classes.tootlbar} />

    <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant ="h4" align="center" gutterBottom>CHECKOUT</Typography>
            <Stepper className={classes.stepper} activestep={activestep}>

                {
                    steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>

            {activestep === steps.length ? <Confirmform/> :checkoutToken && <Form/>}
        </Paper>
    </main>
    </>)
}
export default Checkout;