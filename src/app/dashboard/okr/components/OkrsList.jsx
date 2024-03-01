import React, { useEffect, useContext, useState } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import getOkrsList from "@/app/lib/okr/list";
import OkrItem from "./OkrItem";

import deleteOkr from "@/app/lib/okr/delete";
import styles from "./style.module.css";

export default function OkrsList({
  searchTerm,
  setSingleOkr,
  saveCurrentOkr,
  reloadList,
  activeTimeframe,
  filteredUser,
  filteredMeMode,
}) {
  const theUser = JSON.parse(localStorage.getItem("user"));

  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theWorkspace, setTheWorkspaceOkrs } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const okrsList =
        theWorkspace && activeTimeframe
          ? await getOkrsList(theWorkspace, activeTimeframe, filteredUser)
          : [];

      setOkrs(okrsList);
      setTheWorkspaceOkrs(okrsList);
      setLoading(false);
    })();
  }, [theWorkspace, activeTimeframe, reloadList, filteredUser]);

  const deleteOkrHandler = async (id) => {
    setLoading(true);
    await deleteOkr(theWorkspace, id);
    setOkrs((okrs) => {
      const filteredOkrs = okrs.data.filter((item) => item.id !== id);
      const newOkrs = {
        data: filteredOkrs,
        total: okrs.total - 1,
      };

      return newOkrs;
    });
    setLoading(false);
  };

  return (
    <div
      className={`${styles["okr-list-wrapper"]} ${loading ? "loading" : ""}`}
    >
      <ul>
        {okrs?.data
          ?.filter((okr) => {
            if (searchTerm === "" && !filteredMeMode) return true;

            if (filteredMeMode) {
              const tmpArr = [okr.assignee.id];
              tmpArr.push(...okr.colleagues.map((item) => item.id));
              tmpArr.push(...okr.keyResults.map((item) => item.owner?.id));

              return (
                okr.title
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()) &&
                tmpArr.includes(theUser.id)
              );
            } else
              return okr.title
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase());
          })
          .map((okr, i) => (
            <OkrItem
              key={okr.id}
              className={`p-2 radius-1 ${i !== 0 ? "mt-1" : ""}`}
              okr={okr}
              setSingleOkr={setSingleOkr}
              theWorkspace={theWorkspace}
              deleteOkr={deleteOkrHandler}
              saveCurrentOkr={saveCurrentOkr}
            />
          ))}
      </ul>
    </div>
  );
}
