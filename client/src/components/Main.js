import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clan from "../pages/Clan";
import Search from "../pages/Search";
import Login from "../pages/Login";
import PreRegister from "../pages/PreRegister"
import Register2 from "../pages/Register2";
import RegisterSucces from "../pages/RegisterSuccess";
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
                <Route path="/search" element={<Search />} />
                <Route path="/preregister" element={<PreRegister />} />
                <Route path="/registerSuccess" element={<RegisterSucces />} />
                <Route path="/register2/:email" element={<Register2 />} />
            </Routes>
        </div>
        );
    }
}
export default Main;