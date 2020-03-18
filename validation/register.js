const Validator = require("validator");
const isEmpty = require("is-empty");

// Takes in data sent from frontend registration form
module.exports = function valdidateRegisterInput(data) {
  let errors = {};

  // Validator function requires string input
  // Converts all empty fields to empty strings
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  // Check name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Check email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Check password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Check reconfirm password
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  // Check password length
  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = "Password must be at least 6 characters";
  }

  // Check if password matches reconfirm password
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Return errors and boolean that indicates if there are errors
  return ({
    errors,
    isValid: isEmpty(errors)
  });
}
