import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./BarChart.css";

import React from "react";

export default function BarChart() {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3, 20],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Category A", "Category B", "Category C"],
    datasets: [
      {
        label: "Categories",
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <>
      <div className="chart_container">
        <div className="chart">
          <Bar data={chartData} />
        </div>
        <div className="chart pie">
          <Pie data={pieData} />
        </div>
      </div>
    </>
  );
}
