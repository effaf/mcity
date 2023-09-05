import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Fade } from "react-awesome-reveal";

import { toastSuccess,toastError } from "../../Utils/tools";

import { promotionsCollection } from "../../../firebase";

const Enroll = ()=>{

    const [loading,setLoading] = useState(false)

    const formik = useFormik({
        initialValues:{email:''},
        validationSchema:Yup.object({
            email:Yup.string().email('Invalid Email').required("Email is required")
        }),
        onSubmit:(values)=>{
            setLoading(true)
            submitForm(values)
        }

    })

    const submitForm = async (values)=>{
        try{
            const isOnList = await promotionsCollection
                                    .where('email','==',values.email).get();
            
            if(isOnList.docs.length >=1){
                toastError("You are already on the list");
                setLoading(false)
                return false;   
            }   

            await promotionsCollection.add({email:values.email});
            setLoading(false);
            formik.resetForm();
            toastSuccess("Congratulations");

        }catch(error){
            toastError(error);
        }

    }

    return(
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={formik.handleSubmit}>
                    <div className="enroll_title">
                        Enter your email
                    </div>

                    <div className="enroll_input">
                        <input name="email" 
                               onChange={formik.handleChange} 
                               onBlur={formik.handleBlur}
                               value={formik.values.email}
                               placeholder="Enter your email"/>

                        {formik.touched.email && formik.errors.email?
                        <div className="error_label">
                            {formik.errors.email}
                        </div>:
                        null
                        }

                        {loading ?
                        <CircularProgress className="progress" color='secondary'/>
                        :<button type="submit" style={{cursor:'pointer'}}>Enroll</button>
                        }

                    </div>
                </form>
            </div>
        </Fade>
    )
}

export default Enroll;