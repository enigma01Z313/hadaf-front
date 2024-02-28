import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox, FormControlLabel } from "@mui/material";

import workspaceContext from "@/app/context/workspaceContext";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import getUsersList from "@/app/lib/users/list";
import listColumns from "./listColumns";

import permissionChec from "@/app/utils/permissionCheck";

export default function ListTable({ setMode, reloadList }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(false);

  const { theWorkspace, theUsers, setTheUsers } = useContext(workspaceContext);
  const columns = listColumns();

  useEffect(() => {
    (async function () {
      let usersList;

      // if (theUsers.total === 0) {
      setLoading(true);
      usersList = theWorkspace
        ? await getUsersList(theWorkspace, allUsers)
        : [];
      setTheUsers(usersList);
      // } else usersList = theUsers;

      setLoading(false);
      setUsers(usersList.data);
    })();
    // }, []);
  }, [reloadList, theWorkspace, allUsers]);

  const isSuperAdmin = permissionChec("SUPER_USER");
  const isAdmin = permissionChec("ADMIN");

  return (
    <div
      className={`p-2 wrapper-box
      ${loading ? "loading" : ""}`}>
      <div className="d-flex justify-between align-center mb-2">
        <div className="d-flex align-center">
          <h3 className="">لیست کاربران</h3>

          {(isAdmin || isSuperAdmin) && (
            <FormControlLabel
              className="mr-2"
              onClick={() => setAllUsers((state) => !state)}
              control={<Checkbox checked={allUsers} />}
              label="نمایش همه کاربران"
            />
          )}
        </div>

        <div>
          {(isSuperAdmin || isAdmin) && (
            <TexedPrimary
              className="ml-2"
              onClick={() => setMode("addUserToWS")}
              addUserToWorkspace={true}>
              افزودن کاربر به فضای کاری
            </TexedPrimary>
          )}

          <ContainedPrimary
            onClick={() =>
              setMode(isSuperAdmin || isAdmin ? "create" : "addUserToWS")
            }>
            افزودن کاربر جدید
          </ContainedPrimary>
        </div>
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
