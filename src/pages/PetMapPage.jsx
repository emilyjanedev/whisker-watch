import { useState, useEffect } from "react";
import MapWithMarkers from "../components/Map/MapWithMarkers.jsx";
import * as backend from "../api/backend.js";

const defaultMapLocation = { lat: 49.2827, lng: -123.1207 };

function PetMapPage() {
  const [petsList, setPetsList] = useState([]);
  const [visiblePets, setVisiblePets] = useState([]);
  const [mapLocation, setMapLocation] = useState(defaultMapLocation);

  useEffect(() => {
    const loadPetsList = async () => {
      const data = await backend.getPetsList();
      setPetsList(data);
    };
    loadPetsList();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setIsGeolocationAvailable(false);
        }
      );
    } else {
      setIsGeolocationAvailable(false);
    }
  }, []);

  const updateVisiblePets = (filteredList) => setVisiblePets(filteredList);

  return (
    <>
      <h1>PetMapPage</h1>
      <MapWithMarkers
        pets={petsList}
        updateVisiblePets={updateVisiblePets}
        mapLocation={mapLocation}
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
