"use client"

import React from "react";

// import "boxicons";

import OkrDetailItem from "./OkrDetailItem";

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
