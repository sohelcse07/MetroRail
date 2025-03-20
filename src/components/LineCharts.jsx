import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ lineChartWithData }) => {
  // Default options for the chart
  const apexLineChartWithLabels = {
    chart: {
      height: 380,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: [3, 3],
      curve: "smooth",
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#e9ecef",
    },
    markers: {
      size: 6,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Temperature",
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  // Chart data
  const apexLineChartWithLabelsData = [
    {
      name: "High - 2018",
      data: lineChartWithData.data1 || [],
    },
    {
      name: "Low - 2018",
      data: lineChartWithData.data2 || [],
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Line with Data Labels</h4>
      </div>
      <Chart
        options={apexLineChartWithLabels}
        series={apexLineChartWithLabelsData}
        type="line"
        height={380}
        className="apex-charts"
        dir="ltr"
      />
    </div>
  );
};

export default LineChart;