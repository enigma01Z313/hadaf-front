import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  Input,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import workspaceContext from "@/app/context/workspaceContext";
import Right from "./Right";
import Left from "./Left/Index";
import getTask from "@/app/lib/tasks/get";
import updateTask from "@/app/lib/tasks/update";
import deleteTask from "@/app/lib/tasks/delete";
import Devider from "@/app/components/Devider";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import TexedError from "@/app/components/Button/TextedError";
import taskReducer from "@/app/reducers/task";
import createTask from "@/app/lib/tasks/create";

export default function Single({
  open,
  singleTask,
  setRealoadList,
  setSingleTask,
  taskStatuses,
  tasksCount,
}) {
  const { theWorkspace } = useContext(workspaceContext);
  const [loading, setLoading] = useState(false);
  const [theTask, theTaskDispatch] = useReducer(taskReducer, undefined);
  const taskTitleRef = useRef();

  useEffect(() => {
    (async function () {
      let taskData = {};
      setLoading(true);

      if (singleTask !== "create")
        taskData = await getTask(singleTask, theWorkspace);

      setLoading(false);
      theTaskDispatch({ type: "SET", payload: taskData });
    })();
  }, [singleTask]);

  const handleClose = () => {
    setSingleTask("");
  };

  const handleTitleChange = (e) => {
    theTaskDispatch({ type: "SET_TITLE", payload: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    theTaskDispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
  };

  const handleStatusChange = (e) => {
    theTaskDispatch({
      type: "SET_STATUS",
      payload: {
        id: taskStatuses[e.target.value].id,
        name: taskStatuses[e.target.value].title,
      },
    });
  };

  const handleassigneeChange = (assignee) => {
    theTaskDispatch({ type: "SET_ASSIGNEE", payload: assignee });
  };

  const handleProgressChange = (progress) => {
    theTaskDispatch({ type: "SET_PROGRESS", payload: progress });
  };

  const handleColleagesChange = (colleages) => {
    theTaskDispatch({ type: "SET_COLLEAGES", payload: colleages });
  };

  const handleTaskSave = async () => {
    const newData = {
      title: theTask.title,
      status: theTask.status.id,
      description: theTask.description,
      assignee: theTask?.assignee?.id,
      progress: theTask?.progress,
      colleagues: theTask.colleagues.map((item) => item.id),
    };

    setLoading(true);
    await updateTask(theTask.id, newData, theWorkspace);
    setRealoadList((state) => !state);
    setLoading(false);
    setTimeout(function () {
      setSingleTask("");
    }, 500);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(theTask.id, theWorkspace);
    setRealoadList((state) => !state);
    handleClose();
  };

  const handleTaskCreate = async () => {
    const newTaskTitle = theTask.title;
    const statusId =
      theTask?.status?.id ??
      Object.values(taskStatuses)?.find((item) => item.title === "شروع نشده")
        ?.id;
    const order = tasksCount + 1;

    setLoading(true);

    await createTask({
      newTaskTitle,
      statusId,
      theWorkspace,
      order,
    });
    setRealoadList((state) => !state);
    setSingleTask("");

    setLoading(false);
  };

  if (singleTask === "create") taskTitleRef?.current?.focus();

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      PaperProps={{ classes: { root: loading ? "loading " : "over-visible" } }}>
      <DialogTitle>
        <div className="d-flex no-wrap">
          <FormControl className="rtl-input p-relative w-100">
            <Input
              id="full-name"
              aria-describedby="my-helper-text"
              className="text-h5 py-1"
              value={theTask?.title ?? ""}
              onChange={handleTitleChange}
              placeholder="عنوان وظیفه..."
              inputRef={taskTitleRef}
            />
          </FormControl>
          <div className="mr-2" style={{ width: "150px" }}>
            <div className="text-h6">وضعیت</div>
            <FormControl
              id="task-stataus-select-wrap"
              fullWidth
              variant="standard">
              <Select
                labelId="task-stataus-select-label"
                id="task-stataus-select"
                value={
                  theTask?.status?.id ??
                  (taskStatuses &&
                    Object.values(taskStatuses)?.find(
                      (item) => item.title === "شروع نشده"
                    )?.id) ??
                  ""
                }
                label="وضعیت"
                onChange={handleStatusChange}
                className="text-body-2">
                {taskStatuses &&
                  Object.keys(taskStatuses).map((status) => {
                    return (
                      <MenuItem
                        key={taskStatuses[status].id}
                        value={taskStatuses[status].id}>
                        {taskStatuses[status].title}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogTitle>
      <DialogContent style={{ overflow: "visible" }}>
        <section className="d-flex">
          <Right
            description={theTask?.description}
            handleDescriptionChange={handleDescriptionChange}
          />
          <Left
            assignee={theTask?.assignee ?? ""}
            progress={theTask?.progress ?? ""}
            colleages={theTask?.colleagues ?? []}
            handleassigneeChange={handleassigneeChange}
            handleProgressChange={handleProgressChange}
            handleColleagesChange={handleColleagesChange}
          />
        </section>
      </DialogContent>
      <Devider line={true} spacing={0} />
      <DialogActions>
        {(singleTask !== "create" && (
          <>
            <TexedError
              onClick={handleDelete}
              style={{ marginLeft: "auto", padding: "6px" }}>
              <DeleteIcon />
            </TexedError>
            <TexedError onClick={handleClose}>لغو</TexedError>
            <TexedPrimary onClick={handleTaskSave}>به روز رسانی</TexedPrimary>
          </>
        )) || (
          <TexedPrimary
            disabled={(theTask?.title?.length ?? 0) === 0}
            onClick={handleTaskCreate}>
            افزودن
          </TexedPrimary>
        )}
      </DialogActions>
    </Dialog>
  );
}
