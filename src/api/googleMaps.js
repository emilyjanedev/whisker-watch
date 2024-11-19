import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_KEY;
const googleMapsBaseUrl = import.meta.env.VITE_GOOGLE_MAPS_BASE_URL;

const geocodeAddress = async (address) => {
  try {
    const { data } = await axios.get(`${googleMapsBaseUrl}/geocode/json`, {
      params: {
        address,
        key: apiKey,
      },
    });

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Could not get geocode, no results found.");
    }
  } catch (error) {
    throw new Error("Geocoding failed:", error);
  }
};

export { apiKey, mapId, geocodeAddress };
