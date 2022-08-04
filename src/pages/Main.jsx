import React, { useState } from "react";
import { CssBaseline, Grid } from "@mui/material";

import List from "components/List";
import Map from "components/Map";
import NavBar from "components/NavBar";
import { getPlacesData } from "services/api";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function Copyright(props) {
  const { currentUser } = useAuth();
  return !currentUser ? (
    <Navigate to="/signin" replace />
  ) : (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Rifqi Ahmad Fauzi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Main() {
  const [places, setPlaces] = React.useState([]);
  const [childClicked, setChildClicked] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState({});
  const [bounds, setBounds] = useState(null);
  const [type, setType] = React.useState("restaurants");
  const [rating, setRating] = React.useState("0");
  const [filteredPlaces, setFilteredPlaces] = React.useState([]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  React.useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [places, rating]);

  React.useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setRating("");
      });
    }
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <NavBar setCoordinates={setCoordinates} />
      <Grid container spacing={2} sx={{ p: 1 }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
