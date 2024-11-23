import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as backend from "../../api/backend.js";
import LocationInput from "../../components/LocationInput/LocationInput";
import placeholder from "../../assets/images/pet-image-placeholder.jpg";
import "./AddPetPage.scss";
import InputFileUpload from "../../components/InputFileUpload/InputFileUpload.jsx";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const temperaments = [
  "Friendly",
  "Timid",
  "Aggressive",
  "Protective",
  "Energetic",
];

const sizes = ["XS", "S", "M", "L", "XL"];

function AddPetPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    pet_image: null,
    pet_name: "",
    pet_type: "",
    lat: null,
    lng: null,
    pet_age: null,
    description: "",
    pet_temperament: "",
    missing_since: "",
    pet_size: "",
    contact_name: "",
    contact_email: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pet_image") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

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

  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = "This field is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataObject = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataObject.append(key, value);
      }
      const { id } = await backend.addPet(formDataObject);
      // Use Id for redirect to pet profile page
      // Or back to map
    }
  };

  const imagePreview = formData.pet_image
    ? URL.createObjectURL(formData.pet_image)
    : placeholder;

  return (
    <Container maxWidth="md" sx={{ p: { xs: "1rem", sm: "2rem" } }}>
      <Box
        sx={{
          margin: "2rem 0",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            textAlign: { xs: "center", sm: "left" },
            fontWeight: "medium",
            marginBottom: { xs: "1rem", sm: "2rem" },
          }}
        >
          Let&apos;s Find your Lost Pet...
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="add-pet-form"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: { xs: "nowrap", sm: "wrap" },
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Box>
              <div className="add-pet-form__image-container">
                <img
                  className="add-pet-form__image"
                  src={imagePreview}
                  alt="Preview of pet"
                />
              </div>

              <InputFileUpload
                name="pet_image"
                handleChange={handleChange}
                errors={errors.pet_image}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "wrap",
                gap: "1rem",
                width: { sm: "68%" },
                flexGrow: "1",
                justifyContent: "space-between",
              }}
            >
              <TextField
                label="Pet Name"
                placeholder="Enter you pet's name"
                fullWidth
                name="pet_name"
                value={formData.pet_name}
                onChange={handleChange}
                error={errors.pet_name ? true : false}
                helperText={errors.pet_name}
                sx={{ width: { sm: "48%" } }}
              />

              <LocationInput
                name="location_lost"
                callbackFn={handleLocationInput}
              />

              <DateField
                label="Missing Since"
                name="missing_since"
                onChange={handleChange}
                error={errors.missing_since ? true : false}
                helperText={errors.missing_since}
                sx={{ width: { sm: "48%" } }}
              />

              <TextField
                label="Pet Age"
                placeholder="Enter you pet's age"
                fullWidth
                name="pet_age"
                value={formData.pet_age}
                onChange={handleChange}
                error={errors.pet_age ? true : false}
                helperText={errors.pet_age}
                sx={{ width: { sm: "48%" } }}
              />

              <TextField
                label="Description"
                placeholder="Include any important information."
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description ? true : false}
                helperText={errors.description}
              />

              <FormControl
                fullWidth
                error={errors.pet_type ? true : false}
                sx={{ width: { sm: "24%" } }}
              >
                <InputLabel id="pet-type">Pet Type</InputLabel>
                <Select
                  labelId="pet-type"
                  name="pet_type"
                  value={formData.pet_type}
                  label="Pet Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"cat"}>Cat</MenuItem>
                  <MenuItem value={"dog"}>Dog</MenuItem>
                </Select>
                <FormHelperText>{errors.pet_type}</FormHelperText>
              </FormControl>

              <FormControl
                fullWidth
                error={errors.pet_temperament ? true : false}
                sx={{ width: { sm: "44%" } }}
              >
                <InputLabel id="pet-temperament">Pet Temperament</InputLabel>
                <Select
                  labelId="pet-temperament"
                  name="pet_temperament"
                  value={formData.pet_temperament}
                  label="Pet Temperament"
                  onChange={handleChange}
                >
                  {temperaments.map((temperament) => (
                    <MenuItem key={temperament} value={temperament}>
                      {temperament}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.pet_temperament}</FormHelperText>
              </FormControl>

              <FormControl
                fullWidth
                error={errors.pet_size ? true : false}
                sx={{ width: { sm: "24%" } }}
              >
                <InputLabel id="pet-size">Pet Size</InputLabel>
                <Select
                  labelId="pet-size"
                  name="pet_size"
                  value={formData.pet_size}
                  label="Pet Size"
                  onChange={handleChange}
                >
                  {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.pet_size}</FormHelperText>
              </FormControl>

              <TextField
                label="Contact Name"
                placeholder="Who would you like to be contacted if found?"
                fullWidth
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                error={errors.contact_name ? true : false}
                helperText={errors.contact_name}
                sx={{ width: { sm: "48%" } }}
              />

              <TextField
                label="Contact Email"
                placeholder="Enter the contact's email"
                fullWidth
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                error={errors.contact_email ? true : false}
                helperText={errors.contact_email}
                sx={{ width: { sm: "48%" } }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: { xs: "nowrap", sm: "wrap" },
                justifyContent: "end",
                gap: "1rem",
                width: "100%",
              }}
            >
              <Button
                size="large"
                className="add-pet-form__button add-pet-form__button--cancel"
                onClick={() => navigate(-1)}
                disableElevation
                variant="outlined"
                sx={{ width: { xs: "100%", sm: "11.25rem" } }}
              >
                Cancel
              </Button>
              <Button
                size="large"
                className="add-pet-form__button"
                disableElevation
                variant="contained"
                sx={{ width: { xs: "100%", sm: "11.25rem" } }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
      </Box>
    </Container>
  );
}

export default AddPetPage;
