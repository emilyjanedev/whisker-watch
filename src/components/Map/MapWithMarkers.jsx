import { useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import * as googleMapsApi from "../../api/googleMaps.js";
import PropTypes from "prop-types";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

function MapWithMarkers({ pets, updateVisiblePets, mapLocation }) {
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApi.apiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const handleBoundsChanged = () => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    const filteredPets = pets.filter(
      (pet) =>
        pet.lat >= southWest.lat() &&
        pet.lat <= northEast.lat() &&
        pet.lng >= southWest.lng() &&
        pet.lng <= northEast.lng()
    );
    updateVisiblePets(filteredPets);
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapLocation}
        mapId={googleMapsApi.mapId}
        zoom={12}
        onLoad={onLoad}
        onBoundsChanged={handleBoundsChanged}
      >
        {pets.map((pet) => (
          <Marker key={pet.id} position={{ lat: pet.lat, lng: pet.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapWithMarkers;

MapWithMarkers.propTypes = {
  pets: PropTypes.array.isRequired,
  updateVisiblePets: PropTypes.func.isRequired,
  mapLocation: PropTypes.object.isRequired,
};
