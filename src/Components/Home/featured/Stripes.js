import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";


const Stripes = ()=>{
    const stripeState = [{
        id:1,
        background: '#98c5e9',
        left:120,
        rotate:25,
        top:-260,
        delay:0
    },
    {
        id:2,
        background: '#ffffff',
        left:360,
        rotate:25,
        top:-394,
        delay:200
    },
    {
        id:1,
        background: '#98c5e9',
        left:600,
        rotate:25,
        top:-498,
        delay:400
    }]

    const showStripes = ()=> {
        return( stripeState.map((stripes)=>(
            <Animate 
                key={stripes.id} show={true}
                start={{
                    background:'#ffffff',
                    opacity:0,
                    left:0,
                    rotate:0,
                    top:0
                }}
                enter={{
                    background:`${stripes.background}`,
                    left:[stripes.left],
                    rotate:[stripes.rotate],
                    top:[stripes.top],
                    delay:[stripes.delay],
                    opacity:[1],
                    timing:{
                        delay:stripes.delay,
                        duration:200,
                        ease:easePolyOut
                    }

                }}
                >
                {({opacity,left,rotate,top,background})=>(
                        <div className ="stripe" style={{
                            background,
                            opacity,
                            transform:`rotate(${rotate}deg) translate(${left}px,${top}px)`
                        }}>
                            
                        </div>
                    )
                }
            </Animate>
        )))
    }

    return (
        <div className="featured_stripes">
            {showStripes()}
        </div>
    )
}

export default Stripes;