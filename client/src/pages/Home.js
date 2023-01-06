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
    const [user_name, setUser_name] = useState("")
    const [total_distance, setTotal_distance] = useState(0)
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        setVerify1(isLogged())
    })
    useEffect(()=>{
        console.log(user)
        setUser_name(user.user_name)
        setTotal_distance(user.total_distance)
    })

    if(!user){
        return <p>Cargando datos...</p>;
    }

    if (verify1) {
        return (<div className="Home">
            <div>
            <div className="userInfo">
                <h1 className="userName">{user_name}</h1>
                <p id="weekDistance">{total_distance} km</p>
            </div>
            <DisplayImg id_user={user.id} user={user} setTotal_distance={setTotal_distance} />
            </div>
        </div>)
    } else {
        navigate("/login")
    }

}

export default Home;