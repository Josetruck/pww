import React, { useState } from "react";
import { defaultFetch } from "../helpers/defaultFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Warning from "../components/warnings/Warning";
import { useCookies } from 'react-cookie';




function Login(props) {
  const [pass, setPass] = useState("");
  const [input, setInput] = useState("");
  const [login_err, setLogin_err] = useState(false)
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  const handleValidation = (event) => {
    
    var datos = { input, pass };

    defaultFetch("/login", "POST", datos).then((res) => {
      if (res) {
        setCookie('session', res.cookie, { path: "/", expires: new Date('2050-01-01') });
        console.log("se planta la cookie")
        setLogin_err(false)
        navigate("/")
      } else {
        setLogin_err(true)
      }
    }).then(()=>{
      defaultFetch("/loggedUser", "GET").then((res) => {
        props.setUser(res);
        props.setLoad(false)
        })
    });
  }


  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  function toRegister(){
    navigate("/preRegister")
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <div className="form-group marginadoTop">
            <h1>Inicia sesión en PWW</h1>
            </div>
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
              <div className="form-group">
                <a href="/passrecovery">¿Has olvidado la contraseña?</a>
              </div>
              {login_err ? <Warning text="Usuario y/o contraseña incorrectos" /> : ""}
              <div className="form-group marginadoTop">
                <button type="submit" className="btn btn-primary">
                  Log-in
                </button>
              </div>
            </form>
            <div className="form-group marginadoTop">
              <h2 className="marginadoTop">¿Aún no tienes cuenta?</h2>
            </div>
            <div className="form-group marginadoTop">
              <button className="btn btn-success" onClick={()=>toRegister()}>
                Registrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;