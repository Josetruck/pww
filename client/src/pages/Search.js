import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react"
import { defaultFetch } from "../helpers/defaultFetch";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Contact() {
    const navigate = useNavigate()
    const [verify1, setVerify1] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [results, setResults] = useState([])
    const { user } = useContext(UserContext)
    const [searched, setSearched] = useState(null)

    useEffect(() => {
        if (!isLogged()) {
            navigate("/login")
        } else {
            setVerify1(true)
        }
    })

    function handleSearch() {
        defaultFetch("/searchUser", "post", { user_name: inputValue, id_user: user.id }).then(res => setResults(res))
        setSearched(true)

        if(inputValue.length===0){
            setSearched(false)
        }
    }


    if (verify1) {
        return (
            <div className="Home">
                <div className="form-group marginadoTop">
                    <label>Búsqueda de usuarios</label>
                    <input
                        className="form-control"
                        type="text"
                        value={inputValue}
                        onChange={(e) => { setInputValue(e.target.value); handleSearch() }} />
                </div>

                {results ?
                    <div className="resultados">
                        {results.map((result, i) => {
                            return <div className="result" key={i}>
                                <Link to={`/profile/${result.id}`}><h3>{result.user_name}</h3></Link>
                                <p>{result.total_distance} Km esta semana</p>
                            </div>
                        })}
                    </div>
                    : null}
                {searched && results.length === 0 ? <div className="resultados">
                    <h4>No hay resultados en la búsqueda</h4>
                </div> : null
                }

            </div>
        );
    }

}
export default Contact;