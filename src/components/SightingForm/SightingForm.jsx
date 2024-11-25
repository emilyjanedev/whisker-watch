import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState, useCallback } from "react";
import { TextField, Button } from "@mui/material";
import LocationInput from "../LocationInput/LocationInput";
import { validateForm } from "../../utils/validateForm.js";
import * as backend from "../../api/backend.js";

function SightingForm({ petId, handleNewSighting }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    pet_id: petId,
    note: "",
    lat: "",
    lng: "",
    sighted_at: "",
  });

  const handleLocationInput = useCallback(
    (locationInput) => {
      setFormData({
        ...formData,
        lat: locationInput.lat,
        lng: locationInput.lng,
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          fullWidth
          label="Sighted On"
          name="sighted_at"
          onChange={(newValue) =>
            setFormData((prevData) => ({
              ...prevData,
              sighted_at: newValue,
            }))
          }
          error={errors.sighted_at ? true : false}
          helperText={errors.sighted_at || " "}
        />
      </LocalizationProvider>

      <LocationInput
        callbackFn={handleLocationInput}
        name="sighted_location"
        errors={errors.lat}
      />

      <TextField
        label="Note"
        placeholder="Include any important information."
        fullWidth
        multiline
        rows={4}
        name="note"
        value={formData.note}
        onChange={handleChange}
        error={errors.note ? true : false}
        helperText={errors.note || " "}
      />
      <Button
        size="large"
        className="add-sighting-form__button"
        type="submit"
        disableElevation
        variant="contained"
        sx={{ width: { xs: "100%", sm: "11.25rem" } }}
      >
        Submit
      </Button>
    </form>
  );
}

export default SightingForm;
