import React, { useState, useContext, useEffect } from "react";
import { TextField, FormControl, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import workspaceContext from "@/app/context/workspaceContext";

import Assignee from "../../header/Assignee";
import KeyResultSelect from "./KeyResultSelect";
import TexedError from "@/app/components/Button/TextedError";
import updateTask from "@/app/lib/tasks/update";

export default function Item({
  task,
  keyResults,
  setRealoadList,
  finishedStatus,
  notFinishedStatus,
  stoppedStatus,
}) {
  const { theUsers, theWorkspace } = useContext(workspaceContext);
  const [theTask, setTheTask] = useState({
    id: task.id,
    title: task.title,
    assignee: task.assignee.id,
    keyResult: task.keyResult.id,
    status: task.status.id,
  });
  const [assignee, setAssignee] = useState(task.assignee.id);
  const [keyResult, setKeyResult] = useState(task.keyResult.id);
  const [shouldUpdateRes, setShouldUpdateReq] = useState(false);

  const changeHandlred = (key, value) => {
    setTheTask((state) => ({ ...state, [key]: value }));
    if (key === "assignee") setAssignee(value);
    if (key === "keyResult") setKeyResult(value);
  };

  useEffect(() => {
    (async function () {
      const uppdateTaskData = { ...theTask, id: undefined };
      const newTask = await updateTask(
        theTask.id,
        uppdateTaskData,
        theWorkspace
      );

      setRealoadList((state) => !state);
    })();
  }, [shouldUpdateRes, keyResult, assignee]);

  const handleStatusUpdate = async (e) => {
    let newStatus;
    let uppdateTaskData = { status: finishedStatus };

    if (theTask.status === notFinishedStatus) newStatus = finishedStatus;
    else newStatus = notFinishedStatus;

    changeHandlred("status", newStatus);
    const newTask = await updateTask(
      theTask.id,
      { status: newStatus },
      theWorkspace
    );
    setRealoadList((state) => !state);
  };

  const handleTaskRemove = async () => {
    changeHandlred("status", stoppedStatus);
    const newTask = await updateTask(
      theTask.id,
      { status: stoppedStatus },
      theWorkspace
    );
    setRealoadList((state) => !state);
  };

  return (
    <div className="d-flex mt-2 no-wrap align-end">
      <Checkbox
        checked={finishedStatus === theTask.status}
        onChange={(e) => handleStatusUpdate(e)}
      />
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="task-title-new"
          label="عنوان"
          variant="standard"
          placeholder="عنوان اقدامک..."
          onChange={(e) => changeHandlred("title", e.target.value)}
          value={theTask.title}
          onBlur={() => setShouldUpdateReq((state) => !state)}
        />
      </FormControl>

      <TexedError className="p-1 mr-2" onClick={() => handleTaskRemove()}>
        <DeleteIcon />
      </TexedError>

      <KeyResultSelect
        keyResults={keyResults}
        value={theTask.keyResult}
        changeHandlred={changeHandlred}
      />

      <Assignee
        workspaceUsers={theUsers.data}
        value={theTask.assignee}
        changeHandlred={changeHandlred}
      />
    </div>
  );
}
