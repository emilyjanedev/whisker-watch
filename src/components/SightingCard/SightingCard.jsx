import { format } from "date-fns";
import PropTypes from "prop-types";
import PlaceIcon from "@mui/icons-material/Place";
import "./SightingCard.scss";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";

function SightingCard({ sightingData, handleClick }) {
  const { lat, lng } = sightingData;

  return (
    <div className="sighting-card">
      <ListItem
        className="sighting-card__list-item"
        secondaryAction={
          <IconButton
            aria-label="delete"
            onClick={() => handleClick({ lat, lng })}
            size="large"
          >
            <PlaceIcon color="secondary" />
          </IconButton>
        }
      >
        <ListItemAvatar className="sighting-card__avatar-container">
          <Avatar className="sighting-card__avatar" />
        </ListItemAvatar>
        <ListItemText
          className="sighting-card__text"
          primary={sightingData.note}
          secondary={`Seen on ${format(sightingData.sighted_at, "MMM do")} - ${
            sightingData.city
          }`}
        />
      </ListItem>
    </div>
  );
}

export default SightingCard;

SightingCard.propTypes = {
  sightingData: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};
