import { useState, useEffect, useCallback } from "react";
import * as backend from "../../api/backend.js";
import PetMap from "../../components/PetMap/PetMap.jsx";
import LocationInput from "../../components/LocationInput/LocationInput.jsx";

const defaultMapLocation = { lat: 49.2827, lng: -123.1207 };

function PetMapPage() {
  const [petsList, setPetsList] = useState([]);
  const [visiblePets, setVisiblePets] = useState([]);
  const [mapLocation, setMapLocation] = useState({});

  useEffect(() => {
    const loadPetsList = async () => {
      const data = await backend.getPetsList();
      setPetsList(data);
    };
    loadPetsList();
  }, []);

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setMapLocation({ lat: latitude, lng: longitude });
    };

    const errorCallback = (error) => {
      console.error("Geolocation error:", error.message);
      setMapLocation(defaultMapLocation);
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }, []);

  const updateVisiblePets = useCallback(
    (filteredList) => setVisiblePets(filteredList),
    []
  );

  const updateMapLocation = useCallback(async (coords) => {
    setMapLocation(coords);
  }, []);

  return (
    <>
      <h1>PetMapPage</h1>
      <LocationInput callbackFn={updateMapLocation} />
      {mapLocation.lat && (
        <PetMap
          petsList={petsList}
          mapLocation={mapLocation}
          updateVisiblePets={updateVisiblePets}
        />
      )}
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
