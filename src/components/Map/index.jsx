import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, useMediaQuery, Card } from "@mui/material";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import AttractionsIcon from "@mui/icons-material/Attractions";
import HotelIcon from "@mui/icons-material/Hotel";

export default function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) {
  const matches = useMediaQuery("(min-width:600px)");

  const InfoPlace = ({ place }) => {
    const text = place?.category?.key;
    if (matches && place.photo) {
      return (
        <Paper
          elevation={3}
          sx={{ zIndex: -1, "&:hover": { zIndex: 2, cursor: "pointer" } }}
        >
          <img src={place.photo.images.thumbnail.url} alt="Foto Tempat" />
        </Paper>
      );
    } else {
      if (text === "restaurant") {
        return <EmojiFoodBeverageIcon />;
      } else if (text === "hotel") {
        return <HotelIcon />;
      } else if (text === "attraction") {
        return <AttractionsIcon />;
      } else {
        return <></>;
      }
    }
  };
  return (
    <Card variant="outlined" style={{ height: "85vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={{ lat: 0, lng: 0 }}
        center={coordinates}
        defaultZoom={15}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.map((place, index) => (
          <InfoPlace
            lat={place.latitude}
            lng={place.longitude}
            key={index}
            place={place}
          />
        ))}
      </GoogleMapReact>
    </Card>
  );
}
