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

export { getPetsList };
