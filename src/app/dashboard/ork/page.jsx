"use client";

import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import Header from "./components/Header";
import OkrsList from "./components/OkrsList";

import listTimeframes from "@/app/lib/timeframes/list";
import Single from "./components/Single";

import updateOkr from "@/app/lib/okr/update";

export default function Okr() {
  const { theWorkspace, theWorkspaceTimeframes, setTheWorkspaceTimeframes } =
    useContext(workspaceContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState();
  const [timeframes, setTimeframes] = useState([]);
  const [singleOkr, setSingleOkr] = useState("");

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

  const closePopup = () => setSingleOkr("");

  const saveCurrentOkr = async (id, data) => {
    console.log('---------------------');
    console.log(id);
    console.log(data);
    // const updatedData = await updateOkr(
    //   theWorkspace,
    //   id,
    //   data
    // );
  };

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
          <OkrsList
            searchTerm={searchTerm}
            setSingleOkr={setSingleOkr}
            saveCurrentOkr={saveCurrentOkr}
          />
        </div>
      </div>
      {singleOkr !== "" && (
        <Single
          singleOkr={singleOkr}
          setSingleOkr={setSingleOkr}
          closePopup={closePopup}
          saveCurrentOkr={saveCurrentOkr}
        />
      )}
    </>
  );
}
