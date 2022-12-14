import Nav from 'react-bootstrap/Nav';
import { useContext, useEffect, useState } from "react"
import MapImg from './MapImg';
import GridImg from './GridImg';
import { defaultFetch } from '../helpers/defaultFetch';
import UserContext from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faImages } from '@fortawesome/free-solid-svg-icons';



function DisplayImg(props) {
  const [view, setview] = useState(null)
  const [userImages, setUserImages] = useState(null)
  const { user, setUser } = useContext(UserContext)
  const [usercoords, setCoords] = useState(null)
  const [load, setLoad] = useState(false)


  useEffect(() => {
    if (!load && props.id_user != undefined)
      defaultFetch(`/getImagesById/${props.id_user}`).then((res) => {
        setUserImages(res)
        setLoad(true)
      })
  })

  useEffect(() => {
    fetch(`/getDistance/${user.id}`).then(res => res.json()).then(res => {
      user.total_distance = res.total_distance
      props.setTotal_distance(res.total_distance)
    })
  }, [userImages])

  useEffect(() => {
    setTimeout(() => {
      setview("grid")
      setLoad(false)
    }, 1000);
  }, [])


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords([position.coords.latitude, position.coords.longitude])
        user.coordinates = [position.coords.latitude, position.coords.longitude];
        setUser(user)
      });
    } else {
      console.warn("Tu navegador no soporta Geolocalización!! ");
    }
  }, [])

  if (userImages === null) {
    return <p>Cargando datos...</p>;
  } else {


    return (
      <div id='DisplayImg'>
        <Nav fill variant="tabs" activeKey="2" className='navdisplay'>
          <Nav.Item>
            <Nav.Link eventKey="1" onClick={() => setview("grid")}><FontAwesomeIcon icon={faImages} /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="1" onClick={() => setview("map")}><FontAwesomeIcon icon={faMapLocationDot} /></Nav.Link>
          </Nav.Item>
        </Nav>
        {view === "map"
          ? <div id='map'><MapImg coords={usercoords} images={userImages} setLoad={setLoad}></MapImg></div> : null}
        {view === "grid"
          ? <GridImg images={userImages} setLoad={setLoad} /> : null}

      </div>
    );
  }
}

export default DisplayImg;