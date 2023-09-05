import React from "react";
import { Citylogo } from "../Utils/tools";

const Footer = ()=>{
    return(
        <footer className="bck_blue">
            <div className="footer_logo">
                <Citylogo
                    link={true} linkto="/" width="70px" height="70px"/>

            </div>
            <div className="footer_descl">
                Manchester City 2023. All rights reserved
            </div>


        </footer>
    )
}
export default Footer;