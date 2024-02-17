import React, { useContext } from "react";

import styles from "./style.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import workspaceContext from "@/app/context/workspaceContext";

import deleteKpi from "@/app/lib/kpi/delete";
import updateKpi from "@/app/lib/kpi/update";

export default function Actions({
  kpi,
  kpiId,
  setOpenedActions,
  setSingleKpi,
  setLoading,
  setReloadList,
}) {
  const { theWorkspace } = useContext(workspaceContext);
  const deactiveKpi = async () => {
    setLoading(true);
    setOpenedActions("")
    
    await updateKpi(theWorkspace, kpiId, {
      ...kpi,
      status: 1,
      continuous: +kpi.continuous.code,
      direction: +kpi.direction.code,
      calculationMethod: +kpi.calculationMethod.code,
      assignee: kpi.assignee.id,
      colleagues: kpi.colleagues.map((item) => item.id),
    });

    setReloadList((state) => !state);
    setLoading(false);
  };

  const handleDeleteKpi = async () => {
    setLoading(true);
    await deleteKpi(theWorkspace, kpiId);
    setReloadList((state) => !state);
    setLoading(false);
  };

  const handleEditKpi = () => {
    setSingleKpi(kpiId);
    setOpenedActions("");
  };

  return (
    <div
      className={`wrapper-box px-0 pb-1 mr-auto ${styles["actions-wrapper"]}`}>
      <ClearIcon
        onClick={() => setOpenedActions("")}
        className={`cursor-pointer ${styles["close"]}`}
        style={{ color: "red" }}
      />
      <div
        className={`px-3 py-1 ${styles["actions-item"]}`}
        onClick={handleEditKpi}>
        ویرایش
      </div>
      <div className={`px-3 py-1 ${styles["actions-item"]}`}>مقادیر</div>
      <div
        className={`px-3 py-1 ${styles["actions-item"]}`}
        style={{ color: "orange" }}
        onClick={deactiveKpi}>
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
