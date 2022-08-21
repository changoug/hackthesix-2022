import React, { Component, useState, useRef, useEffect } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader, DistanceMatrixService } from '@react-google-maps/api';
import axios from "axios";

const MapInterface = () => {

  const baseURL = "http://127.0.0.1:5000";
  
  const [helpLocation, setHelpLocation] = useState({})

  const [requests, setRequests] = useState();

  useEffect(() => {
    axios.get(baseURL + '/helpRequests', { withCredentials: false }).then((response) => {
      setRequests(response.data);
      console.log(response.data);
    });
  }, []);

  // for (let i = 0; i < requests.length; i++) {
  //   requests[i] = 
  //             {
  //               title: requests[2],
  //               description: requests[3],
  //               location: requests[4],
  //               contact: {
  //                 phone: requests[5],
  //                 email: requests[6]
  //               }
  //             };
  // }

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

  // const helpRequests = [
  //   {
  //     title: "Clogged Toilet",
  //     description: "Help me unclog toilet!",
  //     location: {
  //       lat: -3.745,
  //       lng: -38.523
  //     },
  //     contact: {
  //       phone: "647-647-6477",
  //       email: "myemail@gmail.com"
  //     }
  //   },
  //   {
  //     title: "Clogged Urinal",
  //     description: "Help me unclog urinal!",
  //     location: {
  //       lat: 43.66336,
  //       lng: -79.3870336
  //     },
  //     contact: {
  //       phone: "647-647-6477",
  //       email: "myemail@gmail.com"
  //     }
  //   }
  // ];

  return ( isLoaded && requests ? (
      <GoogleMap
          center={center}
          mapContainerStyle={containerStyle}
          zoom={15}
          options={defaultMapOptions}
          onClick={() => setHelpLocation({})}
      >
          {requests && (
              requests.map(item => {
                return (
                  <Marker 
                  position={item.location}
                  onClick={() => {
                    setHelpLocation(item);
                  }}
                  />
                )
              })
          )
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