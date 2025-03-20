import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = ({ switchToSignup }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative backdrop-blur-md bg-white/90 border border-gray-300 shadow-2xl rounded-2xl overflow-hidden w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Your Email"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-gray-700"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-teal-700 hover:text-teal-900 font-semibold transition-all"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Toggle to Signup Page */}
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Don't have an account?</h3>
          <div
            className="cursor-pointer text-teal-700 hover:text-teal-900 font-bold mt-2 transition-all"
            onClick={switchToSignup}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;