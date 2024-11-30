import { useEffect, useState } from "react";
import { Alert, Container, Typography, Box, List } from "@mui/material";
import * as backend from "../../api/backend.js";
import StyledButton from "../../components/StyledButton/StyledButton";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ManagePetCard from "../../components/ManagePetCard/ManagePetCard.jsx";
import "./UserProfilePage.scss";
import SightingCard from "../../components/SightingCard/SightingCard.jsx";

function UserProfilePage() {
  const [error, setError] = useState();
  const [userPetList, setUserPetList] = useState([]);
  const [userSightingList, setUserSightingList] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = async () => {
      const petList = await backend.getPetsList(currentUser.uid);
      setUserPetList(petList);

      const sightingList = await backend.getUserSightings(currentUser.uid);
      setUserSightingList(sightingList);
    };
    loadUserInfo();
  }, [currentUser.uid]);

  const handleDelete = async (petId) => {
    await backend.deletePet(petId);
    const updatedPetList = await backend.getPetsList(currentUser.uid);
    setUserPetList(updatedPetList);
  };

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

  const userSignInProvider = currentUser.providerData[0].providerId;

  return (
    <Container className="user-profile">
      <Box className="user-profile__sidebar">
        <Typography
          className="user-profile__greeting"
          variant="h4"
          component="h1"
        >
          Hello, {currentUser.displayName}!
        </Typography>
        {error && <Alert className="user-profile__error">{error}</Alert>}
        <Typography
          className="user-profile__email"
          variant="body1"
          color="secondary"
        >
          {currentUser.email}
        </Typography>
        <Box className="user-profile__actions">
          <StyledButton
            className="user-profile__action user-profile__action--update"
            component={Link}
            to="/user/update-profile"
            variant="outlined"
            color="secondary"
            disableElevation
            disabled={userSignInProvider !== "password"}
            sx={{ bgcolor: "white" }}
          >
            Update Profile
          </StyledButton>
          <StyledButton
            className="user-profile__action user-profile__action--logout"
            variant="contained"
            disableElevation
            onClick={handleLogout}
          >
            Logout
          </StyledButton>
        </Box>
      </Box>

      <Box className="user-profile__content">
        <Typography
          className="user-profile__title"
          variant="h6"
          component="h3"
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Manage Your Pets
        </Typography>
        <List className="user-profile__pet-list">
          {userPetList.length > 0 ? (
            userPetList.map((pet) => (
              <ManagePetCard
                key={pet.id}
                pet={pet}
                handleDelete={handleDelete}
                className="user-profile__pet-card"
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              You haven&apos;t posted any pets yet.
            </Typography>
          )}
        </List>
        <Box>
          <Typography
            className="user-profile__title"
            variant="h6"
            component="h3"
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            Your Reported Sightings
          </Typography>
          <List className="user-profile__sighting-list">
            {userSightingList.length > 0 ? (
              userSightingList.map((sighting) => (
                <SightingCard
                  key={sighting.id}
                  sightingData={sighting}
                  className="user-profile__sighting-card"
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You haven&apos;t reported any pet sightings yet.
              </Typography>
            )}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default UserProfilePage;
