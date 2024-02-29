import React, { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextField, FormControl } from "@mui/material";

import workspaceContext from "@/app/context/workspaceContext";

import TextedInfo from "@/app/components/Button/TextedInfo";
import Assignee from "../../header/Assignee";
import KeyResultSelect from "./KeyResultSelect";
import createTask from "@/app/lib/tasks/create";

export default function Create({
  okrId,
  keyResults,
  defStatus,
  tasksL,
  setRealoadList,
}) {
  const { theUsers, theWorkspace } = useContext(workspaceContext);

  const [createMode, setCreateMode] = useState(false);
  const [newTask, setNewTask] = useState({
    newTaskTitle: "",
    order: tasksL + 500,
    okr: okrId,
    statusId: defStatus,
    keyResult: keyResults[0]?.id,
    assignee: theUsers.data[0].id,
    theWorkspace,
  });

  const changeHandlred = (key, value) =>
    setNewTask((state) => ({ ...state, [key]: value }));

  const saveCurrentTask = async () => {
    if (newTask.newTaskTitle !== "") {
      const newTast = await createTask(newTask);
      changeHandlred("title", "");
      setRealoadList((state) => !state);
    }
  };

  return (
    <div className="mt-1">
      {keyResults.length !== 0 && (
        <div className="d-flex no-wrap align-end">
          <FormControl className="rtl-input p-relative w-100">
            <TextField
              id="task-title-new"
              label="عنوان"
              variant="standard"
              placeholder="عنوان اقدامک..."
              onChange={(e) => changeHandlred("newTaskTitle", e.target.value)}
              value={newTask.title}
              onBlur={saveCurrentTask}
            />
          </FormControl>

          <KeyResultSelect
            keyResults={keyResults}
            value={newTask.keyResult}
            changeHandlred={changeHandlred}
          />

          <Assignee
            workspaceUsers={theUsers.data}
            value={newTask.assignee}
            changeHandlred={changeHandlred}
          />
        </div>
      )}

      <TextedInfo
        className="mt-1"
        // onClick={() => {
        //   setCreateMode(true);
        // }}
      >
        <AddIcon className="ml-1" />
        افزودن اقدامک
      </TextedInfo>
    </div>
  );
}
