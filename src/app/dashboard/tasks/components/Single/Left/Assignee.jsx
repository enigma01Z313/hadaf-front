import React, { useState, useEffect, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Devider from "@/app/components/Devider";
import TexedInherit from "@/app/components/Button/TexedInherit";
import workspaceContext from "@/app/context/workspaceContext";
import getUsersList from "@/app/lib/users/list";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./style.module.css";

export default function Assignee({ assignee, className, handleassigneeChange }) {
  const [isEditting, setIsEditting] = useState(false);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);

  const { theWorkspace } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const usersList = await getUsersList(theWorkspace);
      setWorkspaceUsers(usersList);
    })();
  }, []);

  return (
    <div className={styles["task-config"]}>
      <div
        onClick={() => setIsEditting(true)}
        className={`${className} wrapper-box2 cursor-pointer`}>
        منصوب به: {assignee.fullName}
      </div>

      {isEditting && (
        <>
          <div
            className={styles["fixed-overlay"]}
            onClick={() => {
              setIsEditting(false);
            }}></div>
          <article className={`wrapper-box ${styles["config-box"]}`}>
            <TexedInherit
              onClick={() => setIsEditting(false)}
              className={`p-1 ${styles["close-config"]}`}>
              <CloseIcon style={{ fontSize: "18px" }} />
            </TexedInherit>
            <header className="w-100 text-center mt-1">اعضا</header>
            <Devider line={true} />
            <section className="pt-1">
              <TextField
                className="w-100"
                variant="standard"
                placeholder="جستجو اعضا..."
              />
              <div className={`py-1 ${styles["assignee-users"]}`}>
                {workspaceUsers.data.map((user) => (
                  <div
                    className={`p-1 d-flex justify-between no-wrap
                      ${styles["assignee-user"]}
                      ${assignee.id === user.id ? styles["checked"] : ""}`}
                    key={user.id}>
                    <div
                      onClick={() => {
                        handleassigneeChange({
                          id: user.id,
                          fullName: user.fullName,
                        });
                      }}>
                      {user.fullName} ({user.email})
                    </div>
                    {assignee.id === user.id && <CheckIcon />}
                  </div>
                ))}
              </div>
            </section>
          </article>
        </>
      )}
    </div>
  );
}
