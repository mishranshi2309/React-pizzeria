import React from 'react';
import {Card , CardMedia , CardContent , CardActions , Typography , IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './Styles';

const SingleProduct =({product , onatc})=>{
    console.log(product);


    const classes = useStyles();
    return(
        
        <Card>
            <CardMedia className={classes.media} image={product.media.source}/>
            
           
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom >
                    {product.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom >
                    {product.price.formatted_with_symbol}
                    </Typography>
                </div>
  
            </CardContent>
            <CardActions disableSpacing className={classes.cartActions}>
                <Typography variant="h6"  variant="body2"  gutterBottom dangerouslySetInnerHTML={{ __html: product.description }}/>
                    
                <IconButton aria-label="Add to cart" onClick={()=>onatc(product.id , 1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
        
    )
}
export default SingleProduct;