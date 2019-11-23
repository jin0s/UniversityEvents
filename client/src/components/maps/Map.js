import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';

const Map = compose(
  withProps({
    googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD-v-ZiHbJSrd_PyLPAkKi5ML6U5yGY-Dw&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
}),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
      defaultZoom={10}
      center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
  >
      {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} onClick={props.onMarkerClick} />}
  </GoogleMap>
  
));

export default Map;