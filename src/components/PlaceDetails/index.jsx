import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PlaceDetails({ place, selected }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title={place.name}
          subheader={
            <Box display="flex" justifyContent="space-between" my={2}>
              <Rating name="read-only" value={Number(place.rating)} readOnly />
              <Typography component="legend">
                {place.num_reviews} ulasan
              </Typography>
            </Box>
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={
            place.photo
              ? place.photo.images.large.url
              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
          }
          title={place.name}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Harga</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>

          {place?.cuisine?.map(({ name }) => (
            <Chip key={name} size="small" label={name} />
          ))}
          <Divider />

          {place.address && (
            <Typography gutterBottom variant="body2" sx={{ mt: 1 }}>
              {place.address}
            </Typography>
          )}
          {place.phone && (
            <Typography variant="body2">{place.phone}</Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <BookmarkAddIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Peringkat</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>
          <CardContent>
            {place?.awards?.map((award, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                my={1}
                alignItems="center"
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {award.display_name}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
