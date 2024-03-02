import React, { useState, useEffect, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Devider from "@/app/components/Devider";
import TexedInherit from "@/app/components/Button/TexedInherit";

import styles from "./style.module.css";

export default function Repeat({ repeat, handleRepeatChange, className }) {
  const repeatTypes = JSON.parse(localStorage.getItem("meta")).repeatTask;
  const [isEditting, setIsEditting] = useState(false);

  console.log(repeatTypes);

  return (
    <div className={styles["task-config"]}>
      <div
        onClick={() => setIsEditting(true)}
        className={`${className} wrapper-box2 cursor-pointer`}
      >
        تکرار: {repeat.label}
      </div>

      {isEditting && (
        <>
          <div
            className={styles["fixed-overlay"]}
            onClick={() => {
              setIsEditting(false);
            }}
          ></div>
          <article className={`wrapper-box ${styles["config-box"]}`}>
            <TexedInherit
              onClick={() => setIsEditting(false)}
              className={`p-1 ${styles["close-config"]}`}
            >
              <CloseIcon style={{ fontSize: "18px" }} />
            </TexedInherit>
            <header className="w-100 text-center mt-1">دوره تکرار</header>
            <Devider line={true} />
            <section className="pt-1">
              <div className={`py-1 ${styles["assignee-users"]}`}>
                {repeatTypes.map((repeatType) => (
                  <div
                    key={repeatType.code}
                    className={`text-subtitle-3 p-1 d-flex justify-between no-wrap 
                      ${styles["assignee-user"]}
                      ${repeatType.code === repeat ? styles["checked"] : ""}`}
                  >
                    {repeatType.label}
                  </div>
                ))}
                {/* {workspaceUsers.data
                  .filter((user) => user.isFiltered)
                  .map((user) => (
                    <div
                      className={`text-subtitle-3 p-1 d-flex justify-between no-wrap 
                      ${styles["assignee-user"]}
                      ${assignee.id === user.id ? styles["checked"] : ""}`}
                      key={user.id}>
                      <div
                        onClick={() => {
                          handleassigneeChange({
                            id: user.id,
                            fullName: user.fullName,
                          });
                          setIsEditting(false);
                        }}>
                        {user.fullName} ({user.email})
                      </div>
                      {assignee.id === user.id && <CheckIcon />}
                    </div>
                  ))} */}
              </div>
            </section>
          </article>
        </>
      )}
    </div>
  );
}
