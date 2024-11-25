import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState, useCallback } from "react";
import { TextField, Button } from "@mui/material";
import LocationInput from "../LocationInput/LocationInput";

function SightingForm({ petId }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    pet_id: "",
    sighted_on: "",
    note: "",
    lat: "",
    lng: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="submit" className="add-sighting-form">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          fullWidth
          label="Sighted On"
          name="sighted_on"
          onChange={(newValue) =>
            setFormData((prevData) => ({
              ...prevData,
              sighted_on: newValue,
            }))
          }
          error={errors.sighted_on ? true : false}
          helperText={errors.sighted_on || " "}
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
        className="add-pet-form__button"
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
