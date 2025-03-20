import React from "react";
import LineChart from "../../components/LineCharts";
import LineGradientChart from "../../components/LineGradientChart";

const DashHomePage = () => {
  // Define your custom data for the line chart
  const lineChartWithData = {
    data1: [30, 40, 35, 50, 49, 60, 70], // High temperatures
    data2: [10, 15, 12, 20, 18, 25, 22], // Low temperatures
  };

  const gradientLineChartData = {
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 120, 130, 140, 150, 160, 170, 180], // Engagement data
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-full mx-auto">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Temperature Trends
            </h2>
            <LineChart lineChartWithData={lineChartWithData} />
          </div>

          {/* Gradient Line Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Social Media Engagement
            </h2>
            <LineGradientChart gradientLineChartData={gradientLineChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHomePage;