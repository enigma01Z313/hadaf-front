import React, { useState, useRef, useEffect } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import Devider from "@/app/components/Devider";
import TextedInfo from "@/app/components/Button/TextedInfo";
import TexedError from "@/app/components/Button/TextedError";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

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
}) => {
  const [loading, setLoading] = useState(false);
  const newTaskRef = useRef();
  const theUser = JSON.parse(localStorage.getItem("user"));

  const handleNewTaskAdd = async () => {
    setLoading(true);
    await addNewTask(tasks.length);
    setNewTaskTitle("");
    setLoading(false);
  };

  useEffect(() => {
    if (createMode !== "") newTaskRef?.current?.focus();
  }, [createMode]);

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
                      onClick={() => setSingleTask(task.id)}
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
                      {task.tags.map((tag) => (
                        <div
                          key={tag.id}
                          className="tag-line"
                          style={{ "--bg-color": tag.color }}
                        ></div>
                      ))}
                      <span>{task.title}</span>
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
