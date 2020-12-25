import { formatMs } from '@material-ui/core';
import React from 'react';
import {Container, Typography , Button, Grid, CardActions, CardContent, CardMedia, Card} from '@material-ui/core';
import useStyles from './Styles';
const CartItem =({item, handleupdatecart, handleremovecart})=>{
    const classes = useStyles();
   return(
       <>
       <Card>
           <CardMedia alt="foody" image={item.media.source} className={classes.media}/>
           <CardContent className={classes.cardContent}>
               <span>{item.product_name}</span>
               <span>{item.line_total.formatted_with_symbol}</span>
           </CardContent>
           <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
                <Button type="button" size="small"  onClick={()=> handleupdatecart(item.id , item.quantity-1)}>
                    -
                </Button>
                <span>{item.quantity}</span>
                <Button type="button" size="small" onClick={()=> handleupdatecart(item.id , item.quantity + 1)}>
                    +
                </Button>
            </div>
            <Button type="button" size="small" color="primary" onClick={()=> handleremovecart(item.id)}>Remove</Button>
           </CardActions>
       </Card>
       </>
    )
}
export default CartItem;