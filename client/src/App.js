import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import MainComponent from "./components/Main";
import Navigationbar from "./components/Navigationbar";
import { useState, useEffect } from "react";
import { defaultFetch } from "./helpers/defaultFetch";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import 'leaflet/dist/leaflet.css';
export const UserContext = React.createContext()
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            userData: {}
        };
    }
    componentDidMount() {
        // Carga la información del usuario con la sesion iniciada.
        defaultFetch("/loggedUser", "GET").then((res) => {
            this.setState({
                loaded: true,
                userData: res
            })
        })
    }


    render() {
        if (!this.state.loaded) {

            return false;
        } else {
            return (
                <div className="App">
                    <BrowserRouter>
                    <UserContext.Provider value={this.state.userData}>
                        <Navigationbar />
                        <MainComponent />
                        </UserContext.Provider>
                    </BrowserRouter>
                </div>
            );
        }
    }
}

export default App;