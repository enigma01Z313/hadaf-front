import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import ContainedInfo from "@/app/components/Button/ContainedInfo";
import Gauge from "@/app/components/Gauge";

ChartJS.register(ArcElement, Tooltip, Legend);

function Header() {
  return (
    <div className="d-flex align-end">
      <div className="d-flex-direction-column grow-1">
        <div>اعضا</div>
      </div>
      <div className="d-flex-direction-column grow-1">
        <div>سال</div>
        <div></div>
      </div>
      <ContainedInfo className={"grow-1 justify-center"}>اعمال</ContainedInfo>
    </div>
  );
}


export default function Charts({ data }) {
  const chartData = {
    labels: Object.values(data).map((item) => item.data.label),
    datasets: [
      {
        label: "تعداد",
        data: Object.values(data).map((item) => item.count),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: "IranSans" // Add your font here to change the font of your legend label
          },
          position: "right"
        },
        tooltip: {
          bodyFont: {
            family: "IranSans" // Add your font here to change the font of your tooltip body
          },
          titleFont: {
            family: "IranSans" // Add your font here to change the font of your tooltip title
          }
        }
      }
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
  };

  return (
    <section className="mt-3">
      <Header />

      <div className="mt-2 d-flex">
        <div
          className="grow-1 d-flex justify-center px-5"
          style={{ width: "49%", float: 'right' }}>
            <div style={{maxWidth: "300px"}}>
          <Doughnut data={chartData} options={options} /></div>
        </div>
        <div
          className="grow-1 d-flex justify-center align-end"
          style={{ width: "49%", float: 'right' }}>
          <Gauge
            value={40}
            size={'250px'}
            label="پیشرفت"
            textClass="text-h5"
            borderSize={23}
          />
        </div>
        <div className="clear-both"></div>
      </div>
    </section>
  );
}
