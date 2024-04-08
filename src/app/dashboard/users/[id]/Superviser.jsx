import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./page.module.css";

import getUsersSup from "@/app/lib/trainees/supervisors";

export default function Superviser({ superviser, setSupervser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const curSupervsorRef = useRef();
  const supervsorRef = useRef();

  useEffect(() => {
    (async function () {
      const usersList = await getUsersSup();

      setUsers(usersList);
    })();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const changeHandler = (user) => {
    setSupervser({ id: user.id, fullName: user.fullName });
    supervsorRef.current.blur();
    setSearch("");
  };

  const curSupervisor =
    superviser?.id && users?.data?.find?.((item) => item.id === superviser.id);

  return (
    <section className="mt-5 w-50 ">
      <div className="p-relative">
        <div
          className={styles["cur-value"]}
          ref={curSupervsorRef}
          onClick={() => {
            curSupervsorRef.current.classList.add("d-none");
            supervsorRef.current.focus();
          }}
        >
          {`${curSupervisor?.fullName} (${curSupervisor?.email})`}
        </div>

        <TextField
          inputRef={supervsorRef}
          className="w-100"
          variant="standard"
          placeholder="جستجو اعضا..."
          onChange={handleSearch}
          inputProps={{ className: "text-subtitle-3" }}
          onBlur={() => {
            curSupervsorRef.current.classList.remove("d-none");
          }}
          value={search}
        />
      </div>

      <div
        className={`py-1 ${styles["value-users"]}`}
        style={{ maxHeight: "200px", overflowY: "scroll" }}
      >
        {users.data
          ?.filter(
            (item) =>
              search.length >= 3 &&
              [item.fullName.toLowerCase(), item.email, item.phone].some(
                (item2) => item2.includes(search.toLowerCase())
              )
          )
          .map((user) => (
            <div
              className={`text-subtitle-3 p-1 d-flex justify-between no-wrap 
                ${styles["value-user"]}
                ${/*value.id === user.id ? styles["checked"] : ""*/ ""}
                `}
              key={user.id}
            >
              <div
                onClick={() => {
                  changeHandler(user);
                  //   setIsEditting(false);
                }}
              >
                {user.fullName} ({user.email})
              </div>
              {/* {superviser?.id === user.id && <CheckIcon />} */}
            </div>
          ))}
      </div>
    </section>
  );
}
