import React, { Component, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapInterface = () => {
    const [ currentLocations, setLocations ] = useState([]);

    useEffect( () => {
        setLocations([
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
        ])
    }, [])

    const containerStyle = {
        width: '100vw',
        height: '100vh'
    };
      
    const center = {
    lat: -3.745,
    lng: -38.523
    };
      
    const defaultMapOptions = {
        streetViewControl: true,
        fullscreenControl: false
    }

    return (
        <LoadScript
        googleMapsApiKey="AIzaSyCi4Z6r3IAxS0ywrRniNwvzUFreM7poFyk"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={defaultMapOptions}
            >
                {
                        currentLocations.map(item => {
                        return (
                        <Marker key={item.name} position={item.location}/>
                        )
                        })
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapInterface;