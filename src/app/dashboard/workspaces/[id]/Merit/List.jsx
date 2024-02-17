import React from "react";

import MeritItem from "./MeritItem";
import styles from "./style.module.css"

export default function List({
  merits,
  setSingle,
  setLoading,
  setReloadList,
}) {
  return (
    <div className={`d-flex w-100 ${styles['merits-list']}`}>
      {merits.map((merit) => (
        <MeritItem
          key={merit.id}
          merit={merit}
          setSingle={setSingle}
          setLoading={setLoading}
          setReloadList={setReloadList}
        />
      ))}
    </div>
  );
}
