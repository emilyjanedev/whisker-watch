import { AdvancedMarker, CollisionBehavior } from "@vis.gl/react-google-maps";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import PropTypes from "prop-types";
import { useState } from "react";
import { IconButton } from "@mui/material";
import "./MarkerWithTooltip.scss";

function MarkerWithTooltip({ marker }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  return (
    <AdvancedMarker
      className="tooltip-marker"
      collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}
      clickable={true}
      position={{ lat: marker.lat, lng: marker.lng }}
    >
      <div className="tooltip-marker__container">
        {showTooltip && (
          <p
            className={`tooltip-marker__tooltip ${
              showTooltip ? "visible" : ""
            }`}
          >
            {marker.note}
          </p>
        )}
        <IconButton onClick={handleToggleTooltip}>
          <FmdBadIcon color="secondary" />
        </IconButton>
      </div>
    </AdvancedMarker>
  );
}

export default MarkerWithTooltip;

MarkerWithTooltip.propTypes = {
  marker: PropTypes.object.isRequired,
};
