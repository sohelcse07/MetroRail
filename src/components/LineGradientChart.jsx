import React from "react";
import Chart from "react-apexcharts";

const LineGradientChart = ({ gradientLineChartData }) => {
  const options = {
    chart: {
      height: 380,
      type: "line",
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/11/2000",
        "2/11/2000",
        "3/11/2000",
        "4/11/2000",
        "5/11/2000",
        "6/11/2000",
        "7/11/2000",
        "8/11/2000",
        "9/11/2000",
        "10/11/2000",
        "11/11/2000",
        "12/11/2000",
        "1/11/2001",
        "2/11/2001",
        "3/11/2001",
        "4/11/2001",
        "5/11/2001",
        "6/11/2001",
      ],
    },
    title: {
      text: "Social Media",
      align: "left",
      style: {
        fontSize: "14px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#43d39e"],
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 4,
      colors: ["#50a5f1"],
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    yaxis: {
      min: -10,
      max: 40,
      title: {
        text: "Engagement",
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#185a9d",
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

  const series = [
    {
      name: "Likes",
      data: gradientLineChartData.data || [],
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Gradient Line Chart</h4>
      </div>
      <Chart
        id="apex-charts-Gradient"
        options={options}
        series={series}
        type="line"
        height={380}
        className="apex-charts"
        dir="ltr"
      />
    </div>
  );
};

export default LineGradientChart;