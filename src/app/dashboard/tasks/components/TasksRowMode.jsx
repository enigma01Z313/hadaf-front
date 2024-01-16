import React from "react";

import styles from "./style.module.css";

export default function TasksRowMode({ tasks: { tasks } }) {
  console.log("1111111111111111111111");
  console.log(tasks);

  return (
    <>
      {tasks && (
        <section className={`mt-2 ${styles["tasks-row"]}`}>
          {Object.keys(tasks).map((taskId) => {
            const theTask = tasks[taskId];

            return (
              <article key={taskId} className="wrapper-box mb-2">
                <header className="d-flex justify-between align-center">
                  <h4 className="text-h5">{tasks[taskId].title}</h4>
                  <h5 className="ext-subtitle-1">
                    وضعیت: {tasks[taskId].status.name}
                  </h5>
                </header>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}
