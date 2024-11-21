import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationInput from "../../components/LocationInput/LocationInput";
import placeholder from "../../assets/images/pet-image-placeholder.jpg";

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
  const [checkboxStatus, setCheckboxStatus] = useState({
    email: false,
    phone: false,
  });
  const [formData, setFormData] = useState({
    pet_name: "",
    lat: null,
    lng: null,
    pet_age: null,
    description: "",
    pet_temperament: "",
    pet_size: "",
    contact_email: "",
    pet_image: null,
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
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    validateForm();
    console.log(errors);
  };

  const imagePreview = formData.pet_image
    ? URL.createObjectURL(formData.pet_image)
    : placeholder;

  return (
    <form action="submit" onSubmit={handleSumbit}>
      <img src={imagePreview} alt="picture of pet" />
      <input
        type="file"
        accept="image/*"
        name="pet_image"
        id="file"
        onChange={handleChange}
      />
      <label>
        Pet Name:
        <input
          type="text"
          name="pet_name"
          value={formData.pet_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Location Lost:
        <LocationInput name="location_lost" callbackFn={handleLocationInput} />
      </label>
      <label>
        Missing Since:
        <input
          type="date"
          name="missing_since"
          value={formData.missing_since}
          onChange={handleChange}
        />
      </label>
      <label>
        Pet Age:
        <input
          type="number"
          name="pet_age"
          value={formData.pet_age}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Pet Temperament:
        <select
          name="pet_temperament"
          id="pet_temperament"
          value={formData.pet_temperament}
          onChange={handleChange}
        >
          {temperaments.map((temperament) => (
            <option key={temperament} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
      </label>
      <label>
        Pet Size:
        <select
          name="pet_size"
          id="pet_size"
          value={formData.pet_size}
          onChange={handleChange}
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <label>
        <input
          type="email"
          name="contact_email"
          placeholder="Email Address"
          value={formData.contact_email}
          onChange={handleChange}
        />
      </label>
      <button onClick={() => navigate(-1)}>Cancel</button>
      <button>Submit</button>
    </form>
  );
}

export default AddPetPage;
