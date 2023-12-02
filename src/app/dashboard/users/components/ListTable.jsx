import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

import ContainedInfo from "@/app/components/Button/ContainedInfo";
import getUsersList from "@/app/lib/users/list";

import listColumns from "./listColumns";

export default function ListTable({setCreateMode}) {
  const columns = listColumns();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function () {
      const usersList = await getUsersList();

      setUsers(usersList);
    })();
  }, []);

  return (
    <div className="p-2 wrapper-box">
      <div className="d-flex justify-between align-center mb-2">
        <h3 className="">لیست کاربران</h3>
        <Link href="/dashboard/users/create">
        <ContainedInfo>
          افزودن کاربر جدید
        </ContainedInfo>
        </Link>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
