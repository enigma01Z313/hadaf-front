import React, { useEffect, useState, useContext } from "react";
import dynamic from "next/dynamic";

import { DragDropContext } from "react-beautiful-dnd";

import styles from "./style.module.css";
import updateTask from "@/app/lib/tasks/update";
import reorderTasks from "@/app/lib/tasks/reorder";
import workspaceContext from "@/app/context/workspaceContext";

const Column = dynamic(() => import("./Column"), { ssr: false });

const reorderColumnList = (sourceCol, startIndex, endIndex,) => {
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
  setRealoadList,
  filteredMeMode,
}) {
  const { theWorkspace } = useContext(workspaceContext);

  const onDragEnd = async (result) => {
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

      const newTasksOrder = newColumn.taskIds.map((v, i) => ({
        id: v,
        order: i,
      }));

      setTasks(newState);
      await reorderTasks({ workspaceId: theWorkspace, data: newTasksOrder });
      setRealoadList(state => !state)
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

    const newTasksOrder = newEndCol.taskIds.map((v, i) => {
      const newOrder = { id: v, order: i };
      if (v === endTaskIds[destination.index])
        newOrder.status = destination.droppableId;

      return newOrder;
    });

    setTasks(newState);
    await reorderTasks({ workspaceId: theWorkspace, data: newTasksOrder });
    setRealoadList(state => !state)
  };

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`d-flex w-100 justify-between align-start
        ${styles["boards-wrap"]}`}>
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
              filteredMeMode={filteredMeMode}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
