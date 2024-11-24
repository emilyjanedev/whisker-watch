import "./PetDetailsPage.scss";
import { useParams } from "react-router-dom";
import * as backend from "../../api/backend.js";
import { useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import { format } from "date-fns";

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
            label={petData.status === "lost" ? "Missing" : "Found"}
            color={petData.status === "lost" ? "error" : "success"}
          />
          <Typography
            variant="body2"
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
      >
        Age: {petData.pet_age} | Size: {petData.pet_size} | Temperament:{" "}
        {petData.pet_temperament}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        className="pet-details-page__description"
      >
        {petData.description}
      </Typography>
    </div>
  );
}

export default PetDetailsPage;
