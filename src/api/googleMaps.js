import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
const googleMapsBaseUrl = import.meta.env.VITE_GOOGLE_MAPS_BASE_URL;

const geocodeAddress = async (address) => {
  const addressString = address.replaceAll(" ", "+");

  try {
    const { data } = await axios.get(
      `${googleMapsBaseUrl}/geocode/json?address=${addressString}&key=${apiKey}`
    );

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      const addressComponents = data.results[0].address_components;
      const locality = addressComponents.find((component) =>
        component.types.includes("locality")
      );
      let city = "";
      if (locality) {
        city = locality.short_name;
      } else {
        city = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_3")
        ).short_name;
      }

      return { position: { lat, lng }, city: city };
    } else {
      console.error("Could not get geocode, no results found.");
    }
  } catch (error) {
    throw new Error("Geocoding failed:", error);
  }
};

export { apiKey, mapId, geocodeAddress };
