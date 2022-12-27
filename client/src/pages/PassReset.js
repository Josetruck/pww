import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { defaultFetch } from "../helpers/defaultFetch";
import Warning from "../components/warnings/Warning";
import AlertOk from "../components/warnings/AlertOk";
import Cookies from 'universal-cookie';

function PassReset() {
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [passMatch, setPassMatch] = useState("")
  const [error, setError] = useState(false)
  const { token } = useParams()
  const navigate = useNavigate()

  const handleValidation = (event) => {
    const cookies = new Cookies();

    const datos = {token:token , password: password }
    if (passMatch) {
      defaultFetch("/passReset", "POST", datos).then(res=>{
        if(res){
        cookies.set('session', res.cookie,{path:"/"});
        navigate("/")
      } else {
        setError(true)
      }
      })
    }
  }

  useEffect(() => {
    if (password === password2) {
      setPassMatch(true)
    } else {
      setPassMatch(false)
    }
  }, [password2])


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
              <h2>Nueva contraseña:</h2>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Repite la contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Password"
                  onChange={(event) => setPassword2(event.target.value)}
                />
                <div className="alert-form-container">
                  {passMatch ? <AlertOk text="Coincide" /> : <Warning text="No coincide" />}
                </div>
              </div>
              {error?<Warning text="Algo no ha ido bien"/>:""}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PassReset;