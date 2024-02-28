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
}) {
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theWorkspace, setTheWorkspaceOkrs } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const okrsList = theWorkspace ? await getOkrsList(theWorkspace) : [];

      setOkrs(okrsList);
      setTheWorkspaceOkrs(okrsList);
    })();
  }, [theWorkspace, reloadList]);

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
      className={`${styles["okr-list-wrapper"]} ${loading ? "loading" : ""}`}>
      <ul>
        {okrs?.data
          ?.filter((okr) =>
            okr.title
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          )
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
