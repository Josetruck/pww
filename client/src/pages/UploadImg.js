import React, { useContext, useState,useEffect } from "react";
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
    const [verify1, setVerify1] = useState(false)
    const navigate = useNavigate();
    const user = useContext(UserContext)
    const id_user = user.user.id

    //Obtenemos la localización de la imagen mediante geocodificación inversa.
    const fetchAddress = async (lat, lon) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
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
                console.log(result.tags)
                
                // Accede a los metadatos a través del objeto result
                const dateTimestamp = result.tags.DateTimeOriginal
                const date = new Date(dateTimestamp * 1000);
            const dateString = date.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
            const gpsLat = result.tags.GPSLatitude;
            const gpsLon = result.tags.GPSLongitude;
            const coordinates = [gpsLat, gpsLon]
            fetchAddress(gpsLat, gpsLon);
            setMetadata({
                coordinates,
                dateString,
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
        })
        .then(res => res.json()).then(res => {
            const url = res.path;
            
            const datos = {
                id_user: id_user,
                date: metadata.dateString,
                url: url,
                location: metadata.coordinates
            }
            console.log(datos)
            defaultFetch("/insertImg", "POST", datos).then(res => {
                console.log(res)
                if (res === "ok") {
                    navigate("/")
                }
            })
        });
    }
    useEffect(()=>{
        if(!isLogged()){
            navigate("/login")
        }else{
            setVerify1(true)
        }
    })
    if (verify1) {
        return (
            <div className="App">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <form id="loginform" onSubmit={handleUpload}>
                                <h2>Nueva imagen:</h2>

                                <div className="form-group">
                                    <label>Elegir imagen</label>
                                    <input
                                        required
                                        type="file"
                                        className="form-control"
                                        id="imagen"
                                        placeholder=""
                                        onChange={handleImageChange}
                                    />
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