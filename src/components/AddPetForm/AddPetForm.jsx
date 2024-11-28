import "./AddPetForm.scss";
import * as backend from "../../api/backend.js";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../utils/validateForm.js";
import { temperaments, sizes } from "../../constants/petConstants.js";
import placeholder from "../../assets/images/pet-image-placeholder.jpg";
import InputPetDetails from "../../components/InputPetDetails/InputPetDetails.jsx";
import LocationInput from "../../components/LocationInput/LocationInput";
import Popup from "../../components/Popup/Popup.jsx";
import InputFileUpload from "../../components/InputFileUpload/InputFileUpload.jsx";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import StyledButton from "../../components/StyledButton/StyledButton.jsx";

function AddPetForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    pet_image: "",
    pet_name: "",
    pet_type: "",
    lat: "",
    lng: "",
    city: "",
    pet_age: "",
    description: "",
    pet_temperament: "",
    missing_since: null,
    pet_size: "",
    contact_name: "",
    contact_email: "",
  });
  const [open, setOpen] = useState(false);
  const [newPetId, setNewPetId] = useState("");

  const handlePopupOpen = () => setOpen(true);
  const handlePopupClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pet_image") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formDataObject = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataObject.append(key, value);
      }
      const { id } = await backend.addPet(formDataObject);
      setNewPetId(id);
      setOpen(true);

      setFormData({
        pet_image: "",
        pet_name: "",
        pet_type: "",
        lat: "",
        lng: "",
        city: "",
        pet_age: "",
        description: "",
        pet_temperament: "",
        missing_since: null,
        pet_size: "",
        contact_name: "",
        contact_email: "",
      });
    }
  };

  const imagePreview = formData.pet_image
    ? URL.createObjectURL(formData.pet_image)
    : placeholder;

  return (
    <>
      <form onSubmit={handleSubmit} className="add-pet-form">
        <div className="add-pet-form__image-input">
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
        </div>
        <div className="add-pet-form__inputs">
          <TextField
            label="Pet Name"
            placeholder="Enter you pet's name"
            fullWidth
            name="pet_name"
            value={formData.pet_name}
            onChange={handleChange}
            error={errors.pet_name ? true : false}
            helperText={errors.pet_name || " "}
            sx={{ width: { sm: "48%" } }}
            color="secondary"
          />

          <div className="add-pet-form__location-input">
            <LocationInput
              name="location_lost"
              errors={errors.lat}
              callbackFn={handleLocationInput}
            />
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Missing Since"
              name="missing_since"
              onChange={(newValue) =>
                setFormData((prevData) => ({
                  ...prevData,
                  missing_since: newValue,
                }))
              }
              error={errors.missing_since ? true : false}
              helperText={errors.missing_since || " "}
              sx={{ width: { sm: "48%" } }}
              color="secondary"
            />
          </LocalizationProvider>

          <TextField
            label="Pet Age"
            placeholder="Pet age in years (enter 0 if < 1)"
            fullWidth
            name="pet_age"
            type="number"
            value={formData.pet_age}
            onChange={handleChange}
            error={errors.pet_age ? true : false}
            helperText={errors.pet_age || " "}
            sx={{ width: { sm: "48%" } }}
            color="secondary"
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
            helperText={errors.description || " "}
            color="secondary"
          />

          <InputPetDetails
            options={["Cat", "Dog"]}
            inputName="pet_type"
            label="Pet Type"
            handleChange={handleChange}
            value={formData.pet_type}
            errors={errors.pet_type}
            color="secondary"
          />

          <InputPetDetails
            options={temperaments}
            inputName="pet_temperament"
            label="Temperament"
            handleChange={handleChange}
            value={formData.pet_temperament}
            errors={errors.pet_temperament}
            color="secondary"
          />

          <InputPetDetails
            options={sizes}
            inputName="pet_size"
            label="Pet Size"
            handleChange={handleChange}
            value={formData.pet_size}
            errors={errors.pet_size}
            color="secondary"
          />

          <TextField
            label="Contact Name"
            placeholder="Who should be contacted?"
            fullWidth
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            error={errors.contact_name ? true : false}
            helperText={errors.contact_name || " "}
            sx={{ width: { sm: "48%" } }}
            color="secondary"
          />

          <TextField
            label="Contact Email"
            placeholder="Enter the contact's email"
            fullWidth
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            error={errors.contact_email ? true : false}
            helperText={errors.contact_email || " "}
            sx={{ width: { sm: "48%" } }}
            color="secondary"
          />
        </div>
        <div className="add-pet-form__button-container">
          <StyledButton
            size="large"
            className="add-pet-form__button add-pet-form__button--cancel"
            onClick={() => navigate(-1)}
            disableElevation
            variant="outlined"
            color="secondary"
            sx={{ width: { sm: "11.25rem" }, backgroundColor: "white" }}
          >
            Cancel
          </StyledButton>
          <StyledButton
            size="large"
            className="add-pet-form__button"
            type="submit"
            disableElevation
            variant="contained"
            sx={{ width: { sm: "11.25rem" } }}
          >
            Submit
          </StyledButton>
        </div>
      </form>
      <Popup
        isOpen={open}
        handleOpen={handlePopupOpen}
        handleClose={handlePopupClose}
        title={"Pet Added!"}
        description={
          "Your pet was successfully added. Check out their profile page or browse the pet map."
        }
        petId={newPetId}
      />
    </>
  );
}

export default AddPetForm;