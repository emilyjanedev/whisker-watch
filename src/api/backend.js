import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const getPetsList = async (userId = "") => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/pets?${userId && "user_id="}${userId}`
    );
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

const updatePet = async (petId, updatedPet) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/pets/${petId}`,
      updatedPet
    );
    return data;
  } catch (error) {
    console.error("Could not update pet:", error);
    throw new Error("Error updating pet.");
  }
};

const deletePet = async (petId) => {
  try {
    await axios.delete(`${baseUrl}/api/pets/${petId}`);
    return;
  } catch (error) {
    console.error("Could not delete pet:", error);
    throw new Error("Error deleting pet.");
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

const addPetSighting = async (newSighting, petId) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/pets/${petId}/sightings`,
      newSighting
    );
    return data;
  } catch (error) {
    console.error("Could not add pet sighting:", error);
    throw new Error("Error adding pet sighting.");
  }
};

const addUser = async (newUser) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/users`, newUser);
    return data;
  } catch (error) {
    console.error("Could not add user:", error);
    throw new Error("Error adding user.");
  }
};

export {
  getPetsList,
  getPetById,
  getPetSightings,
  addPet,
  addPetSighting,
  deletePet,
  addUser,
  updatePet,
};
