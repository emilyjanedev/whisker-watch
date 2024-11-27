import { BrowserRouter, Route, Routes } from "react-router-dom";
import PetMapPage from "./pages/PetMapPage/PetMapPage.jsx";
import PetDetailsPage from "./pages/PetDetailsPage/PetDetailsPage";
import AddPetPage from "./pages/AddPetPage/AddPetPage";
import NavBar from "./components/NavBar/NavBar.jsx";
import "./styles/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<PetMapPage />} />
        <Route path="/pets/:id" element={<PetDetailsPage />} />
        <Route path="/pets/add" element={<AddPetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
