import React, { useContext, useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import workspaceContext from "@/app/context/workspaceContext";

import NotificationsList from "./NotificationsList";

import getNotifications from "@/app/lib/notifications/list";

import styles from "./style.module.css";

export default function Notifications() {
  const { theWorkspace, theNotifications, setTheNotifications } =
    useContext(workspaceContext);
  const [notifs, setNotifs] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [reloadList, setReloadList] = useState(true);

  useEffect(() => {
    if (theWorkspace && theNotifications.time < new Date()) {
      (async function () {
        const notificationsList = await getNotifications(theWorkspace);

        const tmpArr1 = [];
        const tmpArr2 = [];
        notificationsList.forEach((item) => {
          if (item.status.code === 0) tmpArr1.push(item);
          else tmpArr2.push(item);
        });

        setTheNotifications({ time: new Date(), data: notificationsList });
        setNotifs([...tmpArr1, ...tmpArr2]);
      })();
    }
  }, [theWorkspace, reloadList]);

  return (
    <div className="p-relative d-flex align-center cursor-pointer">
      <NotificationsNoneIcon
        style={{ fontSize: "26px" }}
        onClick={() => setShowNotifs(true)}
      />
      <div
        className={styles["notif-count"]}
        onClick={() => setShowNotifs(true)}>
        {notifs ? notifs.filter((item) => item.status.code === 0).length : "-"}
      </div>
      {showNotifs && (
        <NotificationsList
          notifs={notifs}
          setNotifs={setNotifs}
          setReloadList={setReloadList}
          setShowNotifs={setShowNotifs}
        />
      )}
    </div>
  );
}
