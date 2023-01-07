import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ModalImg from "./ModalImg";

function GridImg(props) {
  const images = props.images


  return (
    <div>
      {images.length == 0 && <div className="centrado marginadoTop"><h3 className="marginadoTop">Aún no has subido ninguna imagen</h3><Link to={"/uploadimage"}><button className="btn btn-secondary">Sube una imagen</button></Link></div>}
      <div className="grid">
        {images.length > 0 && images.map((image, i) => (
          <ModalImg classImg="imgGrid" img={image} setLoad={props.setLoad} key={i} />
        ))}
      </div>
    </div>
  );
}

export default GridImg