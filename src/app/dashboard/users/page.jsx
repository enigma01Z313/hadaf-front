"use client";

import React, { useState } from "react";
import ListTable from "./components/ListTable";
import Create from "./components/Create";

export default function Users() {
  const [mode, setMode] = useState("list");
  const [reloadList, setRealoadList] = useState(false);

  return (
    <>
      <ListTable setMode={setMode} reloadList={reloadList} />
      {mode === "create" && (
        <Create
          open={mode === "create"}
          setMode={setMode}
          setRealoadList={setRealoadList}
        />
      )}
    </>
  );
}
