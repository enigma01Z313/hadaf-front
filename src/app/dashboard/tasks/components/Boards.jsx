import React, { useEffect, useState, useRef, useContext } from "react";

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
import Task from "./Task";
import Dnd from "./Dnd";

export default function ListTable({ setMode, reloadList }) {
  const [tasks, setTasks] = useState({});
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [createMode, setCreateMode] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { theWorkspace } = useContext(workspaceContext);

  const sourceTaskId = useRef();
  const targetTaskId = useRef();
  const sourceBoardId = useRef();
  const targetBoardId = useRef();
  const setSourceTaskId = (val) => (sourceTaskId.current = val);
  const setTargetTaskId = (val) => (targetTaskId.current = val);
  const setSourceBoardId = (val) => (sourceBoardId.current = val);
  const setTargetBoardId = (val) => (targetBoardId.current = val);
  const getSourceTaskId = () => sourceTaskId.current;
  const getTargetTaskId = () => targetTaskId.current;
  const getSourceBoardId = () => sourceBoardId.current;
  const getTargetBoardId = () => targetBoardId.current;

  useEffect(() => {
    (async function () {
      const tasksList = await getTasksList(theWorkspace);
      console.log(tasksList);

      // setLoading(false);
      // setTasks(tasksList);
    })();
  }, []);

  const handleLocalReorder = () => {
    console.log("%c should update local ordering", "color: red");

    let newTasks = JSON.parse(JSON.stringify(tasks));

    if (sourceBoardId.current === targetBoardId.current) {
      const sourceTaskIndex = tasks[sourceBoardId.current].items.findIndex(
        (item) => item.id === sourceTaskId.current
      );
      const targetTaskIndex = tasks[targetBoardId.current].items.findIndex(
        (item) => item.id === targetTaskId.current
      );
      const boardTasks = newTasks[sourceBoardId.current].items;
      let newOrderedBoard = boardTasks;

      const min = Math.min(sourceTaskIndex, targetTaskIndex);
      const max = Math.max(sourceTaskIndex, targetTaskIndex);

      newOrderedBoard = boardTasks.map((item, index) => {
        if (index < min || index > max) return item;
        if (index === sourceTaskIndex)
          return { ...item, order: boardTasks[targetTaskIndex].order };
        if (index === targetTaskIndex)
          return { ...item, order: boardTasks[sourceTaskIndex].order };
      });

      newTasks[sourceBoardId.current].items = newOrderedBoard;
      setTasks(newTasks);
      console.log("%c new board", "color: orange");
      console.log(newTasks);
    }
  };
  // }, [reloadList, theWorkspace]);

  const addNewTask = async () => {
    const newTask = await createTask({ newTaskTitle, createMode });

    // console.log('1-------------------------------------');
    // console.log(newTask);
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
      {Object.keys(tasks).map((boardId) => {
        const taskGp = tasks[boardId];

        return (
          <>
          bbbb
            {/* <article
            key={boardId}
            className={`wrapper-box p-0 ${styles["task-gp"]}`}>
            <h2 className="p-1 text-h6 weight-500">{taskGp.name}</h2>
            <Devider line={true} spacing={0} />
            <section className={`p-1 ${styles["tasks-wrapper"]}`}>
              {taskGp.items
                .sort((a, b) => b.order - a.order)
                .map((task) => (
                  <Task
                    key={task.id}
                    boardId={boardId}
                    task={task}
                    setSourceTaskId={setSourceTaskId}
                    setTargetTaskId={setTargetTaskId}
                    getSourceTaskId={getSourceTaskId}
                    getTargetTaskId={getTargetTaskId}
                    setSourceBoardId={setSourceBoardId}
                    setTargetBoardId={setTargetBoardId}
                    getSourceBoardId={getSourceBoardId}
                    getTargetBoardId={getTargetBoardId}
                    handleLocalReorder={handleLocalReorder}
                  />
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
          </article> */}
            <article>
              aaaa
            </article>
          </>
        );
      })}
      <Dnd />
    </div>
  );
}
