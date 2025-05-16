import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SignupPage = ({ switchToLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative backdrop-blur-md bg-white/90 border border-gray-300 shadow-2xl rounded-2xl overflow-hidden w-full max-w-2xl p-8">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-300" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
            </div>
            <span className="ml-4 text-sm font-semibold text-gray-700">
              Step {currentStep} of 4
            </span>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-6">
          {currentStep === 1 && (
            <>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" 
                placeholder="Username" 
              />
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" 
                placeholder="Your Email" 
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" 
                placeholder="Telegram Number" 
              />
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" 
              />
            </>
          )}

          {currentStep === 3 && (
            <>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="" disabled selected>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" 
                placeholder="NID Number" 
              />
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="relative w-full">
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
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12"
                  placeholder="Confirm Password"
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility} 
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between w-full mt-6">
          {currentStep < 4 &&<button
              type="button"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="mr-2" /> Previous
            </button>}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 transition-all"
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 transition-all"
              >
                Register Now
              </button>
            )}
          </div>
        </form>

        {/* Toggle to Login Page */}
        <div className="text-center mt-8">
          <h3 className="text-lg font-semibold text-gray-800">Already have an account?</h3>
          <div
            className="cursor-pointer text-teal-700 hover:text-teal-900 font-bold mt-2 transition-all"
            onClick={switchToLogin}
          >
            Sign In
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;