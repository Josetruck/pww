import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { defaultFetch } from "../helpers/defaultFetch";
import { Link } from "react-router-dom";

function Contact() {
    const navigate = useNavigate()
    const [verify1, setVerify1] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        if (!isLogged()) {
            navigate("/login")
        } else {
            setVerify1(true)
        }
    })

    function handleSearch() {
        defaultFetch("/searchUser", "post", { user_name: inputValue }).then(res => setResults(res))
        console.log(inputValue)
        console.log(results)
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
                                <p>{result.this_week_distance} Km esta semana</p>
                            </div>
                        })}
                    </div>
                    : null}
                    {results.length === 0 ?  <div className="resultados">
                        <h3>No hay resultados en la búsqueda</h3>
                    </div>:null

                    }

            </div>
        );
    }

}
export default Contact;