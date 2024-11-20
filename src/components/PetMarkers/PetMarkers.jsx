import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

const PetMarkers = ({ petsList }) => {
  return (
    <>
      {petsList.map((pet) => (
        <AdvancedMarker key={pet.id} position={{ lat: pet.lat, lng: pet.lng }}>
          <Pin
            background={"#c3b2f7"}
            glyphColor={"#FFF"}
            borderColor={"#66646e"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PetMarkers;

PetMarkers.propTypes = {
  petsList: PropTypes.array.isRequired,
};
