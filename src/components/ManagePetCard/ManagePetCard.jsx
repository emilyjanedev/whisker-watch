import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import StyledButton from "../StyledButton/StyledButton";
import placeholder from "../../assets/images/pet-image-placeholder.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ManagePetCard.scss";
import { Link } from "react-router-dom";

function ManagePetCard({ pet, handleDelete }) {
  return (
    <Box className="manage-pet-card">
      <Box className="manage-pet-card__details">
        <img
          className="manage-pet-card__image"
          alt={`${pet.pet_name}'s picture`}
          src={pet.pet_image || placeholder}
        />
        <Box className="manage-pet-card__info">
          <Typography
            className="manage-pet-card__name"
            variant="h5"
            component="h3"
            sx={{ fontWeight: "medium" }}
          >
            {pet.pet_name}
          </Typography>
          <IconButton
            className="manage-pet-card__delete-button"
            onClick={() => {
              handleDelete(pet.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box className="manage-pet-card__button-container">
          <StyledButton
            className="manage-pet-card__details-link"
            variant="outlined"
            color="secondary"
            size="small"
            component={Link}
            to={`/pets/${pet.id}/update`}
            disableElevation
          >
            Edit
          </StyledButton>
          <StyledButton
            className="manage-pet-card__details-link"
            variant="contained"
            size="small"
            component={Link}
            to={`/pets/${pet.id}`}
            disableElevation
          >
            Details
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
}

ManagePetCard.displayName = "PetCard";

export default ManagePetCard;

ManagePetCard.propTypes = {
  pet: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
