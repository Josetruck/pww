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
    async function fetchUser() {
      const response = await fetch('/loggedUser');
      const data = await response.json();
      setUser(data);
    }

    setTimeout(() => {
      fetchUser()
    }, 1000)

  })


  if (!user) {
    return <p>Cargando datos...</p>;
  } else {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <BrowserRouter>
            <Navigationbar />
            <MainComponent setUser={setUser} />
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;