"use client";

import React, { useState } from "react";
import NoSSR from "@/app/components/NoSSR";
import ListTable from "./components/ListTable";
import Single from "./components/Single";

export default function Team() {
  const [singleTeam, setSingleTeam] = useState("");
  const [reloadList, setReloadList] = useState(true);

  const closePopup = () => setSingleTeam("");

  return (
    <NoSSR>
      <ListTable
        setSingleTeam={setSingleTeam}
        reloadList={reloadList}
        setReloadList={setReloadList}
      />

      {singleTeam !== "" && (
        <Single
          setSingleTeam={setSingleTeam}
          singleTeam={singleTeam}
          closePopup={closePopup}
          setReloadList={setReloadList}
        />
      )}
    </NoSSR>
  );
}
