import Nav from 'react-bootstrap/Nav';
import {useEffect, useState} from "react"
import MapImg from './MapImg';
function DisplayImg() {
    const [view , setview] = useState("grid")
    const [usercoords, setCoords] = useState([50.4214943, -3.6927735])
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
    ? <div id='map'><MapImg coords={usercoords}></MapImg></div> : <h2>Grid</h2>}
    </div>
  );
}

export default DisplayImg;