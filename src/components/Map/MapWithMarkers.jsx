import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultMapCenter = { lat: 49.2827, lng: -123.1207 };

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_KEY;

function MapWithMarkers({ pets, updateVisiblePets }) {
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
        },
        () => {
          setIsGeolocationAvailable(false);
        }
      );
    } else {
      setIsGeolocationAvailable(false);
    }
  }, []);

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
        center={mapCenter}
        mapId={mapId}
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
