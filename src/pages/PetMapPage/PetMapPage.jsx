import { useState, useEffect, useCallback } from "react";
import * as backend from "../../api/backend.js";
import PetMap from "../../components/PetMap/PetMap.jsx";
import LocationInput from "../../components/LocationInput/LocationInput.jsx";
import { Skeleton } from "@mui/material";
import PetCard from "../../components/PetCard/PetCard.jsx";
import "./PetMapPage.scss";

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
    <div className="pet-map-page">
      <div className="pet-map-page__layout-container">
        {mapLocation.lat ? (
          <div className="pet-map-page__map">
            <PetMap
              petsList={petsList}
              mapLocation={mapLocation}
              updateVisiblePets={updateVisiblePets}
            />
          </div>
        ) : (
          <div className="pet-map-page__skeleton">
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "100%" }}
              animation={"wave"}
            />
          </div>
        )}
        <div className="pet-map-page__map-results">
          <div className="pet-map-page__location-input">
            <LocationInput callbackFn={updateMapLocation} />
          </div>
          {visiblePets.length === 0 ? (
            <p className="pet-map-page__no-pets-message">
              No pets missing in this area.
            </p>
          ) : (
            <ul className="pet-map-page__pet-list">
              {visiblePets.map((pet) => (
                <li className="pet-map-page__pet-list-item" key={pet.id}>
                  <PetCard pet={pet} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PetMapPage;
