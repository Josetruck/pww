import { useEffect, useState } from "react";
import DisplayImg from "../components/DisplayImg";
import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";



function Home() {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const userData = useContext(UserContext)
    var verify1 = isLogged()
    const [user_name, setUser_name] = useState("")
    const [twkd,setTwkd]=useState("")
    
    useEffect(() => {
        if (userData.user != null) {
            setUser_name(userData.user.user_name)
            setTwkd(userData.user.this_week_distance)
        }
    }, [])


    if (verify1) {
        return (<div className="Home">
            <div>
            <div className="profileImg">
                <img src="" alt="imagen de perfil" />
            </div>
            <div className="userInfo">
                <h1 className="userName">{user_name}</h1>
                <p id="weekDistance">{twkd} km</p>
            </div>
            <DisplayImg />
            </div>
        </div>)
    } else {
        navigate("/login")
    }

}

export default Home;