"use client";

import React, { useState } from "react";
import ListTable from "./components/ListTable";
import Create from "./components/Create";
import NoSSR from "@/app/components/NoSSR";

export default function Users() {
  const [mode, setMode] = useState("list");
  const [reloadList, setRealoadList] = useState(false);

  return (
    <NoSSR>
      <ListTable setMode={setMode} reloadList={reloadList} />
      {mode === "create" && (
        <Create
          open={mode === "create"}
          setMode={setMode}
          setRealoadList={setRealoadList}
        />
      )}
    </NoSSR>
  );
}
