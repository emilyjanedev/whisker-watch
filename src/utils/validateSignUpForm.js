import validator from "validator";

function validateSignUpForm(formData, action) {
  const errors = {};

  if (action === "signup") {
    if (!formData.user_name) {
      errors.user_name = "Name is required.";
    }
    if (!formData.user_email || !validator.isEmail(formData.user_email)) {
      errors.user_email = "A valid email is required.";
    }
    if (!formData.password || formData.password.length <= 6) {
      errors.password = "Password must be more than 6 characters.";
    }
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords must match.";
    }
  }

  if (action === "update") {
    if (!formData.current_password) {
      errors.current_password = "Current password is required.";
    }
    if (!formData.user_name) {
      errors.user_name = "Name is required.";
    }
    if (!formData.user_email || !validator.isEmail(formData.user_email)) {
      errors.user_email = "A valid email is required.";
    }
    if (formData.password && formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords must match.";
    }
  }

  return errors;
}

export { validateSignUpForm };
