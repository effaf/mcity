import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import { handleSignOut } from "../Utils/tools";

const AdminNav = ()=>{

    const links = [
        {
            title:'Matches',
            linkTo:'/admin_matches'
        },
        {   
            title:'Players',
            linkTo:'/admin_players'
        }
    ]

    const renderItems = ()=>{
        return links.map((item) =>(
                <Link to={item.linkTo} key={item.title}>
                    <ListItemButton className="admin_nav_link">
                        {item.title}
                    </ListItemButton>
                </Link>
        ))
    }
    return (
    <>
        {renderItems()}
        <ListItemButton button className="admin_nav_link" onClick={()=>handleSignOut()}>
            Log out
        </ListItemButton>
    </>
    )
}

export default AdminNav;