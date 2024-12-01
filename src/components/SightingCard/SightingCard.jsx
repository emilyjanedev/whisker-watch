import { format } from "date-fns";
import PropTypes from "prop-types";
import PlaceIcon from "@mui/icons-material/Place";
import PetsIcon from "@mui/icons-material/Pets";
import "./SightingCard.scss";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
function SightingCard({ sightingData, handleClick }) {
  const { lat, lng } = sightingData;

  return (
    <div className="sighting-card">
      <ListItem
        className="sighting-card__list-item"
        secondaryAction={
          handleClick ? (
            <IconButton
              aria-label="delete"
              onClick={() => handleClick({ lat, lng })}
              size="large"
            >
              <PlaceIcon color="secondary" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              component={Link}
              to={`/pets/${sightingData.pet_id}`}
              size="large"
            >
              <PetsIcon color="secondary" />
            </IconButton>
          )
        }
      >
        <ListItemAvatar className="sighting-card__avatar-container">
          {sightingData.user_name ? (
            <Avatar
              alt={`${sightingData.user_name.toUpperCase()}'s profile image`}
              src="/static/images/avatar/2.jpg"
              className="sighting-card__avatar"
            />
          ) : (
            <Avatar alt="user profile image" />
          )}
        </ListItemAvatar>
        <ListItemText
          className="sighting-card__text"
          primary={sightingData.note}
          secondary={`Seen on ${format(
            sightingData.sighted_at,
            "MMM do, yyyy"
          )} - ${sightingData.city} ${
            sightingData.user_name
              ? `- Reported by ${sightingData.user_name}`
              : ""
          }`}
        />
      </ListItem>
    </div>
  );
}

export default SightingCard;

SightingCard.propTypes = {
  sightingData: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};
