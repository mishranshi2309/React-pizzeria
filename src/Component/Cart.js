import { formatMs } from '@material-ui/core';
import React from 'react';
import {Container, Typography , Button, Grid} from '@material-ui/core';
import useStyles from './Styles';
import CartItem from './CartItem';
import {Link} from 'react-router-dom';

const Cart =({cart, handleempty , handleupdatecart, handleremovecart})=>{
    const classes = useStyles();
    var isEmpty = true;
    console.log("items",cart);
    console.log("line items",cart.total_items);
    
    if(cart.total_items>0){
        isEmpty = false;
    }

    const EmptyCart = () =>(
        <Typography variant="subtitle1">Your cart is Empty. Please Fill some.
        <br/>
                <Link to="/"> Add Product</Link>

        </Typography>
    );
    const FilledCart = () =>(
      <>
      
          <Grid container spacing={4}>
              {
                  cart.line_items.map((item)=>(
                      
                      <Grid item xs={12} sm={4} key={item.id}>
                          <CartItem item={item} handleremovecart={handleremovecart} handleupdatecart={handleupdatecart}/>
                          {/* <Typography>{item.product_name}</Typography> */}
                      </Grid>
    ))
              }
              
          </Grid>
              <div className={classes.cardDetails}>
                  <Typography variant="h4">
                      Subtotal : {cart.subtotal.formatted_with_symbol}
                  </Typography>
                  <div>
                      <Button className={classes.emtyButton} size="large" type="button" variant="contained" color="secondary" gutterBottom  onClick={handleempty}
                      >Empty Cart</Button>
                    <Link to="/checkout">  <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" gutterBottom>Checkout</Button>
                    </Link>
              </div>
              </div>
      </>
        
    );
    return(
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h5" gutterBottom>Your Shopping Cart</Typography>
            {isEmpty ?<EmptyCart/>:<FilledCart/>}
        </Container>
    )
}
export default Cart;