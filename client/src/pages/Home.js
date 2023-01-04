import { useEffect, useState } from "react";
import DisplayImg from "../components/DisplayImg";
import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";



function Home(props) {
    const navigate = useNavigate()
    const {user, setUser}= useContext(UserContext)
    const [verify1, setVerify1] = useState(null)

    useEffect(()=>{
        setVerify1(isLogged())
    })

    if(!user){
        return <p>Cargando datos...</p>;
    }

    if (verify1) {
        return (<div className="Home">
            <div>
            <div className="userInfo">
                <h1 className="userName">{user.user_name}</h1>
                <p id="weekDistance">{user.total_distance} km</p>
            </div>
            <DisplayImg id_user={user.id} user={user}/>
            </div>
        </div>)
    } else {
        navigate("/login")
    }

}

export default Home;