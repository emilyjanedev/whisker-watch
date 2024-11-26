import PetMarkers from "../PetMarkers/PetMarkers.jsx";
import CentralMarker from "../CentralMarker/CentralMarker.jsx";
import * as googleMapsApi from "../../api/googleMaps.js";
import { Map } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

const mapContainerStyle = { width: "100%", height: "100%" };

function MapWithMarkers({
  markersList,
  mapLocation,
  updateVisibleMarkers = null,
  centralMarker = {},
}) {
  const handleBoundsChanged = (ev) => {
    const bounds = ev.detail.bounds;
    const northEast = { lat: bounds.north, lng: bounds.east };
    const southWest = { lat: bounds.south, lng: bounds.west };

    const filteredMarkers = markersList.filter(
      (marker) =>
        marker.lat >= southWest.lat &&
        marker.lat <= northEast.lat &&
        marker.lng >= southWest.lng &&
        marker.lng <= northEast.lng
    );
    if (updateVisibleMarkers) {
      updateVisibleMarkers(filteredMarkers);
    }
  };

  return (
    <Map
      style={mapContainerStyle}
      defaultZoom={14}
      mapId={googleMapsApi.mapId}
      defaultCenter={mapLocation}
      onCameraChanged={(ev) => handleBoundsChanged(ev)}
    >
      <PetMarkers markersList={markersList} />
      {centralMarker.lat && <CentralMarker markerLocation={centralMarker} />}
    </Map>
  );
}

export default MapWithMarkers;

MapWithMarkers.propTypes = {
  markersList: PropTypes.array.isRequired,
  mapLocation: PropTypes.object.isRequired,
  updateVisibleMarkers: PropTypes.func,
  centralMarker: PropTypes.object,
};
