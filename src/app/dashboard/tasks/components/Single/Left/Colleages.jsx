import React, { useState, useEffect, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Devider from "@/app/components/Devider";
import TexedInherit from "@/app/components/Button/TexedInherit";
import workspaceContext from "@/app/context/workspaceContext";
import getUsersList from "@/app/lib/users/list";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./style.module.css";

export default function Colleages({
  colleages,
  className,
  handleColleagesChange,
}) {
  const { theWorkspace } = useContext(workspaceContext);

  const [isEditting, setIsEditting] = useState(false);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);

  useEffect(() => {
    (async function () {
      const usersList = await getUsersList(theWorkspace);
      setWorkspaceUsers({
        ...usersList,
        data: usersList.data.map((user) => ({ ...user, isFiltered: true })),
      });
    })();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    const newUsers = workspaceUsers.data.map((user) => ({
      ...user,
      isFiltered:
        val === "" ||
        (val !== "" &&
          (user.fullName.includes(val) || user.email.includes(val))),
    }));

    setWorkspaceUsers((state) => ({ ...state, data: newUsers }));
  };

  const handleColleagesUpdate = (userId, userFullname) => {
    let newColleags = [...colleages];

    if (newColleags.filter((item) => item.id === userId).length === 0)
      newColleags.push({ id: userId, fullName: userFullname });
    else newColleags = newColleags.filter((item) => item.id !== userId);

    handleColleagesChange(newColleags);
  };

  return (
    <div className={styles["task-config"]}>
      <div
        onClick={() => setIsEditting(true)}
        className={`${className} wrapper-box2 cursor-pointer`}>
        همکاران: {colleages.length === 0 ? '-' : colleages.length+' نفر'}
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
                onChange={handleSearch}
                inputProps={{ className: "text-subtitle-3" }}
              />

              <div className={`py-1 ${styles["assignee-users"]}`}>
                {workspaceUsers.data
                  .filter((user) => user.isFiltered)
                  .map((user) => (
                    <div
                      className={`text-subtitle-3 p-1 d-flex justify-between no-wrap 
                      ${styles["assignee-user"]}
                      ${
                        colleages.map((item) => item.id).includes(user.id)
                          ? styles["checked"]
                          : ""
                      }
                      `}
                      key={user.id}>
                      <div
                        onClick={() => {
                          handleColleagesUpdate(user.id, user.fullName);
                        }}>
                        {user.fullName} ({user.email})
                      </div>
                      {colleages.map((item) => item.id).includes(user.id) && (
                        <CheckIcon />
                      )}
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
