import React from "react";

const HelpPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-info mb-4">Help</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          <div className="mt-2 space-y-2">
            <div className="p-3 bg-gray-100 rounded-md">
              <p className="font-medium">How do I recharge my account?</p>
              <p className="text-sm text-gray-600">
                Go to the Recharge page and enter the amount you wish to recharge.
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-md">
              <p className="font-medium">How do I transfer my balance?</p>
              <p className="text-sm text-gray-600">
                Navigate to the Balance Transfer page and follow the instructions.
              </p>
            </div>
          </div>
        </div>
        <button className="w-full bg-info text-white p-2 rounded-md hover:bg-info/90">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpPage;