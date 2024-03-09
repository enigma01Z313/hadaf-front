import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import listColumns from "./listColumns";

import getPlans from "@/app/lib/plan/list";
import updatePlan from "@/app/lib/plan/update";

export default function ListTable({
  setSinglePlan,
  reloadList,
  setReloadList,
  plans,
  setPlans,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const plansList = await getPlans();
      setPlans(plansList);
      setLoading(false);
    })();
  }, [reloadList]);

  const handleActivate = async (id) => {
    await updatePlan(id, { salable: 1 });
    setReloadList((state) => !state);
  };

  const handleDeactivate = async (id) => {
    await updatePlan(id, { salable: 0 });
    setReloadList((state) => !state);
  };

  const columns = listColumns(setSinglePlan, handleActivate, handleDeactivate);

  return (
    <div
      className={`p-2 wrapper-box
      ${loading ? "loading" : ""}`}
    >
      <div className="d-flex justify-between align-center mb-2">
        <h3 className="">لیست پلن ها</h3>
        <ContainedPrimary onClick={() => setSinglePlan("create")}>
          افزودن پلن
        </ContainedPrimary>
      </div>
      {(loading && "در حال بارگذاری") ||
        (plans?.length === 0 && "چیزی برای نمایش وجود ندارد") || (
          <DataGrid
            rows={plans.filter(
              (item) => item.name !== "رایگان" && item.name !== "سازمانی"
            )}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )}
    </div>
  );
}
