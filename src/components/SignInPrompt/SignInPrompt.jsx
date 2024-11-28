import { Link } from "react-router-dom";
import StyledButton from "../../components/StyledButton/StyledButton.jsx";
import PropTypes from "prop-types";

function SignInPrompt({ action }) {
  return (
    <>
      <p>
        {action === "sighting"
          ? "Please sign in to post a sighting."
          : "Please sign in to report a lost pet."}
      </p>
      <StyledButton
        variant="contained"
        disableElevation
        component={Link}
        to="/login"
      >
        Sign In
      </StyledButton>
    </>
  );
}

export default SignInPrompt;

SignInPrompt.propTypes = {
  action: PropTypes.string.isRequired,
};
