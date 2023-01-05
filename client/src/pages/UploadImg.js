import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ExifParser from 'exif-parser';
import { defaultFetch } from '../helpers/defaultFetch'
import UserContext from "../context/UserContext";
import { isLogged } from "../helpers/isLogged";

function UploadImage() {
    const [metadata, setMetadata] = useState(null);
    const [address, setAddress] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [title, setTitle] = useState(null)
    const [verify1, setVerify1] = useState(false)
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const id_user = user.id

    //Obtenemos la localización de la imagen mediante geocodificación inversa.
    const fetchAddress = async (coordinates) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[0]}&lon=${coordinates[1]}`
        );
        const data = await response.json();
        setAddress(data.display_name);
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file)


        setImagen({
            file: file,
            imagePreviewUrl: URL.createObjectURL(file)
        });
        const reader = new FileReader();
        reader.onload = () => {
            // Crea un parser para el archivo de imagen
            const parser = ExifParser.create(reader.result);

            // Parsea los metadatos EXIF del archivo de imagen
            const result = parser.parse();
            console.log("Lo de la foto_", result.tags)

            // Accede a los metadatos a través del objeto result

            const dateTimestamp = result.tags.DateTimeOriginal
            console.log(dateTimestamp)
            var date;
            if (dateTimestamp) {
                date = new Date(dateTimestamp * 1000);
            } else {
                date = new Date(Date.now())
            }

            //formateo de fecha
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dt = date.getDate();
            let hh = date.getHours()
            let mm = date.getMinutes()
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (hh < 10) {
                hh = '0' + hh;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            const dateString = (year + '-' + month + '-' + dt + " " + hh + ":" + mm).toString();
            const gpsLat = result.tags.GPSLatitude;
            const gpsLon = result.tags.GPSLongitude;
            var coordinates = [gpsLat, gpsLon]
            // Accede a las coordenadas del dispositivo en caso de que no estén disponibles en los metadatos
            if (!gpsLat) {
                coordinates = user.coordinates
            }
            fetchAddress(coordinates);
            setMetadata({
                coordinates,
                dateString,
                address
            });
        };
        reader.readAsArrayBuffer(file);
    }
    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imagen.file);
        console.log(formData)
        fetch("/upload", {
            method: "POST",
            body: formData,
            headers: {
                id_user: id_user
            }
        }).then(res => res.json()).then(res => {
            const url = res.path;

            const datos = {
                id_user: id_user,
                date: metadata.dateString,
                title: title,
                url: url,
                location: metadata.coordinates,
                address: address
            }
            console.log("titulo", title, datos)
            defaultFetch("/insertImg", "POST", datos).then(res => {
                if (res === "ok") {
                    navigate("/")
                    setUser(user)
                }
            })
        });
    }
    useEffect(() => {
        if (!isLogged()) {
            navigate("/login")
        } else {
            setVerify1(true)
        }
    }, [navigate])
    if (verify1) {
        return (
            <div className="App">
                <div className="container Home">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <form id="loginform" onSubmit={handleUpload}>

                                <div className="centrado">
                                <h2>Nueva imagen:</h2>

                                    <label className="centrado">
                                        <input
                                            hidden
                                            required
                                            type="file"
                                            className="form-control"
                                            id="imagen"
                                            placeholder=""
                                            onChange={handleImageChange}
                                        />
                                        <div className="centrado">
                                            <img id="subirfoto" src={"https://icones.pro/wp-content/uploads/2021/02/icono-de-camara-gris.png"} />
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>Título</label>
                                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                {imagen && <div className="form-group centrado marginadoTop"><img src={imagen.imagePreviewUrl} alt="Preview" className="imgPreview" /></div>}
                                <div className="form-group marginadoTop">
                                    <button type="submit" className="btn btn-primary" >
                                        Submit
                                    </button>
                                </div>
                                {metadata && (
                                    <div>
                                        <p><strong>Fecha:</strong> {metadata.dateString}</p>
                                        <p><strong>Coordenadas:</strong> {metadata.coordinates}</p>
                                        <p><strong>Localizacion:</strong> {address}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}
export default UploadImage;