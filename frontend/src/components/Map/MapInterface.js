import React, { Component, useState, useRef } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader, DistanceMatrixService } from '@react-google-maps/api';

const MapInterface = () => {
    const [helpLocation, setHelpLocation] = useState({})

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyCi4Z6r3IAxS0ywrRniNwvzUFreM7poFyk"
    });
  
    const defaultMapOptions = {
      streetViewControl: true,
      fullscreenControl: false,
    };

    const containerStyle = {
      width: '100vw',
      height: '100vh'
    };
    
    const center = {
    lat: -3.745,
    lng: -38.523
    };

    const helpRequests = [
      {
        title: "Clogged Toilet",
        description: "Help me unclog toilet!",
        location: {
          lat: -3.745,
          lng: -38.523
        },
        contact: {
          phone: "647-647-6477",
          email: "myemail@gmail.com"
        }
      }
    ]

    return ( isLoaded ? (
        <GoogleMap
            center={center}
            mapContainerStyle={containerStyle}
            zoom={15}
            options={defaultMapOptions}
            onClick={() => setHelpLocation({})}
        >
            {
              helpRequests.map(item => {
                return (
                  <Marker 
                  position={item.location}
                  onClick={() => {
                    setHelpLocation(item);
                  }}
                  />
                )
              })
            }
            {
              helpLocation.location && (
                <InfoWindow
                position={helpLocation.location}
                clickable={true}
                onCloseClick={() => setHelpLocation({})}>
                  <div>
                    <img src={'https://fox5sandiego.com/wp-content/uploads/sites/15/2022/05/okmulgeeimage2crop.jpg?w=768'} width='300px' style={{marginTop: 10}}/>
                    <h2>{helpLocation.title}</h2>
                    <p>{helpLocation.contact.phone}</p>
                    <p>{helpLocation.contact.email}</p>
                    <p>{helpLocation.description}</p>
                  </div>
                </InfoWindow>
              )
            }
        </GoogleMap>
    ) : <></>
  )
}

export default MapInterface;