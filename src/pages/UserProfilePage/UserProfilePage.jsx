import { useState } from "react";
import { Alert, Typography } from "@mui/material";
import { StyledButton } from "../../components/StyledButton/StyledButton";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function UserProfilePage() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to logout.");
    }
  };

  return (
    <>
      <div>User Profile</div>
      <Typography sx={{ fontWeight: "medium" }}>{currentUser.email}</Typography>
      {error && <Alert>{error}</Alert>}
      <StyledButton
        component={Link}
        to="/users/profile/update"
        variant="outlined"
        color="secondary"
        disableElevation
        onClick={handleLogout}
      >
        Update Profile
      </StyledButton>
      <StyledButton variant="contained" disableElevation onClick={handleLogout}>
        Logout
      </StyledButton>
    </>
  );
}

export default UserProfilePage;
