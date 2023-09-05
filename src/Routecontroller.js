import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/header_footer/Header";
import Footer from "./Components/header_footer/Footer";
import SignIn from "./Components/Signin";
import Dashboard from "./Components/Admin/Dashboard";
import TheTeam from "./Components/theteam";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGaurd from "./Components/HOC/Auth";
import AdminPlayers from './Components/Admin/players'
import AddEditPlayers  from "./Components/Admin/players/addEditPlayers";
import AdminMatches from "./Components/Admin/matches";
import AddEditMatches from "./Components/Admin/matches/addEditMatch";
import TheMatches from "./Components/matches";
import NotFound from "./Components/notfound";


const Routecontroller = (props) => {


  return (
    <BrowserRouter>
      <Header {...props}/>
      <Routes>
        <Route path="/signin" element= {<SignIn {...props}/>}/>
        <Route path="/dashboard" element={AuthGaurd(Dashboard,"Log in to access the dashboard")}/>

        <Route path="/admin_players" element={AuthGaurd(AdminPlayers,"Log in to access the player section")}/>
        <Route path="/admin_players/add_player" element={AuthGaurd(AddEditPlayers,"Log in to access the player section")}/>
        <Route path= "/admin_players/edit_player/:playerid" element={AuthGaurd(AddEditPlayers,"Log in to access the player section")}/>  
        
        <Route path= "/admin_matches" element={AuthGaurd(AdminMatches,"Log in to access the player matches")}/>
        <Route path= "/admin_matches/add_match" element={AuthGaurd(AddEditMatches,"Log in to access the player matches")}/>
        <Route path= "/admin_matches/edit_match/:matchid" element={AuthGaurd(AddEditMatches,"Log in to access the player matches")}/>

        <Route path="/matches" exact element={<TheMatches/>}></Route>
        <Route path='/team' exact element= {<TheTeam/>} />

        <Route path='/' exact element= {<Home/>} />
        <Route path ='*' element= {<NotFound/>} />

      </Routes>
      <ToastContainer/>
      <Footer/>
    </BrowserRouter>

  );
}

export default Routecontroller;
