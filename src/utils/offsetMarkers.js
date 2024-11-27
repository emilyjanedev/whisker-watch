const offsetMarkers = (markersList) => {
  const usedLocations = [];
  const adjustedMarkersList = markersList.map((marker) => {
    let { lat, lng } = marker;
    while (usedLocations.includes(lat.toString() + lng.toString())) {
      lat = lat * 1.000001;
      lng = lng * 1.000001;
    }

    usedLocations.push(lat.toString() + lng.toString());

    return { ...marker, lat, lng };
  });

  return adjustedMarkersList;
};

export { offsetMarkers };
