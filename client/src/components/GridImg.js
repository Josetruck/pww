import React, { useEffect } from "react";

function GridImg(props){
const images = props.images

useEffect(()=>{
    
    console.log(images)
})

return (
    <div className="grid">
      {images.map(image => (
        <img className="imgGrid" src={`http://localhost:5000/Images/${image.id_user}/${image.url}`} alt={image.alt} />
      ))}
    </div>
  );
}

export default GridImg