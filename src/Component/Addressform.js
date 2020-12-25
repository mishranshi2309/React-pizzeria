import React ,{useState}from 'react';
import {Input, Select , MenuItem , Typography,Grid,  Button, TextField} from '@material-ui/core';
import {useForm,  FormProvider, useFormContext, Controller} from 'react-hook-form';
import useStyles from './Styles';
import Textfield from './Textfield';
import {commerce} from './commerce';


const Addressform = ({checkoutToken, next}) =>{
    const methods =useForm();
    const [shippingCountries, setShippingCountries] = useState('');
    const fetchShippingCountry = async (checkoutTokenId) =>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
    }
  
    console.log("address",checkoutToken);
    const classes = useStyles();


    return(<>
    <div className={classes.tootlbar} />

   <Typography gutterBottom variant="h6" style={{marginLeft:15}}> Shipping Address</Typography>
   <FormProvider {...methods}>
       
            <form onSubmit={methods.handleSubmit((data)=>{next({...data});})}>
                <Grid container spacing={3}>
                   <Textfield required name="firstname" label="First name"/>
                   <Textfield required name="lastname" label="last name"/>
                   <Textfield required name="address" label="address"/>
                   <Textfield required name="country" label="country"/>
                   <Textfield required name="Pincode" label="Pincode"/>
                </Grid>
                <input type="submit" name="Submit" style={{margin:20}}/>
            </form>
   </FormProvider>
    </>)
}
export default Addressform;