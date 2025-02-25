import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className={`relative backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-xl overflow-hidden  ${isLoginPage?"w-[50.5rem] h-[48rem]":"w-[35.5rem] h-[40rem]"}`}>
        <div className="relative z-20 h-full">
        <form
            className={` flex flex-col items-center px-8 ${
              isLoginPage ? "w-full justify-start pt-8" : "w-[320px] pt-32"
            }`}
          >
            {/* <div className={`grid ${isLoginPage?"grid-cols-1 ":"grid-cols-1"} `}> */}
            {/* Username field (only for Register) */}
            {isLoginPage && (
              <div className="mb-5 relative">
                <input
                  type="text"
                  className="w-[30rem] bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400"
                  placeholder="Username"
                />
              </div>
            )}

            {/* Email field */}
            <div className="mb-5 relative ">
              <input
                type="text"
                className={`${
                  isLoginPage ? "w-[30rem]" : "w-[30rem] ml-[240px]"
                } bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400`}
                placeholder="Your email"
              />
            </div>

            {/* Telegram number field (only for Register) */}
            {isLoginPage && (
              <div className="mb-5 relative">
                <input
                  type="text"
                  className="w-[30rem] bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400"
                  placeholder="Telegram number"
                />
              </div>
            )}

            {/* Date of birth field (only for Register) */}
            {isLoginPage && (
              <div className="mb-5 relative">
                <input
                  type="date"
                  className="w-[30rem] bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400"
                  placeholder="Date of birth"
                />
              </div>
            )}

            {/* Gender field (only for Register) */}
            {isLoginPage && (
              <div className="mb-5 relative">
                <select
                  className="w-[30rem] bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400"
                  placeholder="Gender"
                >
                  <option value="" disabled selected>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {/* NID number field (only for Register) */}
            {isLoginPage && (
              <div className="mb-5 relative">
                <input
                  type="text"
                  className="w-[30rem] bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400"
                  placeholder="NID number"
                />
              </div>
            )}

            {/* Password field */}
            <div className="mb-5 relative ">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                className={`${
                  isLoginPage ? "w-[30rem]" : "w-[30rem] ml-[240px]  "
                } bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 transform -translate-y-1/2 right-6 text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm password field (only for Register) */}
            {isLoginPage && (
              <div className="mb-5 relative">
                <input
                  name="confirmpassword"
                  type={passwordVisible ? "text" : "password"}
                  className="w-[30rem] bg-transparent placeholder:text-gray-500 pl-8 py-3 rounded-lg shadow-inner border border-gray-300 text-gray-800 outline-none focus:shadow-md focus:border-blue-400"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 transform -translate-y-1/2 right-6 text-gray-500"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            )}
{/* </div> */}
            {/* Submit Button */}
            <button
              className={`w-[20rem] py-3 text-sm font-bold uppercase text-white rounded-full shadow-md transition-transform transform hover:scale-105 ${
                isLoginPage
                  ? "bg-teal-600 hover:bg-teal-700 mt-4"
                  : "bg-teal-600 hover:bg-teal-700 mt-10 ml-[230px]"
              }`}
            >
              {isLoginPage ? "Register Now" : "Log In Now"}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div
            className={`absolute text-center w-full text-gray-700 ${
              isLoginPage ? "bottom-2" : "bottom-36"
            }`}
          >
            <h3 className="text-xl font-semibold">
              {isLoginPage ? "Already have an account?" : "No account yet?"}
            </h3>
            <div
              className="mt-2 text-white text-lg  bg-teal-600 hover:bg-teal-700 w-44  mx-auto  rounded-lg p-2 font-semibold cursor-pointer"
              onClick={() => setIsLoginPage(!isLoginPage)}
            >
              {isLoginPage ? "Sign In" : "Sign Up"}
            </div>
          </div>
        </div>

        {/* Background Shapes */}
        <div className="absolute inset-0 backdrop-blur-lg">
          <div className="absolute transform rotate-45 bg-white/50 w-[520px] h-[520px] top-[-50px] right-[120px] rounded-tr-[72px] shadow-xl"></div>
          <div className="absolute transform rotate-45 bg-teal-200 w-[220px] h-[220px] top-[-172px] right-0 rounded-[32px] shadow-lg"></div>
          <div className="absolute transform rotate-45 bg-gradient-to-r from-teal-300 to-teal-400 w-[190px] h-[540px] top-[-24px] right-0 rounded-[32px] shadow-md"></div>
          <div className="absolute top-[26rem] transform rotate-45 bg-teal-100 w-[200px] h-[400px] bottom-[50px] right-[50px] rounded-[60px] shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
