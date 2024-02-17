import React from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CurrentPeriod from "./CurrentPeriod";
import Assignee from "./Assignee";
import Actions from "./Actions";

export default function KpiItem({
  kpi,
  openedActions,
  setOpenedActions,
  setSingleKpi,
  setLoading,
}) {
  return (
    <div className="d-flex">
      <span>{kpi.name}</span>
      <span className="text-center" style={{ width: "110px" }}>
        <CurrentPeriod continuous={kpi.continuous} />
      </span>
      <span>
        <Assignee assignee={kpi.assignee} />
      </span>
      <span className="p-relative">
        <span
          className="cursor-pointer"
          onClick={() => setOpenedActions(kpi.id)}>
          <MoreHorizIcon />
        </span>
        {kpi.id === openedActions && (
          <>
            <Actions
              kpiId={kpi.id}
              setOpenedActions={setOpenedActions}
              setSingleKpi={setSingleKpi}
              setLoading={setLoading}
            />
          </>
        )}
      </span>
    </div>
  );
}
