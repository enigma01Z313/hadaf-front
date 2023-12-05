import React, { useState } from "react";

import styles from "./style.module.css";

export default function DoupleActiveSwitch({ onChange, value, style }) {
  const [stateVal, setStateVal] = useState(value ?? 0);

  const handleChange = () => {
    let newVal;

    if (stateVal === 0) newVal = 1;
    else newVal = 0;

    setStateVal(newVal);
    onChange(newVal);
  };

  return (
    <div
      onClick={handleChange}
      className={`
        ${styles["switch-wrapper"]} 
        ${styles[`state-${stateVal}`]} 
        ${styles[`style-${style ?? "default"}`]}`}
    >
      <div className={styles["cursor"]}></div>
    </div>
  );
}
