import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox, FormControlLabel } from "@mui/material";

import workspaceContext from "@/app/context/workspaceContext";
import AddIcon from "@mui/icons-material/Add";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import listColumns from "./listColumns";
import permissionChec from "@/app/utils/permissionCheck";
import Cards from "@/app/components/Cards";

import getUsersList from "@/app/lib/users/list";
import updateUser from "@/app/lib/workspaces/users/update";

export default function ListTable({
  setMode,
  reloadList,
  setSingleUserId,
  setRealoadList,
}) {
  const theUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(false);

  const isSuperAdmin = permissionChec("SUPER_USER");
  const isAdmin = permissionChec("ADMIN");
  const adminAccess = isSuperAdmin || isAdmin;

  const { theWorkspace, theWorkspaceFull, theUsers, setTheUsers } =
    useContext(workspaceContext);

  const isOwner = theWorkspaceFull?.owner?.id === theUser.id;

  const handleActivate = async (id) => {
    await updateUser(theWorkspace, id, { status: 1 });
    setRealoadList((state) => !state);
  };

  const handleDeactivate = async (id) => {
    await updateUser(theWorkspace, id, { status: 0 });
    setRealoadList((state) => !state);
  };

  const columns = listColumns(
    setSingleUserId,
    adminAccess,
    handleActivate,
    handleDeactivate,
    isOwner
  );

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

  return (
    <div
      className={`p-2 wrapper-box
      ${loading ? "loading" : ""}`}
    >
      <div className="d-flex justify-between align-center mb-2">
        <div className="d-flex align-center">
          <h3 className="">لیست کاربران</h3>

          {(isAdmin || isSuperAdmin) && (
            <>
              <FormControlLabel
                className="mr-2 d-xs-none"
                onClick={() => setAllUsers((state) => !state)}
                control={<Checkbox checked={allUsers} />}
                label="نمایش همه کاربران"
              />

              <FormControlLabel
                className="mr-2 d-none d-xs-block d-xxxxs-none"
                onClick={() => setAllUsers((state) => !state)}
                control={<Checkbox checked={allUsers} />}
                label="همه"
              />

              <FormControlLabel
                className="mr-2 d-none d-xxxxs-block"
                onClick={() => setAllUsers((state) => !state)}
                control={<Checkbox checked={allUsers} />}
                label=""
              />
            </>
          )}
        </div>

        <div className="d-flex align-center">
          {(isSuperAdmin || isAdmin) && (
            <TexedPrimary
              className="ml-2 p-xs-0-5"
              onClick={() => setMode("addUserToWS")}
              addUserToWorkspace={true}
            >
              <AddIcon className="d-none d-xs-block" />

              <span className="d-xs-none">افزودن کاربر به فضای کاری</span>
            </TexedPrimary>
          )}

          <ContainedPrimary
            className={"p-xs-0-5"}
            onClick={() =>
              setMode(isSuperAdmin || isAdmin ? "create" : "addUserToWS")
            }
          >
            <AddIcon className="d-none d-xs-block" />

            <span className="d-xs-none">افزودن کاربر جدید</span>
          </ContainedPrimary>
        </div>
      </div>

      {users &&
        ((window.innerWidth >= 1250 && (
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
        )) || <Cards rows={users} columns={columns} targetW={1250} />)}
    </div>
  );
}
