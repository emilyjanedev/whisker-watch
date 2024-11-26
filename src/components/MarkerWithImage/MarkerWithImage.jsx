import { AdvancedMarker, CollisionBehavior } from "@vis.gl/react-google-maps";
import "./MarkerWIthImage.scss";
import PropTypes from "prop-types";

function MarkerWithImage({ marker }) {
  return (
    <AdvancedMarker
      className="image-marker"
      collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}
      clickable={true}
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
};
