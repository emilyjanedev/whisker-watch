import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Autocomplete, TextField } from "@mui/material";
import * as googleMapsApi from "../../api/googleMaps.js";

function LocationInput({ callbackFn, name = "" }) {
  const inputRef = useRef(null);
  const placesLib = useMapsLibrary("places");
  const [address, setAddress] = useState("");
  const [options, setOptions] = useState([]);

  // Function to fetch predictions based on the input value
  const fetchAddressPredictions = useCallback(
    (inputValue) => {
      if (!placesLib) return;

      const autocompleteService =
        new window.google.maps.places.AutocompleteService();

      autocompleteService.getQueryPredictions(
        {
          input: inputValue,
          componentRestrictions: { country: "CA" }, // restrict to Canada (you can adjust this)
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setOptions(predictions.map((prediction) => prediction.description));
          } else {
            setOptions([]);
          }
        }
      );
    },
    [placesLib]
  );

  const handleInputChange = (e, newInputValue) => {
    setAddress(newInputValue);
    fetchAddressPredictions(newInputValue);
  };

  const handleChange = async (e, value) => {
    if (value) {
      setAddress(value);
      const coords = await googleMapsApi.geocodeAddress(value);
      callbackFn(coords);
    }
  };

  return (
    <Autocomplete
      freeSolo
      inputValue={address}
      onInputChange={handleInputChange}
      onChange={handleChange}
      options={options} // Set suggestions from getQueryPredictions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          ref={inputRef}
          name={name}
          // onFocus={handleFocus}
        />
      )}
    />
  );
}

export default LocationInput;

LocationInput.propTypes = {
  callbackFn: PropTypes.func.isRequired,
  name: PropTypes.string,
};
