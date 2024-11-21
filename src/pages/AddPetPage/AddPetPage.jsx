import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationInput from "../../components/LocationInput/LocationInput";
import placeholder from "../../assets/images/pet-image-placeholder.jpg";
import "./AddPetPage.scss";

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
    pet_name: "",
    lat: null,
    lng: null,
    pet_age: null,
    description: "",
    pet_temperament: "",
    missing_since: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    console.log(errors);
    console.log(formData);
  };

  const imagePreview = formData.pet_image
    ? URL.createObjectURL(formData.pet_image)
    : placeholder;

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <div className="add-pet-form__image-container">
        <img
          className="add-pet-form__image"
          src={imagePreview}
          alt="Preview of pet"
        />
        <input
          className="add-pet-form__file-input"
          type="file"
          accept="image/*"
          name="pet_image"
          id="file"
          onChange={handleChange}
        />
        {errors.pet_image && <p>{errors.pet_image}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Pet Name:</label>
        <input
          className="add-pet-form__input"
          type="text"
          name="pet_name"
          value={formData.pet_name}
          onChange={handleChange}
        />
        {errors.pet_pet_name && <p>{errors.pet_name}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Location Lost:</label>
        <LocationInput name="location_lost" callbackFn={handleLocationInput} />
        {errors.lat && <p>{errors.lat}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Missing Since:</label>
        <input
          className="add-pet-form__input"
          type="date"
          name="missing_since"
          value={formData.missing_since}
          onChange={handleChange}
        />
        {errors.missing_since && <p>{errors.missing_since}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Pet Age:</label>
        <input
          className="add-pet-form__input"
          type="number"
          name="pet_age"
          value={formData.pet_age}
          onChange={handleChange}
        />
        {errors.pet_age && <p>{errors.pet_age}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Description:</label>
        <textarea
          className="add-pet-form__textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Pet Temperament:</label>
        <select
          className="add-pet-form__select"
          name="pet_temperament"
          value={formData.pet_temperament}
          onChange={handleChange}
        >
          {temperaments.map((temperament) => (
            <option key={temperament} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
        {errors.pet_temperament && <p>{errors.pet_temperament}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Pet Size:</label>
        <select
          className="add-pet-form__select"
          name="pet_size"
          value={formData.pet_size}
          onChange={handleChange}
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        {errors.pet_size && <p>{errors.pet_size}</p>}
      </div>

      <div className="add-pet-form__field">
        <label className="add-pet-form__label">Email:</label>
        <input
          className="add-pet-form__input"
          type="email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
        />
        {errors.contact_email && <p>{errors.contact_email}</p>}
      </div>

      <div className="add-pet-form__actions">
        <button
          className="add-pet-form__button add-pet-form__button--cancel"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button className="add-pet-form__button">Submit</button>
      </div>
    </form>
  );
}

export default AddPetPage;
