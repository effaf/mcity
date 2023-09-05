import React from "react";
import { Link, useNavigate } from "react-router-dom";
import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';
import {toast} from 'react-toastify';
import {firebase} from '../../firebase';
import { Navigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";

export const Citylogo = (props)=>{

    const template = <div className="img_cover"
                          style={{width:props.width,
                                  height:props.height,
                                  background:`url(${mcitylogo}) no-repeat`}}>
                            
                        </div>
    
    if(props.link){
        return(
            <Link className="link_logo" to={props.linkto}>
                {template}
            </Link>
        )
    }else{
        return template;
    }
}

export const toastSuccess = (msg) =>{
        toast.success(msg,{
            position : toast.POSITION.TOP_LEFT
        });

}
export const toastError = (msg) =>{
        toast.error(msg,{
            position : toast.POSITION.TOP_LEFT
        });

}

export const handleSignOut = ()=>{
        firebase.auth().signOut()
        .then(()=> {
            setTimeout(()=>{toastSuccess("Goodbye")},500);
            return <Navigate to = "/signin"/>;
        })
        .catch((error) => {
            setTimeout(()=>{toastError(error)},1000);
        }
        )
        
}

export const Tag = (props)=>{

    const template = <div style={{
                background: props.bck ? props.bck : '#ffffff',
                fontSize: props.size ? props.size :'15px',
                color : props.color ? props.color : '#000000',
                padding :'5px 10px',
                display:'inline-block',
                fontFamily:'Righteous',
                ...props.add


    }}>
        {props.children}
    </div>
    
    if(props.link){
        return(
            <Link to={props.linkto}>
                {template}
            </Link>
        )
    }else{
        return template
    }

}

export const errorFormLabel = (formik,values) => ({
    error: formik.errors[values] && formik.touched[values],
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] :null  
})

export const selectErrorText = (formik,values)=>{
    if(formik.errors[values] && formik.touched[values]){
        return <FormHelperText>{formik.errors[values]}</FormHelperText>
    }
    return false;

}

export const selectError = (formik, values) => {
    return formik.errors[values] && formik.touched[values];
}