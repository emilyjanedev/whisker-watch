import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import PetsIcon from "@mui/icons-material/Pets";

const glyphImg = document.createElement("img");
glyphImg.src = PetsIcon;

const PetMarkers = ({ markersList }) => {
  return (
    <>
      {markersList.map((marker) => (
        <AdvancedMarker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
        >
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
  markersList: PropTypes.array.isRequired,
};
