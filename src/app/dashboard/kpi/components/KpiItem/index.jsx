import React, { useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CurrentPeriod from "./CurrentPeriod";
import Assignee from "./Assignee";
import Actions from "./Actions";
import Amount from "../Amount";

export default function KpiItem({
  kpi,
  openedActions,
  setOpenedActions,
  setSingleKpi,
  setLoading,
  setReloadList,
}) {
  const [openAmount, setOpenAmount] = useState(false);

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
              setOpenAmount={setOpenAmount}
            />
          </>
        )}
      </div>

      {openAmount && (
        <Amount
          setOpenAmount={setOpenAmount}
          kpiId={kpi.id}
          title={kpi.name}
          continuous={kpi.continuous.key}
        />
      )}
    </div>
  );
}
