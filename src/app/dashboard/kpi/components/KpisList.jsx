import React, { useEffect, useContext, useState } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import getKpisList from "@/app/lib/kpi/list";
import KpiItem from "./KpiItem";

import styles from "./style.module.css";

export default function KpisList({
  searchTerm,
  setSingleKpi,
  saveCurrentOkr,
  reloadList,
}) {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openedActions, setOpenedActions] = useState("");
  const { theWorkspace } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const kpisList = theWorkspace ? await getKpisList(theWorkspace) : [];

      setKpis(kpisList);
    })();
  }, [theWorkspace, reloadList]);

  // const deleteOkrHandler = async (id) => {
  //   setLoading(true);
  //   await deleteOkr(theWorkspace, id);
  //   setOkrs((okrs) => {
  //     const filteredOkrs = okrs.data.filter((item) => item.id !== id);
  //     const newOkrs = {
  //       data: filteredOkrs,
  //       total: okrs.total - 1,
  //     };

  //     return newOkrs;
  //   });
  //   setLoading(false);
  // };

  // const updateTheOkr = (id) => {

  // }

  return (
    <div
      className={`${styles["okr-list-wrapper"]} ${loading ? "loading" : ""}`}>
      {(kpis.total === 0 && "هنوز kpi افزوده نشده") || (
        <ul>
          {kpis?.data
            ?.filter((kpi) =>
              kpi.name
                .toLocaleLowerCase()
                .includes(searchTerm?.toLocaleLowerCase?.() ?? "")
            )
            .map((kpi, i) => (
              <KpiItem
                key={kpi.id}
                kpi={kpi}
                openedActions={openedActions}
                setOpenedActions={setOpenedActions}
                setSingleKpi={setSingleKpi}
                setLoading={setLoading}
                // className={`p-2 radius-1 ${i !== 0 ? "mt-1" : ""}`}
                // theWorkspace={theWorkspace}
                // deleteOkr={deleteOkrHandler}
                // saveCurrentOkr={saveCurrentOkr}
              />
            ))}
        </ul>
      )}
    </div>
  );
}
