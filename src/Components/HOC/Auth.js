import React from "react";
import {firebase} from '../../firebase';
import { Navigate } from "react-router-dom";
import {toastError} from '../Utils/tools'



const AuthGaurd = (Component, errorMsg) => {

    class AuthHoc extends React.Component{
        
         authCheck  = ()=>{
            const user  = firebase.auth().currentUser;
            if(user){
                return <Component user={user}/>
            } else{
                setTimeout(()=>{toastError(errorMsg)},500);
                return <Navigate to='/signin'/>
            }

    }
    render(){
        return this.authCheck();
    }

    }
    return <AuthHoc/>
}

export default AuthGaurd;