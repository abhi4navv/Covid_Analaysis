

import React from 'react';

import googleMapStyles from "../assets/GoogelMapsStyle"
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';




export class Maps extends React.Component {
    render() {
        const mapStyles = {
            width: '95%',
            height: '100%',
          };
      return (
        <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 9.761927, lng: 79.95244 }}
      >
          <Marker position={{ lat: 9.761927, lng: 79.95244 }} />
      </Map>
      );
    }
  }
  Maps.defaultProps = googleMapStyles;
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyDUCMYjr2ZVRP2vUzLgUG7oOkK3yjqND_Y'
  })(Maps);