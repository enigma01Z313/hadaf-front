import React, { useContext, useEffect, useState } from "react";

import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ContainedInheritText from "@/app/components/Button/ContainedInheritText";
import workspaceContext from "@/app/context/workspaceContext";
import getUsersList from "@/app/lib/users/list";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Header({
  viewMode,
  setViewMode,
  filteredUser,
  setFilteredUser,
}) {
  const { theWorkspace, theUsers, setTheUsers } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      if (theUsers.total === 0) {
        const users = await getUsersList(theWorkspace);

        setTheUsers(users);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFilteredUser(e.target.value)
  };

  return (
    <div className="d-flex justify-between align-center mb-1">
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl variant="standard" fullWidth>
            <Select
              id="select-user"
              value={filteredUser}
              label="User"
              onChange={handleChange}>
              <MenuItem key="all" value="all">
                همه
              </MenuItem>
              {theUsers?.data?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="d-flex align-center" style={{ marginRight: "auto" }}>
        <span className="ml-1">حالت نمایش</span>
        <ContainedInheritText
          className={`ml-1 p-1`}
          active={viewMode === "column"}
          onClick={() => setViewMode("column")}>
          <ViewColumnIcon />
        </ContainedInheritText>
        <ContainedInheritText
          className={`p-1`}
          active={viewMode === "row"}
          onClick={() => setViewMode("row")}>
          <TableRowsIcon />
        </ContainedInheritText>
      </div>
    </div>
  );
}
