import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"

function Contact() {
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
                ESTE ES EL COMPONENTE Search
            </div>
        );
    }

}
export default Contact;