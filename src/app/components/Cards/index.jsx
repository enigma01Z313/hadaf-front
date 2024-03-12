import React from "react";

import Card from "./Card";
import styles from "./style.module.css";

export default function Cards({ rows, columns, targetW }) {
  return (
    <div className={`d-flex ${styles["cards"]}`}>
      {rows.map((card) => (
        <Card key={card.id} card={card} columns={columns} targetW={targetW} />
      ))}
    </div>
  );
}
