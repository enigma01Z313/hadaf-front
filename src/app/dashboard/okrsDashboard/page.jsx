"use client";

import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";

import Header from "./components/Header";
import WorkspaceDatail from "./components/WorkspaceDatail";
import OkrDetail from "./components/OkrDetail";
import Charts from "./components/Charts";

import listTimeframes from "@/app/lib/timeframes/list";
import getDashboardData from "@/app/lib/dashboard/list";

export default function OkrsDashboard() {
  const { theWorkspace, theWorkspaceTimeframes, setTheWorkspaceTimeframes } =
    useContext(workspaceContext);

  const [activeTimeframe, setActiveTimeframe] = useState();
  const [timeframes, setTimeframes] = useState([]);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    (async function () {
      const okrDashboardData = await getDashboardData({
        workspaceId: theWorkspace,
        target: "okrs",
        activeTimeframe,
      });

      setDashboardData(okrDashboardData);

      console.log("1---------------------");
      console.log(okrDashboardData);
    })();
  }, [theWorkspace, activeTimeframe]);

  useEffect(() => {
    (async function () {
      let timeframesList;

      if ((theWorkspaceTimeframes?.length ?? 0) === 0) {
        timeframesList = theWorkspace
          ? await listTimeframes({ workspaceId: theWorkspace, raw: true })
          : [];

        setTheWorkspaceTimeframes(timeframesList);
      } else timeframesList = theWorkspaceTimeframes;

      setActiveTimeframe(timeframesList?.[0].id);
      setTimeframes(timeframesList);
    })();
  }, [theWorkspace]);

  return (
    <main>
      <Header
        activeTimeframe={activeTimeframe}
        timeframes={timeframes}
        setActiveTimeframe={setActiveTimeframe}
      />
      <div className="wrapper-box">
        <WorkspaceDatail data={dashboardData.workspaceDetail} />

        <OkrDetail data={dashboardData.okrDetail} />

        {dashboardData.okrGroupedByStatus && (
          <Charts data={dashboardData.okrGroupedByStatus} />
        )}
      </div>
    </main>
  );
}
