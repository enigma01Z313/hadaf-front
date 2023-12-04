import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import getUsersList from "@/app/lib/users/list";
import getWorkspacesList from "@/app/lib/workspaces/list";

import listColumns from "./listColumns";

export default function ListTable() {
  const columns = listColumns();

  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    (async function () {
      const workspacesList = await getWorkspacesList();

      setWorkspaces(workspacesList);
    })();
  }, []);

  console.log(workspaces);

  return (
    <div className="p-2 wrapper-box">
      <div className="d-flex justify-between align-center mb-2">
        <h3 className="">لیست فضاهای کاری</h3>
        <Link href="/dashboard/workspaces/create">
        <ContainedPrimary>
          افزودن فضای کاری جدید
        </ContainedPrimary>
        </Link>
      </div>
      <DataGrid
        rows={workspaces}
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
