import { useEffect, useState } from "react";
import DisplayImg from "../components/DisplayImg";
import { isLogged } from "../helpers/isLogged";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function Profile() {
    const navigate = useNavigate()
    var verify1 = isLogged()
    const { id_profile } = useParams()
    const [profile, setProfile] = useState(null)
    const { user } = useContext(UserContext)
    const [isFriend, setIsFriend] = useState(false)
    const [sended, setSended] = useState(false)
    const [total_distance, setTotal_distance] = useState(null)


    useEffect(() => {
        if (!profile)
            fetch(`/getUserById/${id_profile}`)
                .then(res => res.json())
                .then(res => setProfile(res))
    })

    useEffect(() => {
        fetch(`/getDistance/${id_profile}`)
            .then(res => res.json())
            .then(res => setTotal_distance(res.total_distance))
    })

    useEffect(() => {
        const friend_list = user._doc.friend_list
        if (friend_list.includes(parseInt(id_profile))) {
            setIsFriend(true)
        }
        fetch(`/getUserRequestOut/${user.id}`)
            .then(res => res.json())
            .then(res => {
                res.forEach((element) => {
                    if (element.fk_id_to == id_profile && element.status === "progress") {
                        setSended(true)
                    }
                })
            })
    })



    const sendRequest = () => {
        fetch("/sendRequest", {
            method: "post",
            body: JSON.stringify({
                id_from: user.id,
                id_to: id_profile
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((res) => {
                if (res) {
                    setSended(true)
                }
            })
    }

    if (verify1) {
        if (profile) {
            return (<div className="Home">
                <div className="userInfo">
                    <h1 className="userName">{profile.user_name}</h1>
                    <p id="weekDistance">{total_distance} km</p>
                </div>
                <div className="flexrow paddingLados">
                    {(!isFriend) && <button className="btn btn-primary" onClick={sendRequest}>Añadir como amigo</button>}
                    {!isFriend && sended && <p>Solicitud enviada</p>}
                </div>
                {isFriend ? <DisplayImg id_user={id_profile} /> : <div className="card">
                    <div className="card-body">
                        <h3>No puedes ver este perfil</h3>
                        <p>{profile.user_name} no es tu amigo o aún no ha aceptado tu petición de amistad.</p></div></div>}
            </div>)
        } else {
            return <p>Cargando datos...</p>
        }
    } else {
        navigate("/login")
    }

}

export default Profile;