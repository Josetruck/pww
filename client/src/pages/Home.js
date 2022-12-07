import {useEffect, useState} from "react"
import DisplayImg from "../components/DisplayImg";

function Home() {
    const[weekDistance, setweekDistance] = useState(0)
        return <div className="Home">
            <div className="profileImg">
                <img src="" alt="imagen de perfil" />
            </div>
            <div className="userInfo">
                <h1 className="userName">Nombre de usuario</h1>
                <p id="weekDistance">{weekDistance} km</p>
            </div>
            <DisplayImg/>
            </div>;
    }

export default Home;