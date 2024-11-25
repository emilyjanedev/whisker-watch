import "./PetDetailsPage.scss";
import { useParams } from "react-router-dom";
import * as backend from "../../api/backend.js";
import { useCallback, useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import { format } from "date-fns";
import MapWithMarkers from "../../components/MapWithMarkers/MapWithMarkers.jsx";
import SightingForm from "../../components/SightingForm/SIghtingForm.jsx";

function PetDetailsPage() {
  const { id } = useParams();
  const [petData, setPetData] = useState({});
  const [petSightings, setPetSightings] = useState([]);
  const [visibleSightings, setVisibleSightings] = useState([]);
  const [mapLocation, setMapLocation] = useState({});

  const updateVisibleSightings = useCallback((filteredList) =>
    setVisibleSightings(filteredList)
  );

  const handleNewSighting = useCallback((updatedList, sightingLocation) => {
    setPetSightings(updatedList);
    setMapLocation(sightingLocation);
  });

  useEffect(() => {
    const loadPetData = async () => {
      const data = await backend.getPetById(id);
      setPetData(data);
      setMapLocation({ lat: data.lat, lng: data.lng });
      setPetSightings(await backend.getPetSightings(id));
    };
    loadPetData();
  }, [id]);

  return (
    <div className="pet-details-page">
      <div className="pet-details-page__image-container">
        <img
          src={petData.pet_image}
          alt={`${petData.pet_name}'s picture`}
          className="pet-details-page__image"
        />
      </div>
      <div className="pet-details-page__header-container">
        <Typography
          variant="h4"
          component="h1"
          className="pet-details-page__title"
          sx={{ fontWeight: "medium" }}
        >
          {petData.pet_name}
        </Typography>
        <div className="pet-details-page__status-container">
          <Chip
            className={`pet-details-page__status ${
              petData.status === "lost"
                ? "pet-details-page__status--missing"
                : "pet-details-page__status--found"
            }`}
            variant="outlined"
            size="small"
            label={petData.status === "lost" ? "Missing" : "Found"}
            color={petData.status === "lost" ? "error" : "success"}
          />
          <Typography
            variant="caption"
            component="p"
            className="pet-details-page__missing-since"
          >
            Since{" "}
            {petData.missing_since && format(petData.missing_since, "MMM do")}
          </Typography>
        </div>
      </div>
      <Typography
        variant="body2"
        component="p"
        className="pet-details-page__pet-attributes"
        sx={{ mb: 1 }}
      >
        Age: {petData.pet_age} | Size: {petData.pet_size} |{" "}
        {petData.pet_temperament}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        className="pet-details-page__description"
      >
        {petData.description}
      </Typography>
      <Typography variant="h6" component="h3">
        Sightings of {petData.pet_name}:
      </Typography>
      <div className="pet-details-page__map-container">
        {/* Sighting Map */}
        {mapLocation.lat && (
          <MapWithMarkers
            markersList={petSightings}
            mapLocation={mapLocation}
            updateVisibleMarkers={updateVisibleSightings}
            centralMarker={{ lat: petData.lat, lng: petData.lng }}
          />
        )}
      </div>
      <div className="pet-details-page__sighting-form">
        <Typography variant="body1" component="h3">
          Have you seen {petData.pet_name}?
        </Typography>
        {/* Sighting Form */}
        <SightingForm petId={id} handleNewSighting={handleNewSighting} />
      </div>
      <div className="pet-details-page__sighting-list">
        <ul>
          {/* Sighting Cards */}
          {visibleSightings.length > 0 &&
            visibleSightings.map((sighting) => (
              <li key={sighting.id} className="pet-details-page__sighting-item">
                <Typography variant="body2" component="p">
                  {sighting.note} on{" "}
                  {sighting.sighted_at && format(sighting.sighted_at, "MMM do")}
                </Typography>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default PetDetailsPage;
