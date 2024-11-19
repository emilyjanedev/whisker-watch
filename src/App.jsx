import { BrowserRouter, Route, Routes } from "react-router-dom";
import PetMapPage from "./pages/PetMapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PetMapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
