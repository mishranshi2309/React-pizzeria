import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu , Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './Styles';
import logo from '../../src/images/regularsmall.jpg';
import {Link} from 'react-router-dom';


const Navbar =({totalitems})=>{
    const classes=useStyles();
    return(
        <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <Link to="/">
            <Typography variant="h6" className={classes.title} color="inherit">
                <img src={logo} height="25px" className={classes.image}/>PIZZERIA
            </Typography></Link>
            <div className={classes.grow}/>
          <div className={classes.button}>
              <Link to="/cart" >
              <IconButton>
                  <Badge badgeContent={totalitems} color="secondary">
                      <ShoppingCart/>
                  </Badge>
              </IconButton>
              </Link>
          </div>
        </Toolbar>
      </AppBar>
    )
}
export default Navbar;
