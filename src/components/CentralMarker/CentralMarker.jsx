import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import PetsIcon from "@mui/icons-material/Pets";

const glyphImg = document.createElement("img");
glyphImg.src = PetsIcon;

const CentralMarker = ({ markerLocation }) => {
  return (
    <AdvancedMarker position={markerLocation} zIndex={2}>
      <Pin background={"#5df0f5"} glyphColor={"#FFF"} borderColor={"#66646e"} />
    </AdvancedMarker>
  );
};

export default CentralMarker;

CentralMarker.propTypes = {
  markerLocation: PropTypes.object.isRequired,
};
