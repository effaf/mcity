import React from 'react';
import { createRoot } from 'react-dom/client';
import Routecontroller from './Routecontroller';
import './Resources/css/app.css';
import {firebase} from './firebase';

const App = (props)=>{
  return(
    <div>
      <Routecontroller {...props}/>
    </div>
  )
}

firebase.auth().onAuthStateChanged((user)=>{
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  root.render(<App user= {user}/>);

})
