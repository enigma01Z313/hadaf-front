import React, { useState, useContext } from "react";
import { format } from "date-fns-jalali-3";

import updateNotification from "@/app/lib/notifications/update";
import workspaceContext from "@/app/context/workspaceContext";
import Devider from "../Devider";

import styles from "./style.module.css";

export default function NotifItem({ index, notif, setNotifs, setReloadList }) {
  const { theWorkspace } = useContext(workspaceContext);

  const handleNotifSee = async () => {
    await updateNotification(theWorkspace, notif.id, { status: "1" });

    setNotifs((state) => {
      const stateCp = JSON.parse(JSON.stringify(state));
      const targetIndex = stateCp.findIndex((item) => item.id === notif.id);
      stateCp[targetIndex].status.code = 1;

      console.log(stateCp);

      return stateCp;
    });
  };

  return (
    <>
      {index !== 0 && <Devider spacing={1} line={true} />}
      <article
        className={`px-2 py-1 d-flex cursor-pointer
            ${notif.status.code === 1 ? styles["read"] : ""}`}
        onClick={handleNotifSee}>
        <header className="d-flex align-center w-100 justify-between">
          <h5
            className="text-body-2 weight-500"
            style={{
              width: "calc(100% - 75px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
            {notif.title}
          </h5>
          <div className="text-caption">
            {format(notif.createdAt, "yyyy/M/dd")}
          </div>
        </header>
        <Devider line={true} color="#eee" />
        <p className="text-caption">{notif.content}</p>
      </article>
    </>
  );
}
