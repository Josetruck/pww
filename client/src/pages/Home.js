import { useEffect, useState } from "react";
import DisplayImg from "../components/DisplayImg";
import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";



function Home(props) {
    const navigate = useNavigate()
    const userData = useContext(UserContext)
    var verify1 = isLogged()
    const [user_name, setUser_name] = useState(null)
    const [twkd,setTwkd]=useState(null)
    const [id_user, setId_user]=useState(null)
    
    useEffect(() => {
            setUser_name(userData.user.user_name)
            setTwkd(userData.user.this_week_distance)
            setId_user(userData.user.id)
            console.log(userData)
    })

    if(id_user === null){
        return <p>Cargando datos...</p>;
    }



    if (verify1) {
        return (<div className="Home">
            <div>
            <div className="userInfo">
                <h1 className="userName">{user_name}</h1>
                <p id="weekDistance">{twkd} km</p>
            </div>
            <DisplayImg id_user={id_user} user={userData.user}/>
            </div>
        </div>)
    } else {
        navigate("/login")
    }

}

export default Home;