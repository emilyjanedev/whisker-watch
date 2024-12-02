import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import "./MarkerWithImage.scss";
import PropTypes from "prop-types";

function MarkerWithImage({ marker, activeMarker, handleMarkerClick = null }) {
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    if (activeMarker === marker.id) {
      setZIndex(2);
    } else {
      setZIndex(1);
    }
  }, [activeMarker]);

  const handleClick = () => {
    handleMarkerClick &&
      handleMarkerClick(marker.id, { lat: marker.lat, lng: marker.lng });
  };

  return (
    <AdvancedMarker
      className="image-marker"
      clickable={true}
      onClick={handleClick}
      position={{ lat: marker.lat, lng: marker.lng }}
      zIndex={zIndex}
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
  activeMarker: PropTypes.number,
};
