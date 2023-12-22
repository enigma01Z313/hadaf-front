import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import getUsersList from "@/app/lib/users/list";

import listColumns from "./listColumns";

export default function ListTable({ setMode, reloadList }) {
  const columns = listColumns();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const usersList = await getUsersList();

      setLoading(false);
      setUsers(usersList);
    })();
  }, [reloadList]);

  return (
    <div
      className={`p-2 wrapper-box
      ${loading ? "loading" : ""}`}>
      <div className="d-flex justify-between align-center mb-2">
        <h3 className="">لیست کاربران</h3>
        <ContainedPrimary onClick={() => setMode("create")}>
          افزودن کاربر جدید
        </ContainedPrimary>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
