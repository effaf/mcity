import React,{useState} from "react";
import { Animate } from "react-move";
import {easePolyOut} from 'd3-ease';


const Test = ()=>{

    const [show,setShow] = useState(true);

    return(
        <>
        <Animate
        show={show}
        start={{
            backgroundColor:'red',
            width:500,
            height:500,
            opacity:0
        }} 
        enter={{
            backgroundColor:'red',
            width:[100],
            height:[100],
            opacity:[1],
            timing:{
                duration:1000,
                delay:1000,
                ease:easePolyOut
            }
        }}>
         {({width,height,opacity,backgroundColor})=>(
            <div style={{backgroundColor,
                        height,
                        width,
                        opacity}}>
                return this mate
            </div>
         )}
        </Animate>
            
        </>
    )}

export default Test;