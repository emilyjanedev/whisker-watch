import { format } from "date-fns";
import PropTypes from "prop-types";
import PlaceIcon from "@mui/icons-material/Place";
import "./SightingCard.scss";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";

function SightingCard({ sightingData, handleClick }) {
  const { lat, lng } = sightingData;

  return (
    <div className="sighting-card">
      <Paper
        className="sighting-card__paper"
        elevation={2}
        sx={{ borderRadius: "20px" }}
      >
        <ListItem
          className="sighting-card__list-item"
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleClick({ lat, lng })}
              size="large"
            >
              <PlaceIcon />
            </IconButton>
          }
        >
          <ListItemAvatar className="sighting-card__avatar-container">
            <Avatar className="sighting-card__avatar" />
          </ListItemAvatar>
          <ListItemText
            className="sighting-card__text"
            primary={sightingData.note}
            secondary={`Seen on ${format(sightingData.sighted_at, "MMM do")}`}
          />
        </ListItem>
      </Paper>
    </div>
  );
}

export default SightingCard;

SightingCard.propTypes = {
  sightingData: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};
