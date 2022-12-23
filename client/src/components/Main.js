import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clan from "../pages/Clan";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/clan" element={<Clan />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
        );
    }
}
export default Main;