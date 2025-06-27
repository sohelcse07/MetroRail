import React from "react";

const PermanentTicketSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="max-w-5xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-6 text-center">
          <div className="h-8 w-64 bg-gray-200 rounded-md mx-auto mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-md mx-auto"></div>
        </div>

        {/* Main Content Skeleton */}
        <div className="space-y-5">
          {/* Ticket Creation/Details Card Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
            </div>

            {/* Form/Details Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-md">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>

            {/* QR Code Placeholder Skeleton */}
            <div className="flex flex-col items-center mb-4">
              <div className="h-3 w-16 bg-gray-200 rounded mb-3"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-md"></div>
              <div className="h-3 w-32 bg-gray-200 rounded mt-3"></div>
            </div>
          </div>

          {/* Action Card Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4 pb-2 border-b border-gray-100"></div>
            
            {/* Form Elements Skeleton */}
            <div className="mb-4">
              <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded-md"></div>
            </div>
            
            <div className="h-10 w-full bg-gray-300 rounded-md mb-4"></div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="h-10 flex-1 bg-gray-200 rounded-md"></div>
              <div className="h-10 flex-1 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermanentTicketSkeleton;