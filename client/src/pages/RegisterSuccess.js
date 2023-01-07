import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterSuccess() {

  return (
    <div className="App">
      <div className="Home">
        <h1>Ya casi estamos</h1>
        <p>Hemos enviado un email de confirmación a la dirección de correo que has indicado. Si no aparece en la bandeja principal revisa el Spam.</p>
        <Link to={"/"}><button className="btn btn-primary">Continuar al sitio</button></Link>
      </div>
    </div>

  );
}
export default RegisterSuccess;