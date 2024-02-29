import React, { useState, useEffect, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";

import Devider from "@/app/components/Devider";
import Create from "./Create";
import List from "./List";
import Filter from "./Filter";

import getOkrTasksList from "@/app/lib/workspaces/tasks/list";
import listTaskStatuses from "@/app/lib/tasks/StatusList";

export default function Tasks({ okrId, keyResults }) {
  const { theWorkspace } = useContext(workspaceContext);

  const [tasks, setTasks] = useState([]);
  const [taskStasuses, setTaskStasuses] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [reloadList, setRealoadList] = useState(false);

  useEffect(() => {
    (async function () {
      const statusList = await listTaskStatuses();

      setTaskStasuses({
        notFinished: {
          ...statusList.find((item) => item.name === "شروع نشده"),
          label: "انجام نشده",
        },
        finished: {
          ...statusList.find((item) => item.name === "انجام شده"),
          label: "انجام شده",
        },
        stopped: {
          ...statusList.find((item) => item.name === "متوقف شده"),
          label: "متوقف شده",
        },
      });
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const tasksList = await getOkrTasksList(theWorkspace, okrId);

      setTasks(tasksList.data);
    })();
  }, [reloadList]);

  return (
    <section>
      <Filter
        taskStasuses={taskStasuses}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {taskStasuses.finished && (
        <List
          tasks={tasks}
          statusFilter={statusFilter}
          keyResults={keyResults}
          setRealoadList={setRealoadList}
          finishedStatus={taskStasuses.finished.id}
          notFinishedStatus={taskStasuses.notFinished.id}
          stoppedStatus={taskStasuses.stopped.id}
        />
      )}

      <Devider spacing={1} line={true} />

      {keyResults.length !== 0 && taskStasuses.notFinished?.id && (
        <Create
          okrId={okrId}
          keyResults={keyResults}
          defStatus={taskStasuses.notFinished.id}
          tasksL={tasks.length}
          setRealoadList={setRealoadList}
        />
      )}
    </section>
  );
}
