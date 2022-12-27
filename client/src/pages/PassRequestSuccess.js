import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function PassRequestSuccess() {

  return (
    <div className="App">
      <div className="container">
        <h1>Ya casi estamos</h1>
        <p>Hemos enviado un email de confirmación a la dirección de correo que has indicado. Si no aparece en la bandeja principal revisa el Spam.</p>
      </div>
      <div className="form-group marginadoTop">
        <button className="btn btn-primary">Inicio de sesión</button>
      </div>
    </div>

  );
}
export default PassRequestSuccess;