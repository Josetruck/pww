import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { defaultFetch } from "../helpers/defaultFetch";
import Warning from "../components/warnings/Warning";

function Passrecovery() {
  const [email, setEmail] = useState("")
  const [emailExists, setEmailExists] = useState(false)
  const navigate = useNavigate()
  const handleValidation = () => {
    defaultFetch(`/emailexists/${email}`, "GET").then(res => {
      if (res) {
        setEmailExists(false)
        defaultFetch("/passRecovery", "post", { email: email })
        navigate(`/passrequestsuccess`)
      } else {
        setEmailExists(true)
      }
    })
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <div className="form-group marginadoTop"></div>
            <h1 className="form-group marginadoTop">Recupera tu contraseña</h1>
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group marginadoTop">
                <label>Introduce tu email</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  name="emailInput"
                  placeholder="Introduce el email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
                {emailExists ? <div className="alert"><Warning text="Este email no está registrado." /></div> : ""}
              <div className="form-group marginadoTop
              ">
                <button type="submit" className="btn btn-primary">
                  Enviar email de recuperación
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Passrecovery;