import Backdrop from "@mui/material/Backdrop";
import "./Popup.scss";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import StyledButton from "../StyledButton/StyledButton";
import { Link } from "react-router-dom";

function Popup({ isOpen, handleClose, title, description, petId }) {
  return (
    <div>
      <Modal
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <div className="popup">
            <Typography className="popup-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography className="popup-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
            <div className="popup__button-container">
              <StyledButton
                component={Link}
                to={"/"}
                disableElevation
                variant="outlined"
                color="secondary"
                className="popup-button"
              >
                Pet Map
              </StyledButton>
              <StyledButton
                component={Link}
                to={`/pets/${petId}`}
                disableElevation
                variant="contained"
                className="popup-button"
              >
                Pet Profile
              </StyledButton>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Popup;

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  petId: PropTypes.number.isRequired,
};
