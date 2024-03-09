import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import getWorkspacesList from "@/app/lib/workspaces/list";

import workspaceContext from "@/app/context/workspaceContext";

export default function UserWorkspaces() {
  const {
    theWorkspace,
    setTheWorkspace,
    setTheWorkspaceFull,
    userWorkspaces,
    setUserWorkspaces,
  } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const workspacesList = await getWorkspacesList();

      setUserWorkspaces(
        workspacesList.data.map((v, i) => ({ ...v, isActive: i === 0 }))
      );
      setTheWorkspace(workspacesList.data[0].id);
      setTheWorkspaceFull(workspacesList.data[0]);
    })();
  }, []);

  const handleChange = (event) => {
    setTheWorkspace(event.target.value);
  };

  return (
    <div className="ml-2">
      <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" fullWidth>
          <Select
            id="select-workspace"
            value={theWorkspace ?? ""}
            label="Age"
            onChange={handleChange}
          >
            {userWorkspaces.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
