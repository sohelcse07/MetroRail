import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth(); // ✅ FIXED destructuring
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // only digits
    if (input.startsWith("0")) input = input.slice(1);
    if (input.length > 10) input = input.slice(0, 10);

    setFormData((prev) => ({ ...prev, phone_number: input }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const { phone_number, password } = formData;

    if (phone_number.length !== 10) {
      setMessage("❌ Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    const fullPhone = "+880" + phone_number;

    try {
      await login({
        phone_number: fullPhone,
        password,
      });

      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Login failed. Please try again.";
      setMessage("❌ " + errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative backdrop-blur-md bg-white/90 border border-gray-300 shadow-2xl rounded-2xl overflow-hidden w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {message && (
          <div
            className={`text-sm mb-4 font-semibold text-center ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          {/* Phone Number */}
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
              pattern="[1][0-9]{9}"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
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

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-teal-700 hover:text-teal-900 font-semibold"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-teal-500 hover:to-blue-600"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Don't have an account?
          </h3>
          <div
            className="cursor-pointer text-teal-700 hover:text-teal-900 font-bold mt-2"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
