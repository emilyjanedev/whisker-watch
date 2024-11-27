import { BrowserRouter, Route, Routes } from "react-router-dom";
import PetMapPage from "./pages/PetMapPage/PetMapPage.jsx";
import PetDetailsPage from "./pages/PetDetailsPage/PetDetailsPage";
import AddPetPage from "./pages/AddPetPage/AddPetPage";
import NavBar from "./components/NavBar/NavBar.jsx";
import "./styles/globals.scss";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<PetMapPage />} />
        <Route path="/pets/:id" element={<PetDetailsPage />} />
        <Route path="/pets/add" element={<AddPetPage />} />
        <Route path="/login" element={<LoginPage action="login" />} />
        <Route path="/sign-up" element={<LoginPage action="signup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
