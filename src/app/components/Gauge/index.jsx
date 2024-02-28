import React from "react";

import { CircularProgress } from "@mui/material";
import styles from "./style.module.css";

export default function Gauge(params) {
  const value = params.value ?? "";
  const size = params.size ?? 60;
  const label = params.label ?? undefined;
  const textClass = params.textClass;
  const borderSize = `${params.borderSize ?? 4}px`;

  return (
    <div
      className={`text-body-1 weight-400 d-flex align-center justify-center
        ${styles["gauge-wrapper"]}`}
      style={{
        width: size,
        height: size,
        "--border-size": borderSize,
      }}>
      <CircularProgress
        className={styles["circle"]}
        variant="determinate"
        value={value}
      />
      <span
        className="d-flex direction-column align-center"
        style={{ position: "relative", top: "2px" }}>
        {label && (
          <span className={`mb-1 ${textClass && textClass}`}>{label}</span>
        )}
        <span className={textClass && textClass}>{value}%</span>
      </span>
    </div>
  );
}
