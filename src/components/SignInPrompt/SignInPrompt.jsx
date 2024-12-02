import { Link } from "react-router-dom";
import StyledButton from "../../components/StyledButton/StyledButton.jsx";
import PropTypes from "prop-types";
import { Container, Typography } from "@mui/material";
import "./SignInPrompt.scss";

function SignInPrompt({ action }) {
  return (
    <Container maxWidth="xs" className="sign-in-prompt">
      <Typography className="sign-in-prompt__message" variant="body1">
        {action === "sighting"
          ? "Please sign in to report a sighting."
          : "Please sign in to report a lost pet."}
      </Typography>

      <StyledButton
        className="sign-in-prompt__button"
        variant="contained"
        disableElevation
        component={Link}
        to="/login"
      >
        Sign In
      </StyledButton>
    </Container>
  );
}

export default SignInPrompt;

SignInPrompt.propTypes = {
  action: PropTypes.string.isRequired,
};
