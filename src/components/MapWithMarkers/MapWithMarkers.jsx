import { mapContainerStyle } from "../../constants/mapConstants.js";
import * as googleMapsApi from "../../api/googleMaps.js";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import PropTypes from "prop-types";
import MarkerWithImage from "../MarkerWithImage/MarkerWithImage.jsx";
import MarkerWithTooltip from "../MarkerWithTooltip/MarkerWithTooltip.jsx";
function MapWithMarkers({
  markersList,
  markerChoice,
  mapLocation,
  updateVisibleMarkers = null,
  centralMarker = {},
}) {
  const map = useMap();

  const handleMapLoad = (ev) => {
    const bounds = ev.map.getBounds();

    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    const filteredMarkers = markersList.filter(
      (marker) =>
        marker.lat >= southWest.lat() &&
        marker.lat <= northEast.lat() &&
        marker.lng >= southWest.lng() &&
        marker.lng <= northEast.lng()
    );

    if (updateVisibleMarkers) {
      updateVisibleMarkers(filteredMarkers);
    }
  };

  useEffect(() => {
    if (map) {
      map.panTo(mapLocation);
    }
  }, [mapLocation, map]);

  return (
    <Map
      style={mapContainerStyle}
      defaultZoom={14}
      mapId={googleMapsApi.mapId}
      defaultCenter={mapLocation}
      onTilesLoaded={(ev) => handleMapLoad(ev)}
    >
      {markersList.map((marker) =>
        markerChoice === "pet" ? (
          <MarkerWithImage key={marker.id} marker={marker} />
        ) : (
          <MarkerWithTooltip key={marker.id} marker={marker} />
        )
      )}
      {centralMarker.lat && <MarkerWithImage marker={centralMarker} />}
    </Map>
  );
}

export default MapWithMarkers;

MapWithMarkers.propTypes = {
  markersList: PropTypes.array.isRequired,
  markerChoice: PropTypes.string.isRequired,
  mapLocation: PropTypes.object.isRequired,
  updateVisibleMarkers: PropTypes.func,
  centralMarker: PropTypes.object,
};
