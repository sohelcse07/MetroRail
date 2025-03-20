import React from "react";

const RechargePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-secondary mb-4">Recharge</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>
        <button className="w-full bg-secondary text-white p-2 rounded-md hover:bg-secondary/90">
          Recharge Now
        </button>
      </div>
    </div>
  );
};

export default RechargePage;