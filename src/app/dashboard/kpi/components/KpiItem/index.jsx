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
  setReloadList,
}) {
  console.log('1-1-----------------------------------');
  // console.log(kpi);

  return (
    <div className={`d-flex align-center `}>
      <span>{kpi.name}</span>
      <span className="text-center" style={{ width: "110px" }}>
        <CurrentPeriod continuous={kpi.continuous} />
      </span>
      <span>
        <Assignee assignee={kpi.assignee} />
      </span>
      <div className="p-relative mr-auto">
        <span
          className="cursor-pointer d-flex align-center p-1"
          onClick={() => setOpenedActions(kpi.id)}>
          <MoreHorizIcon />
        </span>
        {kpi.id === openedActions && (
          <>
            <Actions
              kpi={kpi}
              kpiId={kpi.id}
              setOpenedActions={setOpenedActions}
              setSingleKpi={setSingleKpi}
              setLoading={setLoading}
              setReloadList={setReloadList}
            />
          </>
        )}
      </div>
    </div>
  );
}
