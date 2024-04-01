"use client";

import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns-jalali-3";

import workspaceContext from "@/app/context/workspaceContext";

import WorkspaceDatail from "../components/WorkspaceDatail";
import Header from "./components/Header";
import BoxedItems from "../components/BoxedItems";
import Charts from "./components/Charts";
import OkrList from "./components/OkrList";
import OkrDetailItemConfigs from "./OkrDetailItemConfigs";

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
      if (theWorkspace) {
        const okrDashboardData = await getDashboardData({
          workspaceId: theWorkspace,
          target: "okrs",
          activeTimeframe,
          year,
          targetMember: targetMember !== "all" ? targetMember : undefined,
        });

        setDashboardData(okrDashboardData);
      }
    })();
  }, [theWorkspace, activeTimeframe, targetMember, year]);

  useEffect(() => {
    (async function () {
      let timeframesList;

      if ((theWorkspaceTimeframes?.length ?? 0) === 0) {
        timeframesList = theWorkspace
          ? await listTimeframes({ workspaceId: theWorkspace, raw: true })
          : [];

        setTheWorkspaceTimeframes(timeframesList);
      } else timeframesList = theWorkspaceTimeframes;

      setActiveTimeframe(timeframesList?.[0]?.id);
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

        {dashboardData.okrDetail && (
          <BoxedItems
            data={dashboardData.okrDetail}
            config={OkrDetailItemConfigs}
          />
        )}

        {dashboardData.okrGroupedByStatus && (
          <Charts
            data={dashboardData.okrGroupedByStatus}
            okrProgress={dashboardData.okrProgress}
            year={year}
            setYear={setYear}
            targetMember={targetMember}
            setTargetMember={setTargetMember}
          />
        )}

        {dashboardData.okrList && <OkrList data={dashboardData.okrList} />}
      </div>
    </main>
  );
}
