import "./PetDetailsPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import * as backend from "../../api/backend.js";
import { useCallback, useEffect, useState } from "react";
import { Chip, List, Skeleton, Typography } from "@mui/material";
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext.jsx";
import MapWithMarkers from "../../components/MapWithMarkers/MapWithMarkers.jsx";
import SightingForm from "../../components/SightingForm/SightingForm.jsx";
import SightingCard from "../../components/SightingCard/SightingCard.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SignInPrompt from "../../components/SignInPrompt/SignInPrompt.jsx";

function PetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petData, setPetData] = useState({});
  const [petSightings, setPetSightings] = useState([]);
  const [mapLocation, setMapLocation] = useState({});
  const { currentUser } = useAuth();

  const handleNewSighting = useCallback((updatedList, sightingLocation) => {
    setPetSightings(updatedList);
    setMapLocation(sightingLocation);
  }, []);

  const handleSightingCardClick = useCallback((sightingLocation) => {
    setMapLocation(sightingLocation);
  }, []);

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
      <Typography
        variant="h4"
        component="h1"
        className="pet-details-page__title"
        sx={{ fontWeight: "medium", mb: { xs: 1, sm: 1.5 } }}
      >
        <ArrowBackIcon
          className="pet-details-page__title-icon"
          color="secondary"
          sx={{ mr: 1 }}
          onClick={() => navigate(-1)}
        />
        Pet Details
      </Typography>
      <div className="pet-details-page__layout">
        <div className="pet-details-page__details-and-form">
          <div className="pet-details-page__details">
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
                component="h2"
                className="pet-details-page__pet-name"
                sx={{ fontWeight: "medium" }}
              >
                {petData.pet_name}
              </Typography>
              <div className="pet-details-page__status-container">
                <Chip
                  className={"pet-details-page__status"}
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
                  {petData.missing_since &&
                    format(petData.missing_since, "MMM do")}
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
              variant="body2"
              component="p"
              color="secondary"
              className="pet-details-page__pet-city"
              sx={{ mb: 1, fontWeight: "medium" }}
            >
              {petData.city}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="pet-details-page__description"
              sx={{ mb: "0.5rem" }}
            >
              {petData.description}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="secondary"
              sx={{ mb: 2.5, fontWeight: "medium" }}
            >
              Contact: {petData.contact_name} - {petData.contact_email}
            </Typography>
          </div>
          <div className="pet-details-page__sighting-form">
            <Typography
              variant="h7"
              component="h3"
              sx={{ fontWeight: "medium" }}
            >
              Have you seen {petData.pet_name}?
            </Typography>
            {currentUser ? (
              <SightingForm petId={id} handleNewSighting={handleNewSighting} />
            ) : (
              <SignInPrompt action="sighting" />
            )}
          </div>
        </div>
        <div className="pet-details-page__map-and-results">
          <Typography
            variant="h6"
            component="h3"
            sx={{ m: { xs: "1rem 0", sm: "0.5rem 0 0.25rem" } }}
            className="pet-details-page__sightings-title"
          >
            Sightings of {petData.pet_name}
          </Typography>
          <div className="pet-details-page__map-container">
            {mapLocation.lat ? (
              <MapWithMarkers
                markersList={petSightings}
                markerChoice="sighting"
                mapLocation={mapLocation}
                centralMarker={petData}
              />
            ) : (
              <Skeleton variant="rectangle" sx={{ height: "18.75rem" }} />
            )}
          </div>
          <List
            className="pet-details-page__sightings-list"
            sx={{ padding: "0.5rem" }}
          >
            {petSightings.length > 0 ? (
              petSightings.map((sighting) => (
                <SightingCard
                  sightingData={sighting}
                  handleClick={handleSightingCardClick}
                  key={sighting.id}
                />
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No sightings of {petData.pet_name} yet.
              </Typography>
            )}
          </List>
        </div>
      </div>
    </div>
  );
}

export default PetDetailsPage;
