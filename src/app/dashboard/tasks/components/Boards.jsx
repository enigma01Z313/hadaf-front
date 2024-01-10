import React, { useEffect, useState, useContext } from "react";

import getTasksList from "@/app/lib/tasks/list";
import workspaceContext from "@/app/context/workspaceContext";
import styles from "./style.module.css";
import createTask from "@/app/lib/tasks/create";
import Dnd from "./Dnd";

export default function ListTable({
  reloadList,
  setRealoadList,
  setSingleTask,
  setColumns,
}) {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [createMode, setCreateMode] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { theWorkspace } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const tasksList = await getTasksList(theWorkspace);

      setColumns(tasksList.columns);
      setLoading(false);
      setTasks(tasksList);
    })();
    // }, []);
  }, [reloadList, theWorkspace]);

  const addNewTask = () =>
    new Promise(async (resolve, reject) => {
      const newTask = await createTask({
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
    <div
      className={`
        ${styles["static-cols-count"]}
        ${styles["task-gp-wrapper"]}
        ${loading ? "loading" : ""}`}>
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
        />
      )}
    </div>
  );
}
