import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";

import workspaceContext from "@/app/context/workspaceContext";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import getTeamUsersList from "@/app/lib/workspaces/team/list";

import listColumns from "./listColumns";

export default function ListTable({ setSingleTeam, reloadList }) {
  const columns = listColumns(setSingleTeam);

  const { theWorkspace, theTeams, setTheTeams } = useContext(workspaceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (theWorkspace) {
        const teamsList = await getTeamUsersList(theWorkspace);

        setTheTeams(teamsList);
        setLoading(false);
      }
    })();
  }, [theWorkspace, reloadList]);

  return (
    <div
      className={`p-2 wrapper-box
      ${loading ? "loading" : ""}`}
    >
      <div className="d-flex justify-between align-center mb-2">
        <h3 className="">لیست تیم ها</h3>
        <ContainedPrimary onClick={() => setSingleTeam("create")}>
          افزودن تیم
        </ContainedPrimary>
      </div>
      {(loading && "در حال بارگذاری") ||
        (theTeams.length === 0 && "چیزی برای نمایش وجود ندارد") || (
          <DataGrid
            rows={theTeams.data}
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
