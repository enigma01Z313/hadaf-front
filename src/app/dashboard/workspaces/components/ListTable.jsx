import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import getWorkspacesList from "@/app/lib/workspaces/list";
import AddIcon from "@mui/icons-material/Add";
import Cards from "@/app/components/Cards";

import listColumns from "./listColumns";

export default function ListTable({ setMode, reloadList }) {
  const columns = listColumns();

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const workspacesList = await getWorkspacesList();

      setLoading(false);
      setWorkspaces(workspacesList.data);
    })();
  }, [reloadList]);

  return (
    <div
      className={`p-2 wrapper-box
      ${loading ? "loading" : ""}`}
    >
      <div className="d-flex justify-between align-center mb-2">
        <h3 className="">لیست فضاهای کاری</h3>
        <ContainedPrimary
          className={"p-xs-0-5"}
          onClick={() => setMode("create")}
        >
          <AddIcon className="d-none d-xs-block" />

          <span className="d-xs-none">افزودن فضای کاری</span>
        </ContainedPrimary>
      </div>
      {(window.innerWidth >= 750 && (
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
      )) || <Cards rows={workspaces} columns={columns} targetW={750} />}
    </div>
  );
}
