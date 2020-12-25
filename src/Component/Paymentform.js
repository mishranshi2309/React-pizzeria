import React ,{useState}from 'react';
import {Paper , Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import useStyles from './Styles';
import {Elements , CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from "./Review";
import {Link} from 'react-router-dom';


const stripePromise = loadStripe('pk_test_51I0TgNE91tjDMto2oG8r2LrjmggXN8HspgiVvTJc5t2WvMocRzRFIrEIMe9pqiXvINkAYR4guiIID6tKDU1cDFsR00Vc6uGHyc');
const Paymentform = ({checkoutToken, onCaptureCheckout, nextStep, handleempty}) =>{
  
    const classes = useStyles();
   
    const handleSubmit = async (e, elements, stripe)=>{
        e.preventDefault();
        if(!stripe||elements) return;

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card', card: cardElement});
       

        if(error){
            console.log(error);
        }
        else{
            const orderData ={
                line_items: checkoutToken.live.line_items,
                // customer:{
                //     firstname: Shipdata.firstname, 
                //     lastname : Shipdata.lastname,
                //     email : Shipdata.email
                // },
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payment_method_id: paymentMethod.id
                    }
                }


            }

            onCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }
        }

    console.log("pay",checkoutToken);
    return(
        <>
        <h3 style={{textAlign:'center'}}>Payment</h3>
        
    <Review  checkoutToken={checkoutToken}/>
    <Divider/>
    <Typography variant="h6" gutterBottom style={{textAlign:'center'}}>Payment Methods</Typography>
    <Elements stripe={stripePromise}>
        <ElementsConsumer style={{margin:70}}>
            {
                ({elements , stripe}) =>(
                        <form style={{marginLeft:250, marginRight:250,marginBottom:20,padding:10}} onSubmit={(e) => handleSubmit(e, elements, stripe)} >
                            <CardElement />
                            <br/><br/>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                             <Link to="/OrderConfirm">  <Button type='submit' variant="contained" disabled={!stripe} color="primary" onClick={handleempty}>
                                    Pay : {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button></Link> 

                            </div>
                        </form>
                )
            }
        </ElementsConsumer>
    </Elements>
    </>
    )
}
export default Paymentform;