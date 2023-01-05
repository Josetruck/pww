import React from 'react';
import UserContext from './context/UserContext';
import { BrowserRouter } from "react-router-dom";
import MainComponent from "./components/Main";
import Navigationbar from "./components/Navigationbar";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import 'leaflet/dist/leaflet.css';


function App() {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(null)
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        user.coordinates = [position.coords.latitude, position.coords.longitude];
        setUser(user)
      });
    } else {
      console.warn("Tu navegador no soporta Geolocalización!! ");
    }
  }, [user])

  useEffect(() => {

    //-----------------------------------------------REVISAR ESTO -------------------------------------------
    async function fetchUser() {
      const response = await fetch('/loggedUser');

      const data2 = await response.json();
      setUser(data2);
      if(data2.user_name){
        setLoad(true)
      }
    }
    if(!load){
    setTimeout(() => {
      fetchUser() 
    }, 2000);
  }
  },[load])


  if (!user) {
    return <p>Cargando datos...</p>;
  } else {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <BrowserRouter>
            <Navigationbar setLoad={setLoad}/>
            <MainComponent setUser={setUser} setLoad={setLoad}/>
          </BrowserRouter >
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;