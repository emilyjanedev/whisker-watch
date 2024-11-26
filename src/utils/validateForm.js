import validator from "validator";

const validateForm = (formData) => {
  const newErrors = {};
  for (const [key, value] of Object.entries(formData)) {
    if (key === "contact_email") {
      if (!validator.isEmail(value)) {
        newErrors[key] = "Please enter a valid email address";
      }
    } else if (!value) {
      newErrors[key] = "This field is required";
    }
  }
  console.log(newErrors);
  return newErrors;
};
export { validateForm };
