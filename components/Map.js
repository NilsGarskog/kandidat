import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const Map = () => {
    const containerStyle = {
      width: '100%',
      height: '400px'
    };
  
    const center = {
      lat: 37.7749,
      lng: -122.4194
    };
  
    return (
       
      <LoadScript googleMapsApiKey= 'AIzaSyAcefY0m6wGYBEsdDMpMpCYKGYOsfKqbH0'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      </LoadScript>
    );
  };
  
  export default Map;
