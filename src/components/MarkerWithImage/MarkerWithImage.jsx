import { AdvancedMarker, CollisionBehavior } from "@vis.gl/react-google-maps";
import "./MarkerWithImage.scss";
import PropTypes from "prop-types";
import { useState } from "react";

function MarkerWithImage({ marker, handleMarkerClick = null }) {
  const [zIndex, setZIndex] = useState(1);
  const handleClick = () => {
    handleMarkerClick(marker.id);
    setZIndex(2);
  };

  return (
    <AdvancedMarker
      className="image-marker"
      collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}
      clickable={true}
      zIndex={zIndex}
      onClick={handleMarkerClick && handleClick}
      position={{ lat: marker.lat, lng: marker.lng }}
    >
      <div className="image-marker__container">
        <img
          className="image-marker__image"
          src={marker.pet_image}
          alt={`${marker.pet_name}'s picture`}
        />
        <p className="image-marker__text">{marker.pet_name}</p>
      </div>
    </AdvancedMarker>
  );
}

export default MarkerWithImage;

MarkerWithImage.propTypes = {
  marker: PropTypes.object.isRequired,
  handleMarkerClick: PropTypes.func,
};
