import React from "react";

import Item from "./Item";

export default function List({
  tasks,
  statusFilter,
  keyResults,
  setRealoadList,
  finishedStatus,
  notFinishedStatus,
  stoppedStatus,
}) {
  return (
    <>
      {(tasks.length === 0 && (
        <div className="d-flex py-1">اقد امکی ثبت نشده</div>
      )) || (
        <div>
          {tasks
            .filter((item) =>
              statusFilter === "all"
                ? item.status.id !== stoppedStatus
                : item.status.id === statusFilter
            )
            .map((task) => (
              <Item
                key={task.id}
                task={task}
                keyResults={keyResults}
                setRealoadList={setRealoadList}
                finishedStatus={finishedStatus}
                notFinishedStatus={notFinishedStatus}
                stoppedStatus={stoppedStatus}
              />
            ))}
        </div>
      )}
    </>
  );
}
