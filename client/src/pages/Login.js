import React, { useState } from "react";
import { defaultFetch } from "../helpers/defaultFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import Warning from "../components/warnings/Warning";

function Login() {
  const [pass, setPass] = useState("");
  const [input, setInput] = useState("");
  const [login_err, setLogin_err] = useState(false)
  const navigate = useNavigate()

  const handleValidation = (event) => {
    const cookies = new Cookies();
    var datos = { input, pass };

    defaultFetch("/login", "POST", datos).then((res) => {
      console.log(res)
      if (res) {
        cookies.set('session', res.cookie,{path:"/"});
        setLogin_err(false)
        navigate("/")
      } else {
        setLogin_err(true)
      }
    });
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
                <label>Nombre de usuario o Email:</label>
                <input
                  type="text"
                  className="form-control"
                  id="userInput"
                  name="userInput"
                  aria-describedby="emailHelp"
                  placeholder="Nombre de usuario o Email"
                  onChange={(event) => setInput(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPass1"
                  placeholder="Contraseña"
                  onChange={(event) => setPass(event.target.value)}
                />
              </div>
              {login_err?<Warning text="Usuario y/o contraseña incorrectos"/>:""}
              <button type="submit" className="btn btn-primary">
                Log-in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;