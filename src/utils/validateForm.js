import validator from "validator";

const validateForm = (formData) => {
  const newErrors = {};
  for (const [key, value] of Object.entries(formData)) {
    if (key === "contact_email") {
      if (!validator.isEmail(value)) {
        newErrors[key] = "Please enter a valid email address";
      }
    } else if (key === "description") {
      if (value.length > 150 || value.length < 1) {
        newErrors[key] = "Please enter a description. (Max. 150 characters)";
      }
    } else if (key === "pet_name") {
      if (value.length > 10 || value.length < 1) {
        newErrors[key] = "Please enter a name. (Max. 10 characters)";
      }
    } else if (key === "note") {
      if (value.length > 100 || value.length < 1) {
        newErrors[key] = "Please enter a note. (Max. 100 characters)";
      }
    } else if (!value) {
      newErrors[key] = "*Field is required";
    }
  }
  return newErrors;
};
export { validateForm };
