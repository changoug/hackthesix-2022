import React, { Component, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
lat: -3.745,
lng: -38.523
};


const MapInterface = () => {
    const [ currentLocations, setLocations ] = useState([]);

    useEffect( () => {
        setLocations()
    }, [])

    const loc = [
      {
        name: "Location 1",
        location: { 
          lat: 41.3954,
          lng: 2.162 
        },
      },
      {
        name: "Location 2",
        location: { 
          lat: 41.3917,
          lng: 2.1649
        },
      },
      {
        name: "Location 3",
        location: { 
          lat: 41.3773,
          lng: 2.1585
        },
      },
      {
        name: "Location 4",
        location: { 
          lat: 41.3797,
          lng: 2.1682
        },
      },
      {
        name: "Location 5",
        location: { 
          lat: 41.4055,
          lng: 2.1915
        },
      }
    ]

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyCi4Z6r3IAxS0ywrRniNwvzUFreM7poFyk"
    });

    // const [map, setMap] = React.useState(null)

    // const onLoad = React.useCallback(function callback(map) {
    //   const bounds = new window.google.maps.LatLngBounds(center);
    //   map.fitBounds(bounds);
    //   setMap(map)
    // }, [])
  
    // const onUnmount = React.useCallback(function callback(map) {
    //   setMap(null)
    // }, [])
  
    const defaultMapOptions = {
        streetViewControl: true,
        fullscreenControl: false
    }

    return ( isLoaded ? (
        <GoogleMap
            center={center}
            mapContainerStyle={containerStyle}
            zoom={15}
            options={defaultMapOptions}
        >
            {
              loc.map(item => {
              console.log(item.name)
              return (
              <Marker key={item.name} position={item.location}/>
              )
              })
            }
        </GoogleMap>
    ) : <></>
  )
}

export default MapInterface;