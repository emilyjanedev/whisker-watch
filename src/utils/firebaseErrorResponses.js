const generateErrorMessage = (error) => {
  let errorMessage = "Something went wrong. Please try again.";

  if (error.code === "auth/email-already-in-use") {
    errorMessage =
      "This email is already in use. Please use a different email.";
  } else if (error.code === "auth/invalid-email") {
    errorMessage = "Please enter a valid email address.";
  } else if (error.code === "auth/weak-password") {
    errorMessage = "Password should be at least 6 characters long.";
  } else if (error.code === "auth/user-not-found") {
    errorMessage = "No user found with this email address.";
  } else if (error.code === "auth/wrong-password") {
    errorMessage = "Incorrect password. Please try again.";
  } else if (error.code === "auth/too-many-requests") {
    errorMessage = "Too many failed login attempts. Please try again later.";
  }

  return errorMessage;
};

export { generateErrorMessage };
