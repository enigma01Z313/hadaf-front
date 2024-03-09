import React, { useState, useEffect, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import TexedInherit from "@/app/components/Button/TexedInherit";
import CheckIcon from "@mui/icons-material/Check";

import workspaceContext from "@/app/context/workspaceContext";

import Devider from "@/app/components/Devider";
import styles from "./style.module.css";

import getUsersList from "@/app/lib/users/list";
import getTeams from "@/app/lib/workspaces/team/list";

export default function Assignee({
  assignee,
  className,
  handleassigneeChange,
}) {
  const { theWorkspace } = useContext(workspaceContext);

  const [isEditting, setIsEditting] = useState(false);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);
  const [workspaceTeams, setWorkspaceTeams] = useState([]);

  useEffect(() => {
    (async function () {
      const usersList = await getUsersList(theWorkspace);
      const teamsList = await getTeams(theWorkspace);

      setWorkspaceUsers({
        ...usersList,
        data: usersList.data.map((user) => ({ ...user, isFiltered: true })),
      });
      // setWorkspaceTeams({
      //   ...teamsList,
      //   data: teamsList.data.map((user) => ({ ...user, isFiltered: true })),
      // });
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

  return (
    <div className={styles["task-config"]}>
      <div
        onClick={() => setIsEditting(true)}
        className={`${className} wrapper-box2 cursor-pointer`}
      >
        منصوب به: {assignee?.fullName ?? `تیم ${assignee?.name}` ?? ""}
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

              <div className={`py-1 ${styles["assignees"]}`}>
                {workspaceUsers.data
                  .filter((user) => user.isFiltered)
                  .map((user) => (
                    <div
                      className={`text-subtitle-3 p-1 d-flex justify-between no-wrap 
                      ${styles["assignee-user"]}
                      ${assignee.id === user.id ? styles["checked"] : ""}`}
                      key={user.id}
                    >
                      <div
                        onClick={() => {
                          handleassigneeChange({
                            id: user.id,
                            fullName: user.fullName,
                          });
                          setIsEditting(false);
                        }}
                      >
                        {user.fullName} ({user.email})
                      </div>
                      {assignee.id === user.id && <CheckIcon />}
                    </div>
                  ))}

                {/* {workspaceTeams.data
                  .filter((team) => team.isFiltered)
                  .map((team) => (
                    <div
                      className={`text-subtitle-3 p-1 d-flex justify-between no-wrap 
                        ${styles["assignee-team"]}
                        ${assignee.id === team.id ? styles["checked"] : ""}`}
                      key={team.id}
                    >
                      <div
                        onClick={() => {
                          handleassigneeChange({
                            id: team.id,
                            name: team.name,
                          });
                          setIsEditting(false);
                        }}
                      >
                        تیم: {team.name}
                      </div>
                      {assignee.id === team.id && <CheckIcon />}
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
