import React from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
} from "@mui/material";

import PlaceDetails from "components/PlaceDetails";

export default function List({
  places,
  childClicked,
  type,
  setType,
  rating,
  setRating,
}) {
  return (
    <>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <Typography variant="h4">Mau Kemana?</Typography>
        {/* <CircularProgress
        size="5rem"
        sx={{
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      /> */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="type">Tipe</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="Tipe"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="restaurants">Restoran</MenuItem>
            <MenuItem value="hotels">Hotel</MenuItem>
            <MenuItem value="attractions">Hiburan</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="rating">Nilai</InputLabel>
          <Select
            labelId="rating"
            id="rating"
            value={rating}
            label="Nilai"
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value="0">Semua</MenuItem>
            <MenuItem value="3">Diatas 3.0</MenuItem>
            <MenuItem value="4">Diatas 4.0</MenuItem>
            <MenuItem value="4.5">Diatas 4.5</MenuItem>
          </Select>
        </FormControl>
      </Card>
      <Grid
        container
        spacing={3}
        sx={{
          height: "75vh",
          overflow: "auto",
        }}
      >
        {places?.map((place, index) => (
          <Grid item key={index} xs={12}>
            <PlaceDetails
              place={place}
              selected={Number(childClicked) === index}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
