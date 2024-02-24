import React, { useEffect, useState } from "react";

import calcColor from "./calcColor";
import calcDiff from "./calcDiff";

import styles from "./style.module.css";

export default function AmountCol({
  activeOrder,
  amounts,
  amount,
  threshholds,
  order,
  direction,
  setActiveOrder,
  handleChange,
  handleAmountUpdate,
}) {
  const [diff, setDiff] = useState("-");

  useEffect(() => {
    const tmp = calcDiff(
      amounts?.[amount?.order]?.realAmount,
      amounts?.[amount?.order - 1]?.realAmount,
      direction
    );

    setDiff(tmp);
  }, [amounts]);

  return (
    <div
      className={`d-flex direction-column grow-1 ml-1 
        ${styles["amount-col"]}
        ${activeOrder === order ? styles["active-col"] : ""}
        `}
      onClick={() => setActiveOrder(order)}>
      <div
        className="w-100 text-center text-body-2"
        style={{ marginBottom: "5px", paddingTop: '5px' }}>
        {amount.label}
        <br />
        <span style={{ fontSize: "12px" }}>{amount.label2}</span>
      </div>
      <input
        type="text"
        className={`text-center 
          ${calcColor(
            amounts[amount.order].realAmount,
            threshholds,
            direction
          )}`}
        style={{ maxWidth: "85px", marginBottom: "10px" }}
        value={amounts[amount.order].realAmount}
        onChange={(e) => handleChange(amount.order, "realAmount", e, true)}
        onBlur={() => handleAmountUpdate(amount.order)}
      />
      <input
        type="text"
        className="text-center"
        style={{ maxWidth: "85px", marginBottom: "10px" }}
        value={amounts[amount.order].expAmount}
        onChange={(e) => handleChange(amount.order, "expAmount", e, true)}
        onBlur={() => handleAmountUpdate(amount.order)}
      />
      <span
        className={`w-100 text-center text-body-2
          ${diff < 0 ? "color-red" : "color-green"}`}
        style={{ direction: "ltr" }}>
        {(typeof diff === "number" && `${diff}%`) || "-"}
      </span>
    </div>
  );
}
