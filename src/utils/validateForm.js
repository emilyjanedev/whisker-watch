const validateForm = (formData) => {
  const newErrors = {};
  for (const [key, value] of Object.entries(formData)) {
    if (!value) {
      newErrors[key] = "This field is required";
    }
  }
  return newErrors;
};

export { validateForm };
