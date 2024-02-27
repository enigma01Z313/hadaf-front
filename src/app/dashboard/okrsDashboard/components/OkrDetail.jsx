import React from "react";
import "boxicons";

const OkrDetailItemConfigs = [
  {
    icon: "user-x",
    title: "اعضای بدون هدف",
    value: "membersWithOutOkr",
    color: { bg: "#e2ecff", text: "#5a8dee" },
  },
  {
    icon: "sitemap",
    title: "تیمهای بدون هدف",
    value: "teamsWithOutOkr",
    color: { bg: "#ccf5f8", text: "#00cfdd" },
  },
  {
    icon: "task",
    title: "اهداف بدون اقدام",
    value: "okrsWithOutTask",
    color: { bg: "#ffeed9", text: "#fdac41" },
  },
  {
    icon: "target-lock",
    title: "اهداف همسو شده",
    value: "AlignedOkrs",
    color: { bg: "#d2ffe8", text: "#39da8a" },
  },
];

function OkrDetailItem({ title, value, icon, color, index }) {
  return (
    <div
      className={`wrapper-box grow-1 d-flex direction-column align-center 
        ${index !== 0 ? "mr-3" : ""}`}>
      <div>
        <box-icon color={color.text} name={icon}></box-icon>
      </div>
      <div className="mb-2 text-body-2">{title}</div>
      <div
        className="p-1 text-center"
        style={{
          background: color.bg,
          color: color.text,
          minWidth: "43px",
          borderRadius: "43px",
        }}>
        {value}
      </div>
    </div>
  );
}

export default function OkrDetail({ data }) {
  return (
    <>
      {data && (
        <section className="d-flex mt-2">
          {OkrDetailItemConfigs.map((config, index) => (
            <OkrDetailItem
              key={index}
              index={index}
              title={config.title}
              value={data[config.value]}
              icon={config.icon}
              color={config.color}
            />
          ))}
        </section>
      )}
    </>
  );
}
