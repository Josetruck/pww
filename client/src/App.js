import React from 'react';
import UserContext from './context/UserContext';
import { BrowserRouter, Link } from "react-router-dom";
import MainComponent from "./components/Main";
import Navigationbar from "./components/Navigationbar";
import { useState, useEffect } from "react";
import { defaultFetch } from './helpers/defaultFetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import 'leaflet/dist/leaflet.css';


function App() {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        if(!loaded){
            defaultFetch("/loggedUser", "GET").then((res) => {
                setUser(res)
                console.log(res)
                setLoaded(true)
                })
        }

    },[loaded])
    
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
                        <div className="App">
                    <BrowserRouter>
                        <Navigationbar />
                        <MainComponent />
                    </BrowserRouter>
                </div>
      </UserContext.Provider>
    );
  }
  
  export default App;