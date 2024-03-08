import React from "react";

import ContainedInfo from "@/app/components/Button/ContainedInfo";
import styles from "./style.module.css";

export default function PlanItem({ planItem, activeId, setActivePlanItem }) {
  return (
    <ContainedInfo
      className={`w-100 d-flex justify-center align-center text-caption
        ${styles["plan-item"]}
        ${planItem.id === activeId ? styles["active"] : ""}`}
      onClick={() => setActivePlanItem(planItem.id)}
    >
      {planItem.duration}
    </ContainedInfo>
  );
}
