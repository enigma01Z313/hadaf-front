import React, { useEffect, useState, useContext } from "react";

import AddIcon from "@mui/icons-material/Add";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import getTasksList from "@/app/lib/tasks/list";
import workspaceContext from "@/app/context/workspaceContext";
import Devider from "@/app/components/Devider";
import styles from "./style.module.css";
import { TextField } from "@mui/material";

export default function ListTable({ setMode, reloadList }) {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

  const [createMode, setCreateMode] = useState(false);
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

  return (
    <div
      className={`
        ${styles["static-cols-count"]}
        ${styles["task-gp-wrapper"]}
        ${loading ? "loading" : ""}`}>
      {Object.keys(tasks).map((tasksGpId) => {
        const taskGp = tasks[tasksGpId];

        console.log(taskGp);

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
              {/* {(!createMode && (
                <ContainedPrimary
                  size="small"
                  onClick={() => {
                    setCreateMode(true);
                  }}>
                  <AddIcon className="ml-0-5" style={{ fontSize: "16px" }} />
                  افزودن
                </ContainedPrimary>
              )) || <TextField placeholder="افزودن وظیفه جدید" />} */}
              <ContainedPrimary
                  size="small"
                  disabled={true}>
                  <AddIcon className="ml-0-5" style={{ fontSize: "16px" }} />
                  افزودن
                </ContainedPrimary>
            </div>
          </article>
        );
      })}
    </div>
  );
}
