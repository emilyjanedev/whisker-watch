import { useState, useEffect, useCallback } from "react";
import MapWithMarkers from "../../components/Map/MapWithMarkers.jsx";
import LocationInput from "../../components/LocationInput/LocationInput.jsx";
import { useJsApiLoader } from "@react-google-maps/api";
import * as googleMapsApi from "../../api/googleMaps.js";
import * as backend from "../../api/backend.js";

const defaultMapLocation = { lat: 49.2827, lng: -123.1207 };
const libraries = ["places"];

function PetMapPage() {
  const [petsList, setPetsList] = useState([]);
  const [visiblePets, setVisiblePets] = useState([]);
  const [mapLocation, setMapLocation] = useState(defaultMapLocation);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApi.apiKey,
    libraries,
  });

  useEffect(() => {
    const loadPetsList = async () => {
      const data = await backend.getPetsList();
      setPetsList(data);
    };
    loadPetsList();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMapLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const updateVisiblePets = useCallback(
    (filteredList) => setVisiblePets(filteredList),
    []
  );
  const updateMapLocation = useCallback(async (addressCoords) => {
    setMapLocation(addressCoords);
  }, []);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <>
      <h1>PetMapPage</h1>
      <LocationInput
        updateMapLocation={updateMapLocation}
        isLoaded={isLoaded}
      />
      <MapWithMarkers
        pets={petsList}
        updateVisiblePets={updateVisiblePets}
        mapLocation={mapLocation}
        isLoaded={isLoaded}
      />
      {visiblePets.length === 0 && <p>No pets missing in this area.</p>}
      <ul>
        {visiblePets.map((pet) => (
          <li key={pet.id}>
            <h2>{pet.pet_name}</h2>
            <p>{pet.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PetMapPage;
