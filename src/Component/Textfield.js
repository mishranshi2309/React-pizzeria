import React ,{useState}from 'react';
import {Input, Select , MenuItem , Typography,Grid,  Button, TextField} from '@material-ui/core';
import {useForm,  FormProvider, useFormContext, Controller} from 'react-hook-form';
import useStyles from './Styles';


const Textfield = ({name, label, required}) =>{
    
    const {control} = useFormContext();
  
    const classes = useStyles();

   
    return(<>
    
                <Grid container spacing={3} style={{marginLeft:15}}>
                    <Grid item xs={12}  sm={6} lg={6}>
                        <Controller
                        as = {TextField}
                        control ={control}
                        fullWidth
                        name={name}
                        label={label}
                        required={required}
                        />
                        </Grid>

                        </Grid>

    </>)
}
export default Textfield;