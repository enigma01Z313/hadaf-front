"use client";

import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import Header from "./components/Header";
import OkrsList from "./components/OkrsList";

import Single from "./components/Single";

import updateOkr from "@/app/lib/okr/update";
import listTimeframes from "@/app/lib/timeframes/list";

export default function Okr({ filteredUser, filteredMeMode }) {
  const { theWorkspace, theWorkspaceTimeframes, setTheWorkspaceTimeframes } =
    useContext(workspaceContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState();
  const [timeframes, setTimeframes] = useState([]);
  const [singleOkr, setSingleOkr] = useState("");
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    (async function () {
      let timeframesList;

      timeframesList = theWorkspace
        ? await listTimeframes({ workspaceId: theWorkspace, raw: true })
        : [];

      setTheWorkspaceTimeframes(timeframesList);
      setActiveTimeframe(timeframesList?.[0]?.id);
      setTimeframes(timeframesList);
    })();
  }, [theWorkspace]);

  const closePopup = () => setSingleOkr("");

  const saveCurrentOkr = async (id, data) =>
    new Promise(async (resolve, reject) => {
      const updatedData = await updateOkr(theWorkspace, id, data);
      resolve();
    });

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
            reloadList={reloadList}
            activeTimeframe={activeTimeframe}
            filteredUser={filteredUser}
            filteredMeMode={filteredMeMode}
          />
        </div>
      </div>
      {singleOkr !== "" && (
        <Single
          singleOkr={singleOkr}
          setSingleOkr={setSingleOkr}
          closePopup={closePopup}
          saveCurrentOkr={saveCurrentOkr}
          setReloadList={setReloadList}
          timeframes={timeframes}
        />
      )}
    </>
  );
}
