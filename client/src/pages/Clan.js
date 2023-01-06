import React, { useEffect, useState } from "react"
import { isLogged } from "../helpers/isLogged";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Clan() {
    const navigate = useNavigate()
    const [verify1, setVerify1] = useState(false)
    const [topTen, setTopTen] = useState(null)
    useEffect(() => {
        if (!isLogged()) {
            navigate("/login")
        } else {
            setVerify1(true)
        }
    })

    useEffect(() => {
        fetch("/getTopTen").then(res => res.json()).then(res => setTopTen(res))
    }, [])

    if (verify1) {
        return <div className="Home">
            <div className="marginadoTop form-group">
                <h1>Top 10 PictureWorlwiders</h1>
            </div>
            {topTen ?
                <table className="table">
                    <thead className="thdark" >
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Distancia Total</th>
                    </thead>
                    <tbody>
                        {topTen.map((result, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>
                                    <Link to={`/profile/${result.id}`}><h3>{result.user_name}</h3></Link>
                                </td>
                                <td>
                                    <p>{result.total_distance} Km</p>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                : null}
        </div>
    }

}

export default Clan