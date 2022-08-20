import React, { Component, useState } from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';

const HelpTicker = props => {
    const [infoWindowOpen, setInfoWindowDisplay] = useState(0);
    const {helpRequest} = props;

    const position = {
        lat: -3.745,
        lng: -38.523
    }

    const throttleInfoWindow = () => {
        if (!infoWindowOpen) {
            setInfoWindowDisplay(1);
        }
        setInfoWindowDisplay(0);
    }

    console.log(helpRequest);

    return (
        <React.Fragment>
            <Marker
            position={helpRequest.location}
            onClick={throttleInfoWindow}
            />
            {infoWindowOpen && (
                <InfoWindow
                    position={helpRequest.location}
                    >
                    <div>
                        <h1>InfoWindow</h1>
                    </div>
                </InfoWindow>
            )}
        </React.Fragment>
    )
}

export default HelpTicker;