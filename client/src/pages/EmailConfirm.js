import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { defaultFetch } from "../helpers/defaultFetch";

function EmailConfirm() {
  const navigate = useNavigate()
  const {jwt} = useParams()
  const handleConfirm = ()=>{
    console.log(jwt)
    defaultFetch("/emailVerify", "post", { jwt: jwt }).then(res => console.log(res))
    
  }

  return (
    <div className="App">
      <div className="Home">
        <h1>Ya casi estamos</h1>
        <p>Haz click en el botón para confirmar tu dirección de email.</p>
        <button className="btn btn-primary" onClick={handleConfirm} >Confirmar email</button>
      </div>
    </div>

  );
}
export default EmailConfirm;