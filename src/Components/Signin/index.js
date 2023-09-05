import React,{useState, useEffect} from "react";
import { useFormik } from "formik";
import { CircularProgress } from "@mui/material";

import * as Yup from 'yup';
import { Navigate, useNavigate} from "react-router-dom";
import { firebase } from "../../firebase";
import { toast } from 'react-toastify';
import { toastSuccess,toastError } from "../Utils/tools";

const SignIn = (props)=>{

    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    
    const submitForm = (values) => {
        firebase.auth().signInWithEmailAndPassword(
            values.email,
            values.password
        ).then(()=>{
            setTimeout(()=>{toastSuccess("Welcome")},500);
            navigate('/dashboard');
        }).catch((error) => {
            toastError(error.message);
            setLoading(false);
        })
    
    }

    const formik = useFormik({
        initialValues:{
            email:'julie@gmail.com',
            password:'julie123'
        },
        onSubmit: (values) => {
            setLoading(true);
            submitForm(values);
        },
        validationSchema: Yup.object({
            email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
            password: Yup.string()
                        .required("Password is required")
        })
    })

    return (
        <>
        {!props.user ? 
            <div className="container">
            <div className="signin_wrapper" style={{margin:'100px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please login</h2>
                    <input 
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}/>

                    {formik.touched.email && formik.errors.email?
                    <div className="error_label">
                        {formik.errors.email}
                    </div>:
                    null}
                    
                    <input 
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>

                    {formik.touched.password && formik.errors.password?
                    <div className="error_label">
                        {formik.errors.password}
                    </div>:
                    null}
                    {loading ?
                        <CircularProgress color="secondary" className="progress"/>
                        :
                        <button type="submit" style={{cursor:'pointer'}}>Log in</button>
                    }

                </form>

            </div>
        </div>
        :
        <>
        {toastSuccess("You are signed in")};
        <Navigate to="/dashboard"/>
        </>
        }
        </>
        
    )


}

export default SignIn;