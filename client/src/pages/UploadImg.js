import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { defaultFetch } from "../helpers/defaultFetch";
import Warning from "../components/warnings/Warning";
import AlertOk from "../components/warnings/AlertOk";
import ExifParser from 'exif-parser';

function UploadImage() {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [address, setAddress] = useState(null);

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
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
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

    const loginSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="App">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={loginSubmit}>
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

                            {imagePreviewUrl && <div className="form-group centrado marginadoTop"><img src={imagePreviewUrl} alt="Preview" className="imgPreview" /></div>}
                            <div className="form-group marginadoTop">
                                <button type="submit" className="btn btn-primary">
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
export default UploadImage;