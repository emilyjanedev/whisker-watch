import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Autocomplete, TextField } from "@mui/material";
import * as googleMapsApi from "../../api/googleMaps.js";

function LocationInput({
  callbackFn,
  name = "",
  errors,
  initialValue = "",
  resetInput = null,
}) {
  const inputRef = useRef(null);
  const placesLib = useMapsLibrary("places");
  const [address, setAddress] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!initialValue) {
      return;
    }
    setAddress(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (resetInput) {
      setAddress("");
    }
  }, [resetInput]);

  const fetchAddressPredictions = useCallback(
    (inputValue) => {
      if (!placesLib) return;

      const autocompleteService =
        new window.google.maps.places.AutocompleteService();

      autocompleteService.getQueryPredictions(
        {
          input: inputValue,
          componentRestrictions: { country: "CA" },
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

  const handleChange = async (_e, value) => {
    if (value) {
      setAddress(value);
      const result = await googleMapsApi.geocodeAddress(value);
      callbackFn(result.position, result.city, value);
    }
  };

  return (
    <Autocomplete
      freeSolo
      inputValue={address}
      onInputChange={handleInputChange}
      onChange={handleChange}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          ref={inputRef}
          name={name}
          error={errors ? true : false}
          helperText={errors || " "}
          color="secondary"
          sx={{ backgroundColor: "white", zIndex: "1" }}
        />
      )}
    />
  );
}

export default LocationInput;

LocationInput.propTypes = {
  callbackFn: PropTypes.func.isRequired,
  name: PropTypes.string,
  errors: PropTypes.string,
  initialValue: PropTypes.string,
  resetInput: PropTypes.bool,
};
