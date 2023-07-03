export const validateLoginForm = ({ email, password, setErrors }) => {
  let validationErrors = {};

  if (!email.trim()) {
    validationErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    validationErrors.email = "Invalid email address";
  }

  if (!password.trim()) {
    validationErrors.password = "Password is required";
  }

  setErrors(validationErrors);
  return Object.keys(validationErrors).length === 0;
};

export const validateRegisterForm = ({ user, terms, setErrors }) => {
  let validationErrors = {};

  // Validate first name
  if (!user.first_name.trim()) {
    validationErrors.first_name = "First name is required";
  }

  // Validate last name
  if (!user.last_name.trim()) {
    validationErrors.last_name = "Last name is required";
  }

  // Validate email
  if (!user.email.trim()) {
    validationErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    validationErrors.email = "Invalid email address";
  }

  // Validate password
  if (!user.password.trim()) {
    validationErrors.password = "Password is required";
  } else if (user.password.length < 8) {
    validationErrors.password = "Password must be at least 8 characters long";
  } else if (!/\d/.test(user.password)) {
    validationErrors.password = "Password must contain at least 1 digit";
  }

  // Validate password confirmation
  if (user.password !== user.password_confirmation) {
    validationErrors.password_confirmation = "Passwords do not match";
  }

  // Validate terms acceptance
  if (!terms) {
    validationErrors.terms = "Please accept the terms and conditions";
  }

  setErrors(validationErrors);
  return Object.keys(validationErrors).length === 0 && terms;
};
