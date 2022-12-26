import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { defaultFetch } from "../helpers/defaultFetch";
import Warning from "../components/warnings/Warning";

function PreRegister() {
  const [email, setEmail] = useState("")
  const [emailExists, setEmailExists] = useState(false)
  const navigate = useNavigate()
  const handleValidation = () => {
    defaultFetch(`/emailexists/${email}`, "GET").then(res=>{
      if(res){ 
        setEmailExists(true)
      } else {
        setEmailExists(false)
        defaultFetch("/sendEmailVerify","post",{email:email})
        navigate(`/register2/${email}`)
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
            <form id="loginform" onSubmit={loginSubmit}>
            <div className="form-group">
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
              <div className="alert">
              {emailExists ? <Warning text="Este email ya está en uso."/>:""}
              </div>
              <button type="submit" className="btn btn-primary">
                Registro
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PreRegister;