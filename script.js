"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Validation messages
  const MESSAGES = {
    REQUIRED_NAME: "Please enter your name.",
    REQUIRED_EMAIL: "Please enter your email.",
    REQUIRED_PASSWORD: "Please enter your password.",
    INVALID_EMAIL: "Please enter a valid email address.",
  };

  // DOM Elements
  const form = document.getElementById("signup-form");
  const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  // Utility: Display error message
  const showError = (input, message) => {
    const formGroup = input.closest(".form-group");
    const errorMessage = formGroup?.querySelector(".error-message");
    if (errorMessage) {
      input.classList.add("error");
      errorMessage.textContent = message;
      errorMessage.style.display = "block";
    }
  };

  // Utility: Hide error message
  const hideError = (input) => {
    const formGroup = input.closest(".form-group");
    const errorMessage = formGroup?.querySelector(".error-message");
    if (errorMessage) {
      input.classList.remove("error");
      errorMessage.style.display = "none";
    }
  };

  // Validation: Check if input is required
  const validateRequired = (input, message) => {
    const isValid = input.value.trim() !== "";
    isValid ? hideError(input) : showError(input, message);
    return isValid;
  };

  // Validation: Check email format
  const validateEmail = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(input.value.trim());
    isValid ? hideError(input) : showError(input, MESSAGES.INVALID_EMAIL);
    return isValid;
  };

  // Save user data (Note: Hash passwords in production)
  const saveUserData = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    alert(
      `User Details Saved Successfully:\nName: ${userData.name}\nEmail: ${userData.email}`
    );
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const isNameValid = validateRequired(inputs.name, MESSAGES.REQUIRED_NAME);
    const isEmailValid =
      validateRequired(inputs.email, MESSAGES.REQUIRED_EMAIL) &&
      validateEmail(inputs.email);
    const isPasswordValid = validateRequired(
      inputs.password,
      MESSAGES.REQUIRED_PASSWORD
    );

    if (isNameValid && isEmailValid && isPasswordValid) {
      const userData = {
        name: inputs.name.value.trim(),
        email: inputs.email.value.trim(),
        password: inputs.password.value.trim(), // Hash this password in production
      };

      saveUserData(userData);
      form.reset();
    }
  };

  // Set up real-time validation for inputs
  Object.values(inputs).forEach((input) =>
    input.addEventListener("input", () => hideError(input))
  );

  // Initialize form submit event
  form.addEventListener("submit", handleFormSubmit);
});
