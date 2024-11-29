import "./AddPetPage.scss";
import { Typography } from "@mui/material";
import SignInPrompt from "../../components/SignInPrompt/SignInPrompt.jsx";
import AddPetForm from "../../components/AddPetForm/AddPetForm.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import PropTypes from "prop-types";

function AddPetPage({ action }) {
  const { currentUser } = useAuth();

  return (
    <div className="add-pet-page">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          textAlign: { xs: "center", sm: "left" },
          fontWeight: "medium",
          marginBottom: { xs: "1rem", sm: "2rem" },
        }}
      >
        Let&apos;s Find your Lost Pet...
      </Typography>
      {currentUser ? (
        <AddPetForm action={action} />
      ) : (
        <SignInPrompt action="add" />
      )}
    </div>
  );
}

export default AddPetPage;

AddPetPage.propTypes = {
  action: PropTypes.string.isRequired,
};
