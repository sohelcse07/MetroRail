import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
    isError: false,
  });
  const navigate = useNavigate();
  const { register } = useAuth();

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    console.log(value)
    if (value.startsWith("0")) value = value.substring(1);
    if (value.length > 10) value = value.slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      phone_number: value,
    }));

    setErrors((prev) => ({
      ...prev,
      phone_number: "",
    }));
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 6;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let passwordError = "";

    if (!hasMinLength && !hasSpecialChar) {
      passwordError =
        "Password must be at least 6 characters and contain 1 special character";
    } else if (!hasMinLength) {
      passwordError = "Password must be at least 6 characters long";
    } else if (!hasSpecialChar) {
      passwordError = "Password must contain at least 1 special character";
    }

    setErrors((prev) => ({
      ...prev,
      password: passwordError,
    }));

    return passwordError === "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    const match = confirmPassword === formData.password;
    setErrors((prev) => ({
      ...prev,
      confirm_password: match ? "" : "Passwords do not match",
    }));
    return match;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showDialog = (title, message, isError = false) => {
    setDialogContent({ title, message, isError });
    setDialogOpen(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setDialogOpen(false);

    const isPasswordValid = validatePassword(formData.password);
    const isConfirmValid = validateConfirmPassword(formData.confirm_password);
    const phoneValid = formData.phone_number.length === 10;

    if (!phoneValid) {
      setErrors((prev) => ({
        ...prev,
        phone_number: "Phone number must be 10 digits (excluding +880)",
      }));
    }

    if (!isPasswordValid || !isConfirmValid || !phoneValid) return;

    setLoading(true);
    const fullPhone = "880" + formData.phone_number;

    try {
      await register({
        phone_number: fullPhone,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      showDialog(
        "Registration Successful",
        "You will be redirected to login page",
        false
      );
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      showDialog(
        "Registration Failed",
        error.response?.data?.phone_number?.[0] || "Please try again.",
        true
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Join us to get started</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                +880
              </span>
              <input
                id="phone"
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handlePhoneChange}
                placeholder="1XXXXXXXXX"
                required
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min 6 chars with 1 special)"
                required
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="confirm_password"
                type={passwordVisible ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-600">{errors.confirm_password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-teal-600 hover:text-teal-500"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Radix Dialog for messages */}
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg focus:outline-none">
            <Dialog.Title className={`text-lg font-semibold ${dialogContent.isError ? "text-red-600" : "text-teal-600"}`}>
              {dialogContent.title}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              {dialogContent.message}
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <Dialog.Close asChild>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    dialogContent.isError
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                  }`}
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default SignupPage;