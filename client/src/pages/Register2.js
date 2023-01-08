import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { defaultFetch } from "../helpers/defaultFetch";
import Warning from "../components/warnings/Warning";
import AlertOk from "../components/warnings/AlertOk";
import Cookies from 'universal-cookie';
import UserContext from "../context/UserContext";

function Register2() {
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [passMatch, setPassMatch] = useState("")
  const [user_name, setUser_name] = useState("")
  const [user_nameAvaliable, setUser_nameAvaliable] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [birth_date, setBirth_date] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [location, setLocation] = useState("")
  const [postal_code, setPostal_code] = useState("")
  const [error, setError] = useState(false)
  const { email } = useParams()
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleValidation = (event) => {
    const cookies = new Cookies();
    const datos = { firstname, lastname, birth_date, phone_number, location, postal_code, user_name, email, "pass": password }
    if (user_nameAvaliable && passMatch) {
      defaultFetch("/register", "POST", datos)
        .then(res => {
          if (res) {
            cookies.set('session', res.cookie, { path: "/", expires: new Date('2050-01-01') });
            navigate("/registerSuccess")
            user.load = false
            setUser(user)
          } else {
            setError(true)
          }
        })
    }
  }
  useEffect(() => {
    defaultFetch("/searchAvaliableUser", "POST", { "user_name": user_name })
      .then((res) => {
        if (res.avaliable) {
          setUser_nameAvaliable(true)
        } else {
          setUser_nameAvaliable(false)
        }
      })
  }, [user_name])
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
      <div className="container Home">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <h2>Información de usuario:</h2>
              <div className="form-group">
                <label>Nombre de usuario</label>
                <div className="row">
                  <input
                    required
                    type="text"
                    className="col form-control"
                    id="user_nameInput"
                    name="user_nameInput"
                    placeholder="Nombre de usuario"
                    maxLength={20}
                    onChange={(event) => setUser_name(event.target.value)}
                  />
                  <div className="alert-form-container col">
                    {user_nameAvaliable ? <AlertOk text="Disponible" /> : <Warning text="No disponible" />}
                  </div>
                </div>
              </div>
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
              <h2>Información Personal</h2>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="firstnameInput"
                  name="firstnameInput"
                  placeholder="Nombre"
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastnameInput"
                  name="lastnameInput"
                  placeholder="Apellidos"
                  onChange={(event) => setLastname(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  id="birth_dateInput"
                  name="birth_dateInput"
                  placeholder="Fecha de nacimiento"
                  onChange={(event) => setBirth_date(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone_numberInput"
                  name="phone_numberInput"
                  placeholder="Teléfono"
                  onChange={(event) => setPhone_number(event.target.value)}
                />
              </div>
              <div className="row">
                <div className="form-group col">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="locationInput"
                    name="locationInput"
                    placeholder="Ciudad "
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </div>
                <div className="form-group col">
                  <label>C.P.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postal_codeInput"
                    name="postal_codeInput"
                    placeholder="Código postal"
                    onChange={(event) => setPostal_code(event.target.value)}
                  />
                </div>
              </div>
              <div className="form-group marginadoTop">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label">Acepto el tratamiento de mis datos</label>
                </div>
              </div>
              {error ? <Warning text="Algo no ha ido bien" /> : ""}
              <div className="form-group marginadoTop">
                <button type="submit" className="btn btn-primary">
                  Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register2;