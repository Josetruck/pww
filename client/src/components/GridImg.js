import React, { useEffect } from "react";

function GridImg(props){
const images = props.images

return (
    <div className="grid">
      {images.length > 0 &&images.map(image => (
        <img className="imgGrid" src={`http://localhost:5000/Images/${image.id_user}/${image.url}`} alt={image.alt} />
      ))}
    </div>
  );
}

export default GridImg