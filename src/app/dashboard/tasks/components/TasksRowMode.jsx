import React, { useState, useContext } from "react";

import { format } from "date-fns-jalali-3";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import styles from "./style.module.css";
import Devider from "@/app/components/Devider";
import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IOSSlider from "@/app/components/Shared/IOSSlider";
import PerfectScrollbar from "react-perfect-scrollbar";

import workspaceContext from "@/app/context/workspaceContext";

import updateTask from "@/app/lib/tasks/update";

export default function TasksRowMode({
  tasks: { tasks },
  setSingleTask,
  loading,
}) {
  const { theWorkspace } = useContext(workspaceContext);
  const [searchTerm, setSeartTerm] = useState("");

  const handleCommit = async (e, taskId) => {
    const progress = +e.target.innerText;

    await updateTask(taskId, { progress }, theWorkspace);
  };

  return (
    <>
      {tasks && (
        <section
          className={`mt-2 wrapper-box 
          ${styles["tasks-row"]}
          ${loading ? "loading" : ""}`}
        >
          <header className="d-flex justify-between align-center">
            <div
              className={`d-flex align-center ${styles["row-search-wrapper"]}`}
            >
              <Input
                placeholder="جستجو..."
                value={searchTerm}
                onChange={(e) => setSeartTerm(e.target.value)}
              />
              <SearchIcon />
            </div>
            <ContainedPrimary onClick={() => setSingleTask("create")}>
              افزودن
            </ContainedPrimary>
          </header>
          <Devider spacing={2} line={true} />
          <section id="tasks-row-view-wrapper">
            <PerfectScrollbar style={{ maxHeight: "calc(100vh - 300px)" }}>
              <div className="px-2">
                {Object.keys(tasks)
                  .filter((taskId) => {
                    const theTask = tasks[taskId];

                    return theTask.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  })
                  .map((taskId, index) => {
                    const theTask = tasks[taskId];

                    return (
                      <article
                        key={theTask.id}
                        className={`${index !== 0 ? "mt-2" : ""} p-2 
                          ${styles["task-row-article"]}`}
                      >
                        <header
                          className={`d-flex justify-between align-center mb-2 cursor-pointer`}
                          onClick={() => setSingleTask(theTask.id)}
                        >
                          <span className="d-flex align-center">
                            <h4 className="text-h5 weight-500">
                              {theTask.title}
                            </h4>
                            <h5 className="mr-2">
                              تاریخ سررسید:{" "}
                              {(theTask.dueDate &&
                                !Object.is(null, theTask.dueDate) &&
                                !Object.is(null, theTask.dueDate) &&
                                `(${format(
                                  new Date(theTask.dueDate),
                                  "yyyy/MM/dd"
                                )})`) ||
                                "-"}
                            </h5>
                          </span>
                          <h5 className="ext-subtitle-1 weight-500">
                            وضعیت: {theTask.status.name}
                          </h5>
                        </header>
                        <IOSSlider
                          key={`slider-${theTask.progress}`}
                          aria-label="ios slider"
                          defaultValue={theTask.progress ?? 0}
                          valueLabelDisplay="on"
                          onChangeCommitted={(e) => handleCommit(e, theTask.id)}
                        />
                      </article>
                    );
                  })}
              </div>
            </PerfectScrollbar>
          </section>
        </section>
      )}
    </>
  );
}
