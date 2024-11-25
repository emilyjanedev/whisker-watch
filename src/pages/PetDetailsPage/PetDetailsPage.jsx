import "./PetDetailsPage.scss";
import { useParams } from "react-router-dom";
import * as backend from "../../api/backend.js";
import { useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import { format } from "date-fns";
import PetMap from "../../components/PetMap/PetMap.jsx";

function PetDetailsPage() {
  const { id } = useParams();
  const [petData, setPetData] = useState({});

  useEffect(() => {
    const loadPetData = async () => {
      setPetData(await backend.getPetById(id));
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
            className={`pet-details-page__status`}
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
        sx={{mb: 1}}
      >
        Age: {petData.pet_age} | Size: {petData.pet_size} | {petData.pet_temperament}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        className="pet-details-page__description"
      >
        {petData.description}
      </Typography>
      <div className="pet-details-page__map-container">
        {/* Sighting Map */}
      </div>
      <div className="pet-details page__sighting-form">
        {/* Sighting Form */}
      </div>
      <div className="pet-details-page__sighting-list">
        {/* Sighting Cards */}
      </div>
    </div>
  );
}

export default PetDetailsPage;
