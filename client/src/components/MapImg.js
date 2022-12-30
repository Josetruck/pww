import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import React from 'react';
import ModalImg from './ModalImg'
import 'leaflet/dist/leaflet.css';
import "../App.css"
import { useEffect, useState } from 'react';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




function MapImg(props) {
  const images = props.images

    return (
    <div>
    
    <MapContainer center={props.coords} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
      {images.map(image => (
        <Marker position={image.location}>
        <Popup> 
          <div> 
          <ModalImg img={image}/>
          </div>
        </Popup>
      </Marker>
      ))}
    </MapContainer></div>)
  }
  


export default MapImg