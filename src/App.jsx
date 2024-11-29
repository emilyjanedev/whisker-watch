import "./styles/globals.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PetMapPage from "./pages/PetMapPage/PetMapPage.jsx";
import PetDetailsPage from "./pages/PetDetailsPage/PetDetailsPage";
import AddPetPage from "./pages/AddPetPage/AddPetPage";
import NavBar from "./components/NavBar/NavBar.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import SignUpUpdatePage from "./pages/SignUpUpdatePage/SignUpUpdatePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<PetMapPage />} />
          <Route path="/pets/:id" element={<PetDetailsPage />} />
          <Route path="/pets/add" element={<AddPetPage />} />
          <Route path="/login" element={<LoginPage action="login" />} />
          <Route
            path="/signup"
            element={<SignUpUpdatePage action="signup" />}
          />
          <Route
            path="/user/update-profile"
            element={
              <PrivateRoute>
                <SignUpUpdatePage action="update" />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
