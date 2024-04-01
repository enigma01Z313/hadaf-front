import React, { useState, useRef, useEffect, useContext } from "react";

import { format } from "date-fns-jalali-3";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";

import workspaceContext from "@/app/context/workspaceContext";

import Devider from "@/app/components/Devider";
import TextedInfo from "@/app/components/Button/TextedInfo";
import TexedError from "@/app/components/Button/TextedError";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import updateTask from "@/app/lib/tasks/update";

import styles from "./style.module.css";

const Column = ({
  column,
  tasks,
  createMode,
  setCreateMode,
  newTaskTitle,
  setNewTaskTitle,
  cancelAdd,
  addNewTask,
  setSingleTask,
  filteredMeMode,
  taskStatuses,
  setRealoadList,
}) => {
  const { theWorkspace } = useContext(workspaceContext);
  const [loading, setLoading] = useState(false);

  const newTaskRef = useRef();
  const theUser = JSON.parse(localStorage.getItem("user"));
  const finishedStatusId = taskStatuses.find(
    (item) => item.name === "انجام شده"
  )?.id;
  const currentStatusId = taskStatuses.find(
    (item) => item.name === "در حال انجام"
  )?.id;
  const notStartStatusId = taskStatuses.find(
    (item) => item.name === "شروع نشده"
  )?.id;
  const stoppedStatusId = taskStatuses.find(
    (item) => item.name === "متوقف شده"
  )?.id;

  const handleNewTaskAdd = async () => {
    setLoading(true);
    await addNewTask(tasks.length);
    setNewTaskTitle("");
    setLoading(false);
  };

  useEffect(() => {
    if (createMode !== "") newTaskRef?.current?.focus();
  }, [createMode]);

  const handleCheckBox = async (taskStatuses, task) => {
    let newStatus, newProgress;

    if (
      task.status.id === currentStatusId ||
      task.status.id === notStartStatusId
    ) {
      newProgress = 100;
      newStatus = finishedStatusId;
    } else if (task.status.id === finishedStatusId) {
      newProgress = 0;
      newStatus = notStartStatusId;
    }

    console.log(task);
    // setLoading(true);
    // await updateTask(
    //   task.id,
    //   { progress: newProgress, status: newStatus },
    //   theWorkspace
    // );
    // setRealoadList((state) => !state);
    // setLoading(false);
  };

  return (
    <div
      className={`wrapper-box p-0 d-flex direction-column no-wrap
        ${loading ? "loading" : ""}`}
      style={{ maxHeight: "calc(100vh - 75px - 48px)" }}
    >
      <h2 className="p-1 text-h6 weight-500">{column.title}</h2>

      <Devider line={true} spacing={0} />
      <PerfectScrollbar
        style={{ maxHeight: "calc(100vh - 75px - 48px - 100px)" }}
      >
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="grow-1 px-1 py-3"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      className={`p-1 mb-1 d-flex ${styles["task-item"]}
                        ${
                          filteredMeMode &&
                          !(
                            theUser.id === task?.assignee?.id ||
                            task.colleagues
                              ?.map((item) => item.id)
                              .includes(theUser.id)
                          ) &&
                          "d-none"
                        }`}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <div className="d-flex align-center w-100">
                        <div
                          className={`fake-checkbox ml-1
                            ${finishedStatusId === task.status.id ? "checked" : ""}
                            ${
                              stoppedStatusId === task.status.id
                                ? "disabled"
                                : ""
                            }
                            `}
                          onClick={() => {
                            handleCheckBox(taskStatuses, task);
                          }}
                        ></div>

                        {task.tags.map((tag) => (
                          <div
                            key={tag.id}
                            className="tag-line"
                            style={{ "--bg-color": tag.color }}
                          ></div>
                        ))}

                        <span
                          className="grow-1"
                          onClick={() => setSingleTask(task.id)}
                        >
                          {task.title}
                        </span>

                        {task.dueDate && (
                          <span
                            className="d-flex align-center"
                            style={{ fontSize: "12px" }}
                          >
                            <CalendarMonthIcon
                              className="ml-0-5"
                              style={{ fontSize: "15px" }}
                            />
                            {format(new Date(task.dueDate), "yyyy/MM/dd")}
                          </span>
                        )}

                        {(task.assignee || task.repeat) && (
                          <>
                            <Devider spacing={1} line={true} />
                            <div className="d-flex justify-between w-100">
                              <span
                                className="d-flex align-center"
                                style={{ fontSize: "14px" }}
                              >
                                {task.repeat && (
                                  <>
                                    <UpdateIcon
                                      className="ml-0-5"
                                      style={{ fontSize: "15px" }}
                                    />
                                    {task.repeat.label}
                                  </>
                                )}
                              </span>

                              <span
                                className="d-flex align-center"
                                style={{ fontSize: "14px" }}
                              >
                                {task.assignee && (
                                  <>
                                    <PersonIcon
                                      className="ml-0-5"
                                      style={{ fontSize: "15px" }}
                                    />
                                    {task.assignee?.fullName}
                                  </>
                                )}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </PerfectScrollbar>
      <Devider line={true} spacing={0} />
      <div className="p-1">
        {((createMode === "" || column.id !== createMode) && (
          <ContainedPrimary
            size="small"
            onClick={() => {
              setNewTaskTitle("");
              setCreateMode(column.id);
            }}
          >
            <AddIcon className="ml-0-5" style={{ fontSize: "16px" }} />
            افزودن
          </ContainedPrimary>
        )) || (
          <div className="d-flex no-wrap align-center">
            <TextField
              className={styles["add-task-field"]}
              placeholder="افزودن اقدامک جدید"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNewTaskAdd()}
              inputProps={{
                ref: newTaskRef,
              }}
            />
            <TexedError
              size="extra-small"
              style={{ width: "40px", height: "40px", padding: "0 8px" }}
              onClick={() => cancelAdd()}
            >
              <ClearIcon />
            </TexedError>
            <TextedInfo
              size="extra-small"
              style={{ width: "40px", height: "40px", padding: "0 8px" }}
              onClick={handleNewTaskAdd}
            >
              <CheckIcon />
            </TextedInfo>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
