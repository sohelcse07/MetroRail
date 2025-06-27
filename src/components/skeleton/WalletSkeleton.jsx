import React from "react";

const WalletSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-6 text-center">
          <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto"></div>
        </div>

        {/* Balance and Recharge Form Row Skeleton */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Balance Card Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="bg-gray-200 p-3 rounded-full">
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Recharge Form Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex-1">
            <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded-md"></div>
              </div>
              <div className="h-10 w-full bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Transaction History Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Amount', 'Method', 'Status', 'Date'].map((_, index) => (
                    <th key={index} scope="col" className="px-6 py-3 text-left">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(3)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {[...Array(4)].map((_, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSkeleton;