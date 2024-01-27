"use client";

import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import Header from "./components/Header";
import Okrlist from "./components/OkrList";

import listTimeframes from "@/app/lib/timeframes/list";
import Single from "./components/Single";

export default function Okr() {
  const { theWorkspace } = useContext(workspaceContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState();
  const [timeframes, setTimeframes] = useState([]);
  const [singleOkr, setSingleOkr] = useState("");

  useEffect(() => {
    (async function () {
      const timeframesList = theWorkspace
        ? await listTimeframes({ workspaceId: theWorkspace, raw: true })
        : [];

      setActiveTimeframe(timeframesList?.[0].id);
      setTimeframes(timeframesList);
    })();
  }, [theWorkspace]);

  const closePopup = () => setSingleOkr("")

  return (
    <>
      <div>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTimeframe={activeTimeframe}
          setActiveTimeframe={setActiveTimeframe}
          timeframes={timeframes}
          setSingleOkr={setSingleOkr}
        />
        <div className="wrapper-box">
          <Okrlist searchTerm={searchTerm} />
        </div>
      </div>
      {singleOkr !== "" && <Single singleOkr={singleOkr} closePopup={closePopup} />}
    </>
  );
}
