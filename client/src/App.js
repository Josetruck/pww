import React, { Component } from "react";
import { BrowserRouter ,Link } from "react-router-dom";
import MainComponent from "./components/Main";
import Navigationbar from "./components/Navigationbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import 'leaflet/dist/leaflet.css';
class App extends Component {
constructor(props) {
    super(props);
}

render() {
    return (
        <div className="App">
                <BrowserRouter>
        <Navigationbar/>
                <MainComponent />
        </BrowserRouter>
            </div>
    );
}
}
export default App;