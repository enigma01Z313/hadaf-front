import React from "react";

import Link from "next/link";
import ContainedPrimary from "../Button/ContainedPrimary";

import NotifItem from "./NotifItem";
import styles from "./style.module.css";

export default function NotificationsList({
  notifs,
  setNotifs,
  setReloadList,
  setShowNotifs,
}) {
  return (
    <ul
      className={`wrapper-box p-0 py-1 ${styles["notifs-list"]}`}
      style={{ maxHeight: "300px", overflow: "scroll" }}
      onMouseLeave={() => setShowNotifs(false)}>
      {notifs.map((item, index) => (
        <NotifItem
          key={item.id}
          index={index}
          notif={item}
          setNotifs={setNotifs}
          setReloadList={setReloadList}
        />
      ))}
      {/* <div className="px-1">
        <Link href="/dashboard/notifications">
          <ContainedPrimary className={"w-100 justify-center"}>
            مشاهده همه
          </ContainedPrimary>
        </Link>
      </div> */}
    </ul>
  );
}
