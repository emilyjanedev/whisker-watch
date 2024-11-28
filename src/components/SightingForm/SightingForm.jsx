import "./SightingForm.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import LocationInput from "../LocationInput/LocationInput";
import { validateForm } from "../../utils/validateForm.js";
import StyledButton from "../StyledButton/StyledButton.jsx";
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
    sighted_at: null,
  });

  const handleLocationInput = useCallback(
    (position, city) => {
      setFormData({
        ...formData,
        lat: position.lat,
        lng: position.lng,
        city: city,
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
      setFormData({
        pet_id: petId,
        note: "",
        lat: "",
        lng: "",
        city: "",
        sighted_at: null,
      });
    }
  };

  return (
    <form action="submit" className="add-sighting-form" onSubmit={handleSubmit}>
      <div className="add-sighting-form__input-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date"
            name="sighted_at"
            value={formData.sighted_at}
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
            name="sighted_at"
            errors={errors.lat}
          />
        </div>
      </div>

      <TextField
        label="Note"
        placeholder="Include important information."
        fullWidth
        name="note"
        value={formData.note}
        onChange={handleChange}
        error={errors.note ? true : false}
        helperText={errors.note || " "}
      />
      <StyledButton
        fullWidth
        size="large"
        className="add-sighting-form__button"
        type="submit"
        disableElevation
        variant="contained"
      >
        Submit
      </StyledButton>
    </form>
  );
}

export default SightingForm;

SightingForm.propTypes = {
  petId: PropTypes.string.isRequired,
  handleNewSighting: PropTypes.func.isRequired,
};
