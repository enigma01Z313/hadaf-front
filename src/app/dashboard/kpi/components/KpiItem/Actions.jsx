import React, { useState } from "react";

import styles from "./style.module.css";
import ClearIcon from "@mui/icons-material/Clear";

import deleteKpi from "@/app/lib/kpi/delete";

export default function Actions({
  kpiId,
  setOpenedActions,
  setSingleKpi,
  setLoading,
}) {
  const deactiveKpi = () => {};

  const handleDeleteKpi = async () => {
    setLoading(true);
    await deleteKpi(kpiId);
    setLoading(false);
  };

  const handleEditKpi = () => {
    setSingleKpi(kpiId)
    setOpenedActions("")
  }

  return (
    <div className={`wrapper-box px-0 pb-1 ${styles["actions-wrapper"]}`}>
      <ClearIcon
        onClick={() => setOpenedActions("")}
        className={`cursor-pointer ${styles["close"]}`}
        style={{color: 'red'}}
      />
      <div
        className={`px-3 py-1 ${styles["actions-item"]}`}
        onClick={handleEditKpi}>
        ویرایش
      </div>
      <div className={`px-3 py-1 ${styles["actions-item"]}`}>مقادیر</div>
      <div
        className={`px-3 py-1 ${styles["actions-item"]}`}
        style={{ color: "orange" }}>
        غیر فعال سازی
      </div>
      <div
        className={`px-3 py-1 ${styles["actions-item"]}`}
        style={{ color: "red" }}
        onClick={handleDeleteKpi}>
        حذف
      </div>
    </div>
  );
}
