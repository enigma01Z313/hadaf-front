"use client";

import React, { useState } from "react";
import ListTable from "./components/ListTable";
import NoSSR from "@/app/components/NoSSR";
import WorkspaceSelect from "./components/WorkspaceSelect";

export default function Users() {
  const [mode, setMode] = useState("list");
  const [reloadList, setRealoadList] = useState(false);
  const [singleUserId, setSingleUserId] = useState();

  return (
    <NoSSR>
      <ListTable
        setMode={setMode}
        reloadList={reloadList}
        setSingleUserId={setSingleUserId}
        setRealoadList={setRealoadList}
      />

      {singleUserId && (
        <WorkspaceSelect id={singleUserId} setSingleUserId={setSingleUserId} />
      )}
    </NoSSR>
  );
}
