import { Link } from "react-router-dom";
import StyledButton from "../../components/StyledButton/StyledButton.jsx";
import PropTypes from "prop-types";
import { Container, Typography } from "@mui/material";

function SignInPrompt({ action }) {
  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        p: 4,
        mt: 1.5,
        borderRadius: "20px",
        bgcolor: "#f7f7f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="body1">
        {action === "sighting"
          ? "Please sign in to report a sighting."
          : "Please sign in to report a lost pet."}
      </Typography>

      <StyledButton
        variant="contained"
        disableElevation
        component={Link}
        to="/login"
        sx={{ width: "50%" }}
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
