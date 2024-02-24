"use client";

import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import Header from "./components/Header";

import listTimeframes from "@/app/lib/timeframes/list";
import Single from "./components/Single";
import KpisList from "./components/KpisList";

// import updateOkr from "@/app/lib/okr/update";

export default function KPI() {
  const { theWorkspace, theWorkspaceTimeframes, setTheWorkspaceTimeframes } =
    useContext(workspaceContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState();
  const [timeframes, setTimeframes] = useState([]);
  const [singleKpi, setSingleKpi] = useState("");
  const [reloadList, setReloadList] = useState(false);
  const [openedActions, setOpenedActions] = useState("");

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

  const closePopup = () => setSingleKpi("");

  return (
    <>
      <div>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTimeframe={activeTimeframe}
          setActiveTimeframe={setActiveTimeframe}
          timeframes={timeframes}
          setSingleKpi={setSingleKpi}
        />
        <div className="wrapper-box pl-1">
          <KpisList
            setSingleKpi={setSingleKpi}
            reloadList={reloadList}
            setReloadList={setReloadList}
          />
        </div>
      </div>
      {singleKpi !== "" && (
        <Single
          singleKpi={singleKpi}
          setSingleKpi={setSingleKpi}
          closePopup={closePopup}
          setReloadList={setReloadList}
        />
      )}
    </>
  );
}
