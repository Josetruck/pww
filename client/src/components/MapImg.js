import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import React from 'react';
import { Component } from 'react';
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






  


  
    return <MapContainer center={props.coords} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[40.4214943, -3.6927735]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

    </MapContainer>
  }


export default MapImg