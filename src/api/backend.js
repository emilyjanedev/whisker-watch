import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const getPetsList = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/pets`);
    return data;
  } catch (error) {
    console.error("Could not get pets list:", error);
    throw new Error("Error getting pets list.");
  }
};

const getPetById = async (petId) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/pets/${petId}`);
    return data;
  } catch (error) {
    console.error("Could not get pet data:", error);
    throw new Error("Error getting pet data.");
  }
};

const getPetSightings = async (petId) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/pets/${petId}/sightings`);
    return data;
  } catch (error) {
    console.error("Could not get pet sightings:", error);
    throw new Error("Error getting pet sightings.");
  }
};

const addPet = async (newPet) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/pets`, newPet);
    return data;
  } catch (error) {
    console.error("Could not add pet:", error);
    throw new Error("Error adding pet.");
  }
};

export { getPetsList, getPetById, getPetSightings, addPet };
