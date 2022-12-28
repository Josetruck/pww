import React, { useEffect, useState } from "react"
import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";

function Clan() {
    const navigate = useNavigate()
    const [verify1, setVerify1] = useState(false)
    useEffect(()=>{
        if(!isLogged()){
            navigate("/login")
        }else{
            setVerify1(true)
        }
    })
    if (verify1) {
        return (
            <div>
                ESTE ES EL COMPONENTE Clan
            </div>
        );
    }

}

export default Clan