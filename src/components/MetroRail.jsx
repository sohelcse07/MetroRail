import React from "react";

const MetroRail = () => {
  return (
    <div className="relative w-full flex justify-center items-center p-8 bg-gradient-to-br from-indigo-900 to-blue-800">
      <div className="relative w-full max-w-4xl">
        {/* Background Cityscape */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-full h-48 bg-green-100 rounded-full opacity-50"></div>
        </div>

      {/* Metro Rail Illustration */}
      <div className="relative z-10 flex flex-col items-center">
          {/* Bridge */}
          <div className="w-full h-12 bg-gray-800 relative flex justify-between">
            <div className="absolute bottom-0 left-0 right-0 flex justify-around">
              <div className="w-6 h-16 bg-gray-300"></div>
              <div className="w-6 h-20 bg-gray-300"></div>
              <div className="w-6 h-16 bg-gray-300"></div>
            </div>
          </div>
          
          {/* Train */}
          <div className="absolute -top-8 flex space-x-2">
            <div className="w-32 h-10 bg-green-500 rounded-lg border border-black flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-32 h-10 bg-green-500 rounded-lg border border-black flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-32 h-10 bg-green-500 rounded-lg border border-black flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Initiative Text */}
        <div className="relative z-20 mt-24 text-center">
          <h1 className="text-4xl font-bold text-white">
            Revolutionizing Urban Travel
          </h1>
          <p className="mt-4 text-lg text-indigo-200">
            Join us in building a smarter, greener, and faster metro rail system
            for the future.
          </p>
          <button className="mt-6 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetroRail;