import { useState, useEffect } from "react";
import * as backend from "../api/backend.js";

function PetMapPage() {
  const [petsList, setPetsList] = useState([]);

  useEffect(() => {
    const loadPetsList = async () => {
      const data = await backend.getPetsList();
      setPetsList(data);
    };
    loadPetsList();
  }, []);

  return (
    <>
      <h1>PetMapPage</h1>
      <ul>
        {petsList.map((pet) => (
          <li key={pet.id}>
            <h2>{pet.pet_name}</h2>
            <p>{pet.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PetMapPage;
