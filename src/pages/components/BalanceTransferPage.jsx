import React from "react";

const BalanceTransferPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-success mb-4">Balance Transfer</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Recipient</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter recipient's username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>
        <button className="w-full bg-success text-white p-2 rounded-md hover:bg-success/90">
          Transfer Now
        </button>
      </div>
    </div>
  );
};

export default BalanceTransferPage;