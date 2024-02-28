"use client";

import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns-jalali-3";

import workspaceContext from "@/app/context/workspaceContext";

import WorkspaceDatail from "../components/WorkspaceDatail";
import BoxedItems from "../components/BoxedItems";
import Charts from "./components/Charts";
import OkrList from "./components/OkrList";
import TaskDetailItemConfigs from "./TaskDetailItemConfigs";

import listTimeframes from "@/app/lib/timeframes/list";
import getDashboardData from "@/app/lib/dashboard/list";

export default function OkrsDashboard() {
  const { theWorkspace, theWorkspaceTimeframes, setTheWorkspaceTimeframes } =
    useContext(workspaceContext);

  const [timeframes, setTimeframes] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [activeTimeframe, setActiveTimeframe] = useState();
  const [targetMember, setTargetMember] = useState("all");
  const [year, setYear] = useState(format(new Date(), "yyyy"));

  useEffect(() => {
    (async function () {
      const okrDashboardData = await getDashboardData({
        workspaceId: theWorkspace,
        target: "tasks",
        year,
        targetMember: targetMember !== "all" ? targetMember : undefined,
      });

      setDashboardData(okrDashboardData);
    })();
  }, [theWorkspace, targetMember, year]);

  return (
    <main>
      <div className="wrapper-box">
        <WorkspaceDatail data={dashboardData.workspaceDetail} />

        <i class="bx bxs-user-detail info font-large-1"></i>

        {dashboardData.taskDetail && (
          <BoxedItems
            data={dashboardData.taskDetail}
            config={TaskDetailItemConfigs}
          />
        )}

        {dashboardData.taskGroupedByStatus && (
          <Charts
            data={dashboardData.taskGroupedByStatus}
            taskProgress={
              Object.is(null, dashboardData.taskProgress)
                ? 0
                : dashboardData.taskProgress
            }
            year={year}
            setYear={setYear}
            targetMember={targetMember}
            setTargetMember={setTargetMember}
          />
        )}
      </div>
    </main>
  );
}
