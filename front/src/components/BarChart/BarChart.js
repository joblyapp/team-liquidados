import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./BarChart.css";

import React from "react";

export default function BarChart() {
  const chartData = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ventas",
        data: [12, 19, 3, 5, 2, 3, 20, 40, 2, 8, 25, 15],
        backgroundColor: "rgba(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Alimentos", "Aseo", "Pelucas"],
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
        <div className="chart bar">
          <Bar data={chartData} />
        </div>
        <div className="chart pie">
          <Pie data={pieData} />
        </div>
      </div>
    </>
  );
}
