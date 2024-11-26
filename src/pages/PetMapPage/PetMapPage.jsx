import { useState, useEffect, useCallback } from "react";
import * as backend from "../../api/backend.js";
import MapWithMarkers from "../../components/MapWithMarkers/MapWithMarkers.jsx";
import LocationInput from "../../components/LocationInput/LocationInput.jsx";
import { Skeleton } from "@mui/material";
import { defaultMapLocation } from "../../constants/mapConstants.js";
import PetCard from "../../components/PetCard/PetCard.jsx";
import "./PetMapPage.scss";

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
        <div className="pet-map-page__map">
          {mapLocation.lat ? (
            <MapWithMarkers
              markersList={petsList}
              mapLocation={mapLocation}
              updateVisibleMarkers={updateVisiblePets}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "100%" }}
              animation={"wave"}
            />
          )}
        </div>

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
