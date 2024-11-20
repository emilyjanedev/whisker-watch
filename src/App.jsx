import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";
import * as googleMapsApi from "./api/googleMaps.js";
import PetMapPage from "./pages/PetMapPage/PetMapPage.jsx";
import PetDetailsPage from "./pages/PetDetailsPage/PetDetailsPage";
import AddPetPage from "./pages/AddPetPage/AddPetPage";

function App() {
  return (
    <APIProvider
      apiKey={googleMapsApi.apiKey}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PetMapPage />} />
          <Route path="/pets/:id" element={<PetDetailsPage />} />
          <Route path="/pets/add" element={<AddPetPage />} />
        </Routes>
      </BrowserRouter>
    </APIProvider>
  );
}

export default App;
