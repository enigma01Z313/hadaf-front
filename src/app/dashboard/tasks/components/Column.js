import React, { useState } from "react";

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
}) => {
  const [loading, setLoading] = useState(false);

  const handleNewTaskAdd = async () => {
    setLoading(true);
    await addNewTask();
    setNewTaskTitle("");
    setLoading(false);
  };

  return (
    <div
      className={`wrapper-box p-0 d-flex direction-column
        ${loading ? "loading" : ""}`}>
      <h2 className="p-1 text-h6 weight-500">{column.title}</h2>

      <Devider line={true} spacing={0} />

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className="grow-1 px-1 py-3"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    onClick={() => setSingleTask(task.id)}
                    className={`p-1 mb-1 ${styles["task-item"]}`}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}>
                    <span>{task.title}</span>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
      <Devider line={true} spacing={0} />
      <div className="p-1">
        {((createMode === "" || column.id !== createMode) && (
          <ContainedPrimary
            size="small"
            onClick={() => {
              setNewTaskTitle("");
              setCreateMode(column.id);
            }}>
            <AddIcon className="ml-0-5" style={{ fontSize: "16px" }} />
            افزودن
          </ContainedPrimary>
        )) || (
          <div className="d-flex no-wrap align-center">
            <TextField
              value={newTaskTitle}
              onChange={(e) => {
                setNewTaskTitle(e.target.value);
              }}
              className={styles["add-task-field"]}
              placeholder="افزودن وظیفه جدید"
            />
            <TexedError
              size="extra-small"
              style={{ width: "40px", height: "40px", padding: "0 8px" }}
              onClick={() => cancelAdd()}>
              <ClearIcon />
            </TexedError>
            <TextedInfo
              size="extra-small"
              style={{ width: "40px", height: "40px", padding: "0 8px" }}
              onClick={handleNewTaskAdd}>
              <CheckIcon />
            </TextedInfo>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
