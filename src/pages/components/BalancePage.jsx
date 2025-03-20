import React from "react";

const BalancePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-primary mb-4">Balance</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Balance</h2>
          <span className="text-2xl font-bold text-primary">$1,250.00</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Last Transaction</p>
            <span className="text-gray-800">-$50.00</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Total Earnings</p>
            <span className="text-green-600">+$1,300.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancePage;