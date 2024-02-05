import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./style.module.css";

export default function Gauge({ value }) {
  return (
    <div
      className={`text-body-1 weight-400 d-flex align-center justify-center
        ${styles["gauge-wrapper"]}`}
    >
      <CircularProgress
        className={styles["circle"]}
        variant="determinate"
        value={value}
      />
      <span style={{position: 'relative', top: '2px'}}>{value}%</span>
      
    </div>
  );
}
