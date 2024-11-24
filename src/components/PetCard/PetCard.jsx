import PropTypes from "prop-types";
import { Chip, Box, Typography, Paper, Button } from "@mui/material";
import placeholder from "../../assets/images/pet-image-placeholder.jpg";
import { format } from "date-fns";
import "./PetCard.scss";
import { Link } from "react-router-dom";

function PetCard({ pet }) {
  return (
    <Paper elevation={2} className="pet-card" sx={{ borderRadius: "20px" }}>
      <Box className="pet-card__details">
        <img
          className="pet-card__image"
          alt={`${pet.pet_name}'s picture`}
          src={pet.pet_image || placeholder}
        />
        <Box className="pet-card__info">
          <Typography className="pet-card__name" variant="h6" component="h3">
            {pet.pet_name}
          </Typography>
          <Typography
            className="pet-card__attributes"
            variant="body2"
            component="p"
          >
            Age: {pet.pet_age} Size: {pet.pet_size}
          </Typography>
          <Typography
            className="pet-card__temperament"
            variant="body2"
            component="p"
          >
            {pet.pet_temperament} {pet.pet_type}
          </Typography>
          <Typography
            className="pet-card__location"
            variant="body2"
            component="p"
            color="text.secondary"
          >
            Test Location
          </Typography>
        </Box>
      </Box>
      <Box className="pet-card__status-container">
        <Chip
          className={`pet-card__status`}
          variant="outlined"
          size="small"
          label={pet.status === "lost" ? "Missing" : "Found"}
          color={pet.status === "lost" ? "error" : "success"}
        />
        <Typography
          className="pet-card__missing-date"
          variant="body2"
          component="p"
        >
          Since {pet.missing__since && format(pet.missing_since, "MMM do")}
        </Typography>
        <Button
          className="pet-card__details-link"
          variant="contained"
          component={Link}
          to={`/pets/${pet.id}`}
          disableElevation
          size="small"
        >
          See Details
        </Button>
      </Box>
    </Paper>
  );
}

export default PetCard;

PetCard.propTypes = {
  pet: PropTypes.object.isRequired,
};
