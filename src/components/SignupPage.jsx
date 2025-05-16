import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage = ({ switchToLogin }) => {
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
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {register}=useAuth();

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // only digits

    // Remove leading 0
    if (value.startsWith("0")) {
      value = value.substring(1);
    }

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

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

    const fullPhone = "+880" + formData.phone_number;

    try {
      const response =await register( {
          phone_number: fullPhone,
          password: formData.password,
          confirm_password: formData.confirm_password,
        })
       

      setMessage("✅ Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(
        "❌ Registration failed: " +
          (error.response?.data?.phone_number?.[0] || "Try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        {message && (
          <div
            className={`text-sm mb-4 font-semibold text-center ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Phone number input */}
          <div className="relative flex">
            <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
              +880
            </span>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handlePhoneChange}
              placeholder="1XXXXXXXXX"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
          )}

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min 6 chars with 1 special)"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirm_password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-teal-500 hover:to-blue-600"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-teal-600 font-semibold cursor-pointer hover:underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
