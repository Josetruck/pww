import Nav from 'react-bootstrap/Nav';
import {useEffect, useState} from "react"
import MapImg from './MapImg';
import GridImg from './GridImg';
import { defaultFetch } from '../helpers/defaultFetch';
import { useParams } from 'react-router-dom';

function DisplayImg(props) {
    const [view , setview] = useState(null)
    const [usercoords, setCoords] = useState([50.4214943, -3.6927735])
    const [userImages, setUserImages] = useState([])
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(()=>{
      defaultFetch(`/getImagesById/${props.id_user}`).then((res)=>{
        setUserImages(res)
        setImgLoaded(true)
      })
    },[view])

    useEffect(()=>{
      if(!imgLoaded){
        setview("grid")
      }
    })

    useEffect(()=>{
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords([position.coords.latitude, position.coords.longitude])
        });
      } else {
        console.warn("Tu navegador no soporta Geolocalización!! ");
      }},[])

  return (
    <div id='DisplayImg'>
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link onClick={() => setview("grid")}>Grid</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => setview("map")}>Map</Nav.Link>
      </Nav.Item>
    </Nav>
    {view === "map" 
    ? <div id='map'><MapImg coords={usercoords} images={userImages}></MapImg></div> : null}
    {view === "grid" 
    ? <div id="grid"><GridImg images={userImages}/></div> : null}
    
    </div>
  );
}

export default DisplayImg;