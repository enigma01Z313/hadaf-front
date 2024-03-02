"use client";

import React, { useState } from "react";
import ListTable from "./components/ListTable";
// import Create from "./components/Create";
import NoSSR from "@/app/components/NoSSR";

export default function Team() {
  return (
    <NoSSR>
      <ListTable setMode={setMode} reloadList={reloadList} />
      {/* {mode === "create" && (
        <Create
          open={mode === "create"}
          setMode={setMode}
          setRealoadList={setRealoadList}
        />
      )}  */}
    </NoSSR>
  );
}
