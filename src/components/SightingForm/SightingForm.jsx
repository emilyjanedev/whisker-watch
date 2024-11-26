import "./SightingForm.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState, useCallback } from "react";
import { TextField, Button } from "@mui/material";
import LocationInput from "../LocationInput/LocationInput";
import { validateForm } from "../../utils/validateForm.js";
import { getCityFromAddress } from "../../utils/getCityFromAddress.js";
import * as backend from "../../api/backend.js";
import PropTypes from "prop-types";

function SightingForm({ petId, handleNewSighting }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    pet_id: petId,
    note: "",
    lat: "",
    lng: "",
    city: "",
    sighted_at: "",
  });

  const handleLocationInput = useCallback(
    (locationInput, address) => {
      setFormData({
        ...formData,
        lat: locationInput.lat,
        lng: locationInput.lng,
        city: getCityFromAddress(address),
      });
    },
    [formData]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { lat, lng } = await backend.addPetSighting(formData, petId);
      handleNewSighting(await backend.getPetSightings(petId), { lat, lng });
    }
  };

  return (
    <form action="submit" className="add-sighting-form" onSubmit={handleSubmit}>
      <div className="add-sighting-form__input-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date"
            name="sighted_at"
            onChange={(newValue) =>
              setFormData((prevData) => ({
                ...prevData,
                sighted_at: newValue,
              }))
            }
            sx={{ width: " 48%" }}
            error={errors.sighted_at ? true : false}
            helperText={errors.sighted_at || " "}
          />
        </LocalizationProvider>

        <div className="add-sighting-form__location-input-container">
          <LocationInput
            callbackFn={handleLocationInput}
            className="add-sighting-form__location-input"
            name="sighted_location"
            errors={errors.lat}
          />
        </div>
      </div>

      <TextField
        label="Note"
        placeholder="Include any important information."
        fullWidth
        name="note"
        value={formData.note}
        onChange={handleChange}
        error={errors.note ? true : false}
        helperText={errors.note || " "}
      />
      <Button
        fullWidth
        size="large"
        className="add-sighting-form__button"
        type="submit"
        disableElevation
        variant="contained"
        sx={{ borderRadius: "20px", textTransform: "capitalize" }}
      >
        Submit
      </Button>
    </form>
  );
}

export default SightingForm;

SightingForm.propTypes = {
  petId: PropTypes.string.isRequired,
  handleNewSighting: PropTypes.func.isRequired,
};
