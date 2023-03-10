import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./BarChart.css";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

import React from "react";

export default function BarChart() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/Sales`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //sorting out data for charts

  const thisYear = moment().year();
  // Filter sales by year
  const thisYearSales = sales.filter(
    (sale) => moment(sale.date).year() === thisYear
  );

  // Group sales by month
  const salesByMonth = thisYearSales.reduce((acc, sale) => {
    const month = moment(sale.date).format("MMMM");
    if (acc[month]) {
      acc[month] += sale.total;
    } else {
      acc[month] = sale.total;
    }
    return acc;
  }, {});

  // Get sorted list of months
  const sortedMonths = moment
    .months()
    .sort(
      (a, b) => moment(a, "MMMM").format("MM") - moment(b, "MMMM").format("MM")
    );

  // Get sales data in sorted order
  const salesData = sortedMonths.map((month) => salesByMonth[month] || 0);

  //------------cancelled sales--------------
  const cancelledSales = thisYearSales.filter(
    (sale) => sale.isCancelled && moment(sale.date).year() === thisYear
  );
  const cancelledSalesByMonth = {};

  cancelledSales.forEach((sale) => {
    const month = moment(sale.date).format("MMMM");
    if (!cancelledSalesByMonth[month]) {
      cancelledSalesByMonth[month] = 0;
    }
    cancelledSalesByMonth[month] += sale.total;
  });

  const cancelledSalesData = sortedMonths.map(
    (month) => cancelledSalesByMonth[month]
  );

  const chartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: `Sales by month (${thisYear})`,
        data: salesData,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        label: `Cancelled Sales by month (${thisYear})`,
        data: cancelledSalesData,
        backgroundColor: "rgba(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: "right",
    },
  };

  const paymentTypes = sales.reduce((acc, sale) => {
    const paymentForm = sale.paymentForm;
    if (acc[paymentForm]) {
      acc[paymentForm]++;
    } else {
      acc[paymentForm] = 1;
    }
    return acc;
  }, {});

  const pieData = {
    labels: ["Credito", "Debito", "Efectivo"],
    datasets: [
      {
        label: "Categories",
        data: [
          paymentTypes.Credito,
          paymentTypes.Debito,
          paymentTypes.Efectivo,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  if (!paymentTypes) {
    return <h2>Loading</h2>;
  }

  return (
    <>
      <div className="charts_title">
        <h2>Chart ONE</h2>
        <h2>Chart TWO</h2>
      </div>
      <div className="chart_container">
        <div className="chart bar">
          <Bar data={chartData} options={barOptions} />
        </div>
        <div className="chart pie">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </>
  );
}
