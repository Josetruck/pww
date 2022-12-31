import React, { useEffect } from "react";
import ModalImg from "./ModalImg";

function GridImg(props){
const images = props.images


return (
    <div className="grid">
      {images.length > 0 &&images.map((image, i) => (
        <ModalImg classImg="imgGrid" img={image} setLoad={props.setLoad} key={i}/>
      ))}
    </div>
  );
}

export default GridImg