import React from 'react';
import UserContext from './context/UserContext';
import { BrowserRouter, Link } from "react-router-dom";
import MainComponent from "./components/Main";
import Navigationbar from "./components/Navigationbar";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import 'leaflet/dist/leaflet.css';
import { set } from 'mongoose';


function App() {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        async function fetchUser(){
            const response = await fetch('/loggedUser');
            const data = await response.json();
            setUser(data);
          }
          setTimeout(() => {
            fetchUser()
          }, 1000);
    },[])

    if (!user) {
        return <p>Cargando datos...</p>;
      }
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
                        <div className="App">
                    <BrowserRouter>
                        <Navigationbar />
                        <MainComponent setUser={setUser}/>
                    </BrowserRouter>
                </div>
      </UserContext.Provider>
    );
  }
  
  export default App;