import React from "react";

import styles from "./style.module.css";
import InfoItem from "./InfoItem";

export default function Card({ card, columns, targetW }) {
  return (
    <div className={`wrapper-box p-1 ${styles["card"]}`}>
      {columns.map((columnConfig, index) => (
        <InfoItem
          key={index}
          card={{ row: card }}
          columnConfig={columnConfig}
          index={index}
          targetW={targetW}
        />
      ))}
    </div>
  );
}
