import React, { useEffect } from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function Assignee({ changeHandlred, workspaceUsers, value }) {
  useEffect(() => {
    if (value === "" && workspaceUsers?.[0]?.id)
      changeHandlred("assignee", workspaceUsers?.[0]?.id);
  }, [workspaceUsers]);

  const label = "منصوب به";

  return (
    <div className="ml-2 grow-1">
      <FormControl
        id="okr-owner-select-wrap"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <InputLabel id="okr-owner-select-label">{label}</InputLabel>
        <Select
          labelId="okr-owner-select-label"
          id="okr-owner-select"
          value={value}
          onChange={(e) => changeHandlred("assignee", e.target.value)}
          className="text-h6 py-1">
          {workspaceUsers &&
            workspaceUsers?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.fullName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
