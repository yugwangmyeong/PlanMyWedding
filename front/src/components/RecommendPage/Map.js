import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
  marginTop: "10px",
};

const MyMap = ({ lat, lon, title }) => {
  const center = {
    lat: lat,
    lng: lon,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} title={title} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
