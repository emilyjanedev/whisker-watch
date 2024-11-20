import { useState } from "react";
import LocationInput from "../../components/LocationInput/LocationInput";

function AddPetPage() {
  const [checkboxStatus, setCheckboxStatus] = useState({
    email: false,
    phone: false,
  });
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const temperaments = [
    "Friendly",
    "Timid",
    "Aggressive",
    "Protective",
    "Energetic",
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleSumbit = (e) => {
    e.preventDefault();
  };
  return (
    // Image Input
    <form action="submit" onSubmit={handleSumbit}>
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
        <input
          type="text"
          name="location_lost"
          value={formData.location_lost}
          onChange={handleChange}
        />
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
        Contact Method:
        <div>
          <input
            type="checkbox"
            id="email"
            name="email"
            onClick={() =>
              setCheckboxStatus({
                ...checkboxStatus,
                email: !checkboxStatus.email,
              })
            }
          />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="phone"
            name="phone"
            onClick={() =>
              setCheckboxStatus({
                ...checkboxStatus,
                phone: !checkboxStatus.phone,
              })
            }
          />
          <label htmlFor="phone">Phone</label>
        </div>
      </label>
      {checkboxStatus.email && (
        <input
          type="email"
          name="contact_email"
          placeholder="Email Address"
          value={formData.contact_email}
          onChange={handleChange}
        />
      )}
      {checkboxStatus.phone && (
        <input
          type="tel"
          name="contact_phone"
          placeholder="Phone Number"
          value={formData.contact_phone}
          onChange={handleChange}
        />
      )}
    </form>
  );
}

export default AddPetPage;
