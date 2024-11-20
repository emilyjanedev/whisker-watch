import PetMarkers from "../PetMarkers/PetMarkers.jsx";
import * as googleMapsApi from "../../api/googleMaps.js";
import { Map } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const defaultMapLocation = { lat: 49.2827, lng: -123.1207 };
const mapContainerStyle = { width: "100%", height: "400px" };

function PetMap({ petsList, mapLocation, updateVisiblePets }) {
  const [center, setCenter] = useState(defaultMapLocation);

  useEffect(() => {
    setCenter(mapLocation);
  }, [mapLocation]);

  const handleBoundsChanged = (ev) => {
    const bounds = ev.detail.bounds;
    const northEast = { lat: bounds.north, lng: bounds.east };
    const southWest = { lat: bounds.south, lng: bounds.west };

    const filteredPets = petsList.filter(
      (pet) =>
        pet.lat >= southWest.lat &&
        pet.lat <= northEast.lat &&
        pet.lng >= southWest.lng &&
        pet.lng <= northEast.lng
    );
    updateVisiblePets(filteredPets);
  };

  return (
    <Map
      style={mapContainerStyle}
      defaultZoom={14}
      reuseMaps={true}
      mapId={googleMapsApi.mapId}
      center={center}
      onCameraChanged={(ev) => handleBoundsChanged(ev)}
    >
      <PetMarkers petsList={petsList} />
    </Map>
  );
}

export default PetMap;

PetMap.propTypes = {
  petsList: PropTypes.array.isRequired,
  mapLocation: PropTypes.object.isRequired,
  updateVisiblePets: PropTypes.func.isRequired,
};
