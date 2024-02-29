import React from "react";

import Timeframe from "../../moreInfo/Timeframe";
import ParentOkr from "../../moreInfo/ParentOkr";
import Accesslevel from "../../moreInfo/Accesslevel";
import Colleages from "../../moreInfo/Colleages";

export default function Details({
  workspaceUsers,
  changeHandlred,
  timeFrame,
  targetParent,
  access,
  colleagues,
}) {
  return (
    <div className="d-flex">
      <Timeframe value={timeFrame} changeHandlred={changeHandlred} />

      <ParentOkr value={targetParent} changeHandlred={changeHandlred} />

      <Accesslevel value={access} changeHandlred={changeHandlred} />

      <Colleages
        workspaceUsers={workspaceUsers}
        values={colleagues}
        changeHandlred={changeHandlred}
      />
    </div>
  );
}
