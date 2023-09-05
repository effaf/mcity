import React from "react";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Citylogo, toastSuccess, handleSignOut } from "../Utils/tools";
import {firebase} from '../../firebase'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError } from "../Utils/tools";

const Header = (props)=>{


    return(
        <AppBar 
            position="fixed"
            style={{backgroundColor:"#98c5e9",
                    boxShadow:'none',
                    padding:"10px 0px",
                    borderBottom:'2px solid #00285e'}}>
    
            <Toolbar style={{display:'flex'}}>
                <div style={{flexGrow: 1}}>
                    <div className="header_logo">
                        <Citylogo link={true} linkto ='/' width='70px' height='70px'/>
                    </div>
                </div>
                {/* <Link  to ="/team">
                    <Button color="inherit">Team</Button>
                </Link> */}
                <Link to ="/matches">
                    <Button color="inherit">Matches</Button>
                </Link>
                {props.user ?
                <div>
                <Link to ="/dashboard">
                <Button color="inherit">Dashboard</Button>
                </Link>
                <Button color="inherit" onClick={handleSignOut}>Sign out</Button>
                </div>:
                <Link to="/signin">
                    <Button color="inherit">Sign in</Button>
                </Link>
                }   
                
            </Toolbar>
            
        </AppBar>
    )
}
export default Header;