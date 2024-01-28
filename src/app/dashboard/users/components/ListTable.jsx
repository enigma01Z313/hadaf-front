import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import getUsersList from "@/app/lib/users/list";
import workspaceContext from "@/app/context/workspaceContext";

import listColumns from "./listColumns";

export default function ListTable({ setMode, reloadList }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { theWorkspace, theUsers, setTheUsers } = useContext(workspaceContext);
  const columns = listColumns();

  useEffect(() => {
    (async function () {
      console.log("222222222");
      let usersList;

      // if (theUsers.total === 0) {
      usersList = theWorkspace ? await getUsersList(theWorkspace) : [];
      setTheUsers(usersList);
      // } else usersList = theUsers;

      setLoading(false);
      setUsers(usersList.data);
    })();
    // }, []);
  }, [reloadList, theWorkspace]);

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
