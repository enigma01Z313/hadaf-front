import React, { useEffect, useState, useContext } from "react";

import getTasksList from "@/app/lib/tasks/list";
import workspaceContext from "@/app/context/workspaceContext";
import styles from "./style.module.css";
import createTask from "@/app/lib/tasks/create";
import Dnd from "./Dnd";
import Header from "./Header";
import TasksRowMode from "./TasksRowMode";

export default function ListTable({
  reloadList,
  setRealoadList,
  setSingleTask,
  setColumns,
  setTasksCount,
  filteredUser,
  filteredMeMode,
}) {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [createMode, setCreateMode] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [viewMode, setViewMode] = useState(
    window.innerWidth >= 1200 ? "column" : "row"
  );

  const { theWorkspace } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const tasksList =
        theWorkspace.length !== 0
          ? await getTasksList(theWorkspace, filteredUser)
          : [];

      setTasksCount(tasksList?.length ?? 0);
      setColumns(tasksList.columns);
      setLoading(false);
      setTasks(tasksList);
    })();
    // }, []);
  }, [reloadList, theWorkspace, viewMode, filteredUser]);

  const addNewTask = (order) =>
    new Promise(async (resolve, reject) => {
      const newTask = await createTask({
        order,
        newTaskTitle,
        statusId: createMode,
        theWorkspace,
      });

      setRealoadList((state) => !state);
      setCreateMode("");
      resolve();
    });

  const cancelAdd = () => {
    setCreateMode("");
    setNewTaskTitle("");
  };

  return (
    <>
      <div>
        <Header viewMode={viewMode} setViewMode={setViewMode} />
        {(viewMode === "column" && (
          <div
            className={`
            ${styles["static-cols-count"]}
            ${styles["task-gp-wrapper"]}
            ${loading ? "loading" : ""}`}
          >
            {Object.keys(tasks).length !== 0 && (
              <Dnd
                createMode={createMode}
                setCreateMode={setCreateMode}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                cancelAdd={cancelAdd}
                addNewTask={addNewTask}
                tasksList={tasks}
                setTasks={setTasks}
                setSingleTask={setSingleTask}
                setRealoadList={setRealoadList}
                filteredMeMode={filteredMeMode}
              />
            )}
          </div>
        )) ||
          (viewMode === "row" && (
            <TasksRowMode
              tasks={tasks}
              setSingleTask={setSingleTask}
              loading={loading}
            />
          ))}
      </div>
    </>
  );
}
