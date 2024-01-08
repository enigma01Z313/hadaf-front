import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { DragDropContext } from "react-beautiful-dnd";

import styles from "./style.module.css";

const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
    7: { id: 7, content: "Create page layout" },
    8: { id: 8, content: "Create page layout" },
    9: { id: 9, content: "Create page layout" },
    10: { id: 10, content: "Create page layout" },
    11: { id: 11, content: "Create page layout" },
    12: { id: 12, content: "Create page layout" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 4, 5, 10, 11, 12],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [7, 8, 9],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [3, 6],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const Column = dynamic(() => import("./Column"), { ssr: false });

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export default function Dnd({
  createMode,
  setCreateMode,
  newTaskTitle,
  setNewTaskTitle,
  cancelAdd,
  addNewTask,
  tasksList,
  setTasks,
  setSingleTask,
}) {
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = tasksList.columns[source.droppableId];
    const destinationCol = tasksList.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...tasksList,
        columns: {
          ...tasksList.columns,
          [newColumn.id]: newColumn,
        },
      };
      setTasks(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...tasksList,
      columns: {
        ...tasksList.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setTasks(newState);
  };

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`d-flex w-100 justify-between ${styles["boards-wrap"]}`}>
        {tasksList.columnOrder.map((columnId) => {
          const column = tasksList.columns[columnId];
          const tasks = column.taskIds.map((taskId) => tasksList.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              createMode={createMode}
              setCreateMode={setCreateMode}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              cancelAdd={cancelAdd}
              addNewTask={addNewTask}
              setSingleTask={setSingleTask}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
