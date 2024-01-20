"use client";

import React, { useState } from "react";
import ListTable from "./components/Boards";
import Single from "./components/Single";
import NoSSR from "@/app/components/NoSSR";

export default function Tasks() {
  const [reloadList, setRealoadList] = useState(false);
  const [singleTask, setSingleTask] = useState("")
  const [columns, setColumns] = useState([])
  const [tasksCount, setTasksCount] = useState(0)

  return (
    <NoSSR>
      <ListTable
        reloadList={reloadList}
        setRealoadList={setRealoadList}
        setSingleTask={setSingleTask}
        setColumns={setColumns}
        setTasksCount={setTasksCount}
      />
      {singleTask !== "" && (
        <Single
          open={true}
          singleTask={singleTask}
          setRealoadList={setRealoadList}
          setSingleTask={setSingleTask}
          taskStatuses={columns}
          tasksCount={tasksCount}
        />
      )}
    </NoSSR>
  );
}
