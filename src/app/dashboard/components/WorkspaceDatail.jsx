import React from "react";

import { format } from "date-fns-jalali-3";
import { Chip, Stack } from "@mui/material";
import styles from "./style.module.css"

const OkrDetailItemConfigs = [
  {
    title: "تعداد کل اعضا",
    value: "members",
  },
  {
    title: "اعضای فعال",
    value: "activeMembers",
  },
  {
    title: "تاریخ ساخت",
    value: "createdAt",
    render: (value) => format(new Date(value), "yyyy/MM/dd"),
  },
];

export default function WorkspaceDatail({ data }) {
  return (
    <>
      {data && (
        <div className="d-flex" direction="row">
          {OkrDetailItemConfigs.map((config, index) => (
            <Chip
              className={`${styles['chips-item']} ${index !== 0 ? "mr-2" : ""}`}
              key={index}
              label={`${config.title}: ${
                config.render
                  ? config.render(data[config.value])
                  : data[config.value]
              }`}
              variant="outlined"
            />
          ))}
        </div>
      )}
    </>
  );
}
