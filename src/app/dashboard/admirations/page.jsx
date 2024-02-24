"use client";

import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import Header from "./components/Header";
import Single from "./components/Single";
import AdmirationsList from "./components/AdmirationsList";

import getAdmirationsList from "@/app/lib/admiration/list";
import deleteAdmiration from "@/app/lib/admiration/delete";
import { th } from "date-fns-jalali/locale";

export default function Admirations() {
  const admirationCats = [
    { label: "دریافت شده", icon: () => {}, slug: "received" },
    { label: "ارسال شده", icon: () => {}, slug: "sent" },
  ];
  const { theWorkspace, theWorkspaceTimeframes, setTheWorkspaceTimeframes } =
    useContext(workspaceContext);

  const [loading, setLoading] = useState(true);
  const [admirationCat, setAdmirationCat] = useState("received");
  const [activeTimeframe, setActiveTimeframe] = useState();
  const [admirations, setAdmirations] = useState({ data: [] });
  const [singleAdmiration, setSingleAdmiration] = useState("");
  const [reloadList, setReloadList] = useState(false);
  const [openedActions, setOpenedActions] = useState("");

  useEffect(() => {
    (async function () {
      setLoading(true);
      if (theWorkspace) {
        const admirationsList = await getAdmirationsList(
          theWorkspace,
          admirationCat
        );

        setLoading(false);
        setAdmirations(admirationsList);
      }
    })();
  }, [reloadList, theWorkspace, admirationCat]);

  const closePopup = () => setSingleAdmiration("");

  const handleAdmirationDelete = async (admirationId) => {
    setLoading(true);
    await deleteAdmiration(theWorkspace, admirationId);
    setLoading(false);
    setReloadList((state) => !state);
  };

  return (
    <>
      <div>
        <Header
          admirationCats={admirationCats}
          admirationCat={admirationCat}
          setAdmirationCat={setAdmirationCat}
          setSingleAdmiration={setSingleAdmiration}
        />
        <div className={`d-flex ${loading ? "loading" : ""}`}>
          <AdmirationsList
            setSingleAdmiration={setSingleAdmiration}
            admirations={admirations.data}
            reloadList={reloadList}
            setReloadList={setReloadList}
            handleAdmirationDelete={handleAdmirationDelete}
            admirationCat={admirationCat}
          />
        </div>
      </div>
      {singleAdmiration !== "" && (
        <Single
          admirations={admirations.data}
          setSingleAdmiration={setSingleAdmiration}
          singleAdmiration={singleAdmiration}
          closePopup={closePopup}
          setReloadList={setReloadList}
        />
      )}
    </>
  );
}
