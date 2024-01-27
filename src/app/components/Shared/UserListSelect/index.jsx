import React, { useState, useEffect, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Devider from "@/app/components/Devider";
import TexedInherit from "@/app/components/Button/TexedInherit";
import workspaceContext from "@/app/context/workspaceContext";
import getUsersList from "@/app/lib/users/list";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./style.module.css";

export default function UsersListSelect({ value, className, changeHandler }) {
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

  //   const handleSearch = (e) => {
  //     const val = e.target.value;
  //     const newUsers = workspaceUsers.data.map((user) => ({
  //       ...user,
  //       isFiltered:
  //         val === "" ||
  //         (val !== "" &&
  //           (user.fullName.includes(val) || user.email.includes(val))),
  //     }));

  //     setWorkspaceUsers((state) => ({ ...state, data: newUsers }));
  //   };

  return (
    <div className={styles["task-config"]}>



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
                // onChange={handleSearch}
                inputProps={{ className: "text-subtitle-3" }}
              />

              <div className={`py-1 ${styles["value-users"]}`}>
                {workspaceUsers.data
                  .filter((user) => user.isFiltered)
                  .map((user) => (
                    <div
                      className={`text-subtitle-3 p-1 d-flex justify-between no-wrap 
                      ${styles["value-user"]}
                      ${value.id === user.id ? styles["checked"] : ""}`}
                      key={user.id}>
                      <div
                        onClick={() => {
                          changeHandler({
                            id: user.id,
                            fullName: user.fullName,
                          });
                          setIsEditting(false);
                        }}>
                        {user.fullName} ({user.email})
                      </div>
                      {value.id === user.id && <CheckIcon />}
                    </div>
                  ))}
              </div>
            </section>
          </article>
    </div>
  );
}
