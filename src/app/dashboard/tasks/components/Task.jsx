import React, { useEffect, useState } from "react";

import styles from "./style.module.css";

export default function Task({
  boardId,
  task,
  setSourceTaskId,
  setTargetTaskId,
  getSourceTaskId,
  getTargetTaskId,
  setSourceBoardId,
  setTargetBoardId,
  getSourceBoardId,
  getTargetBoardId,
  handleLocalReorder,
}) {
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDragging, setMouseDragging] = useState(false);

  const handleMouseDown = (id) => {
    setMouseDown(true);
    setSourceTaskId(id);
  };

  const handleMouseUp = () => {
    // console.log("1-mouse down-------------------------");
    // console.log(mouseDown, mouseDragging, sourceTaskId);

    setMouseDragging(false);
    if (!mouseDragging) {
      console.log(`should open task: ${getSourceTaskId()}`);
      setMouseDown(false);
    }
  };

  const handleMouseMove = () => {
    // console.log("1-mouse moving-------------------------");
    // console.log(mouseDown);
    if (mouseDown) setMouseDragging(true);
  };

  const handleDragStart = (taskId, boardId) => {
    setSourceBoardId(boardId)
  }

  const handleDragEnd = () => {
    console.log("drag end");
    console.log(getSourceTaskId());
    console.log(getTargetTaskId());
    console.log("should update reorder of tasks");

    setSourceTaskId("");
    setMouseDragging(false);
    setMouseDown(false);
  };

  const handleDragEnter = (taskId, boardId) => {
    setMouseDragging(false)
    setTargetTaskId(taskId)
    setTargetBoardId(boardId)
    handleLocalReorder()
  }

  return (
    <div
      draggable={mouseDragging}
      onDragStart={() => handleDragStart(task.id, boardId)}
      onDragEnd={() => handleDragEnd()}
      onDragEnter={() => handleDragEnter(task.id, boardId)}
      onMouseDown={() => handleMouseDown(task.id)}
      onMouseUp={() => handleMouseUp()}
      onMouseMove={handleMouseMove}
      className={`p-1 mb-1 ${styles["task"]}`}>
      {task.title}
    </div>
  );
}
