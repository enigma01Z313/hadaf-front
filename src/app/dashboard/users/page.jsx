"use client";

import React, { useContext, useEffect } from "react";
import ListTable from "./components/ListTable";
import CreateModeContext from "../CreateModeContext";

export default function Users() {
  const { createMode, setCreateMode } = useContext(CreateModeContext);
    
  return (
    <>
      {(createMode && "ثبت کاربر") || (
        <ListTable setCreateMode={setCreateMode} />
      )}
    </>
  );
}
