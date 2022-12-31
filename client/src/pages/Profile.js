import { useEffect, useState } from "react";
import DisplayImg from "../components/DisplayImg";
import { isLogged } from "../helpers/isLogged";
import { useNavigate , useParams} from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { defaultFetch } from "../helpers/defaultFetch";




function Profile() {
    const navigate = useNavigate()
    var verify1 = isLogged()
    const { id_profile } = useParams()
    const [profile, setProfile] = useState(null)

    useEffect(()=>{
        if(!profile)
        fetch(`/getUserById/${id_profile}`).then(res=>res.json()).then(res=>setProfile(res))
        console.log(profile)
    })
    

    if (verify1) {
        if (profile){
        return (<div className="Home">
            <div className="userInfo">
                <h1 className="userName">{profile.user_name}</h1>
                <p id="weekDistance">{profile.this_week_distante} km esta semana</p>
            </div>
            <DisplayImg id_user={id_profile} />
            </div>)
        } else {
            return <p>Cargando datos...</p>
        }
    } else {
        navigate("/login")
    }

}

export default Profile;