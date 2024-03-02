import React, { useEffect, useContext, useState } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";
import workspaceContext from "@/app/context/workspaceContext";
import getKpisList from "@/app/lib/kpi/list";
import KpiItem from "./KpiItem";

import styles from "./style.module.css";
import Devider from "@/app/components/Devider";

export default function KpisList({
  searchTerm,
  setSingleKpi,
  reloadList,
  setReloadList,
  filteredUser,
  filteredMeMode,
  kpiStatus,
}) {
  const theUser = JSON.parse(localStorage.getItem("user"));

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openedActions, setOpenedActions] = useState("");
  const { theWorkspace } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const kpisList = theWorkspace
        ? await getKpisList(theWorkspace, filteredUser, kpiStatus)
        : [];

      setKpis(kpisList);
      setLoading(false);
    })();
  }, [theWorkspace, reloadList, filteredUser, kpiStatus]);

  return (
    <div
      className={`${styles["kpi-list-wrapper"]} ${loading ? "loading" : ""}`}
    >
      <div className="pl-3">
        <div className="d-flex align-center text-body-2">
          <div style={{ width: "50px" }} className="text-body-2">
            ردیف
          </div>
          <div className="grow-1">نام</div>
          <div style={{ width: "120px" }} className="text-center">
            دوره جاری
          </div>
          <div style={{ width: "110px" }} className="text-center">
            عملکرد هفت دوره
          </div>
          <div style={{ width: "120px" }} className="text-center">
            وضعیت به روزرسانی
          </div>
          <div style={{ width: "80px" }} className="text-center">
            روند تغییر
          </div>
          <div style={{ width: "130px" }} className="text-caption text-center">
            مقدار واقعی <br />
            (دوره قبل/دوره جاری)
          </div>
          <div style={{ width: "120px" }} className="text-center">
            منصوب به
          </div>
          <div style={{ width: "50px" }}></div>
        </div>
        <Devider spacing={1} line={true} />
      </div>
      <div>
        {(kpis.total === 0 && "هنوز kpi افزوده نشده") || (
          <ul className="ml-3">
            {kpis?.data
              ?.filter((kpi) => {
                if (searchTerm === "" && !filteredMeMode) return true;

                if (filteredMeMode) {
                  const tmpArr = [kpi.assignee.id];
                  tmpArr.push(...kpi.colleagues.map((item) => item.id));

                  return (
                    kpi.name
                      .toLocaleLowerCase()
                      .includes(searchTerm?.toLocaleLowerCase?.() ?? "") &&
                    tmpArr.includes(theUser.id)
                  );
                } else
                  return kpi.name
                    .toLocaleLowerCase()
                    .includes(searchTerm?.toLocaleLowerCase?.() ?? "");
              })
              .map((kpi, i) => (
                <React.Fragment key={kpi.id}>
                  {i !== 0 && <Devider line={true} spacing={1} />}
                  <KpiItem
                    kpi={kpi}
                    openedActions={openedActions}
                    setOpenedActions={setOpenedActions}
                    setSingleKpi={setSingleKpi}
                    setLoading={setLoading}
                    setReloadList={setReloadList}
                    setListLoading={setLoading}
                    rowNum={i + 1}
                  />
                </React.Fragment>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
