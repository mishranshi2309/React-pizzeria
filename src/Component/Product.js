import React from 'react';
import {Grid} from '@material-ui/core';
import SingleProduct from './SingleProduct';
import useStyles from './Styles';
import Header from "./Header";

const Product =({pro, onatc})=>{
    const classes = useStyles();
    return(
        <main className={classes.content}>
            <Header/>
            <div className={classes.toolbar} />
        <Grid container justify="center" spacing="{4}" className="progrid">
        
        {
            pro.map((p)=>(
                <Grid item key={p.id} xs={12} sm={6} md={4} lg={4}>
                    <SingleProduct product={p} onatc={onatc}/>
                    </Grid>
            ))

        }

        </Grid></main>
       
    )
}
export default Product;