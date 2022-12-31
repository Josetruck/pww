import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clan from "../pages/Clan";
import Search from "../pages/Search";
import Login from "../pages/Login";
import PreRegister from "../pages/PreRegister"
import Register2 from "../pages/Register2";
import RegisterSucces from "../pages/RegisterSuccess";
import Passrecovery from "../pages/Passrecovery";
import PassReset from "../pages/PassReset";
import PassRequestSuccess from "../pages/PassRequestSuccess";
import UploadImage from "../pages/UploadImg";
import Profile from "../pages/Profile";

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setUser={this.props.setUser}/>} />
                <Route path="/clan" element={<Clan />} />
                <Route path="/search" element={<Search />} />
                <Route path="/preregister" element={<PreRegister />} />
                <Route path="/registerSuccess" element={<RegisterSucces />} />
                <Route path="/register2/:email" element={<Register2 />} />
                <Route path="/passrecovery" element={<Passrecovery />} />
                <Route path="/passreset/:token" element={<PassReset />} />
                <Route path="/passrequestsuccess" element={<PassRequestSuccess />} />
                <Route path="/uploadimage" element={<UploadImage/>} />
                <Route path="/profile/:id_profile" element={<Profile/>} />

            </Routes>
        </div>
        );
    }
}
export default Main;