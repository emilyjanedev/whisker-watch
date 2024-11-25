import PetMarkers from "../PetMarkers/PetMarkers.jsx";
import CentralMarker from "../CentralMarker/CentralMarker.jsx";
import * as googleMapsApi from "../../api/googleMaps.js";
import { Map, useMap } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import { useEffect } from "react";

const mapContainerStyle = { width: "100%", height: "100%" };

function MapWithMarkers({
  markersList,
  mapLocation,
  updateVisibleMarkers = null,
  centralMarker = {},
}) {
  const map = useMap();

  const filterForVisibleMarkers = (bounds) => {
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

  useEffect(() => {
    if (!map) return;

    map.panTo(mapLocation);
  }, [mapLocation, map]);

  const handleBoundsChanged = (ev) => {
    const bounds = ev.detail.bounds;
    filterForVisibleMarkers(bounds);
  };

  return (
    <Map
      style={mapContainerStyle}
      defaultZoom={14}
      reuseMaps={true}
      mapId={googleMapsApi.mapId}
      defaultCenter={mapLocation}
      onCameraChanged={(ev) => handleBoundsChanged(ev)}
      onLoad={(ev) => filterForVisibleMarkers(ev.details.bounds)}
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