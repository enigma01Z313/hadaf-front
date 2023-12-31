import React, { useEffect, useState, useContext } from "react";

import AddIcon from "@mui/icons-material/Add";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import getTasksList from "@/app/lib/tasks/list";
import workspaceContext from "@/app/context/workspaceContext";
import Devider from "@/app/components/Devider";
import styles from "./style.module.css";
import { TextField } from "@mui/material";
import TextedInfo from "@/app/components/Button/TextedInfo";
import TexedError from "@/app/components/Button/TextedError";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import createTask from "@/app/lib/tasks/create";

export default function ListTable({ setMode, reloadList }) {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

  const [createMode, setCreateMode] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { theWorkspace } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const tasksList = await getTasksList(theWorkspace);

      setLoading(false);
      setTasks(tasksList);
    })();
  }, []);
  // }, [reloadList, theWorkspace]);

  const addNewTask = async () => {
    const newTask = await createTask({ newTaskTitle, createMode });

    console.log('1-------------------------------------');
    console.log(newTask);
  };

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
      {Object.keys(tasks).map((tasksGpId) => {
        const taskGp = tasks[tasksGpId];

        return (
          <article
            key={tasksGpId}
            className={`wrapper-box p-0 ${styles["task-gp"]}`}>
            <h2 className="p-1 text-h6 weight-500">{taskGp.name}</h2>
            <Devider line={true} spacing={0} />
            <section className={`p-1 ${styles["tasks-wrapper"]}`}>
              {taskGp.items.map((task) => (
                <div className={`p-1 mb-1 ${styles["task"]}`} key={task.id}>
                  {task.title}
                </div>
              ))}
            </section>
            <Devider line={true} spacing={0} />
            <div className="p-1">
              {((createMode === "" || tasksGpId !== createMode) && (
                <ContainedPrimary
                  size="small"
                  onClick={() => {
                    setNewTaskTitle("");
                    setCreateMode(tasksGpId);
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
                    onClick={() => addNewTask()}>
                    <CheckIcon />
                  </TextedInfo>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
