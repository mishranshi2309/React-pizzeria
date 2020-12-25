import React ,{useState}from 'react';
import {Paper , Stepper, Step, StepLabel, Typography,List , ListItem, ListItemText , CircularProgress, Divider, Button} from '@material-ui/core';
import useStyles from './Styles';
import {Element , CardElement, ElementConsumer} from '@stripe/react-stripe-js';
import {LoadStrip} from '@stripe/stripe-js';


const Review = ({checkoutToken}) =>{
  
    const classes = useStyles();

   
    return(<>
    <Typography variant="h6" gutterBottom style={{textAlign:'center'}}> Order Summary </Typography>
    {console.log("check", checkoutToken)}
        <List style={{margin:50}}>
            {
                checkoutToken.live.line_items.map((product)=>(
                    <ListItem style={{padding:10}} key={product.name}>
                        <ListItemText primary={product.name}  secondary={`Quantity: ${product.quantity}`}/>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))
            }
            <ListItem>
                <ListItemText primary="Total:" />

                <Typography variant="subtitle1">
                {checkoutToken.live.subtotal.formatted_with_symbol}
                </Typography>
            </ListItem>
        </List>
    </>
    )
}
export default Review;