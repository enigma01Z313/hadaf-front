import React from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function Assignee({ value, changeHandlred, theUsers }) {
  return (
    <FormControl
      id="kpi-wrap-assignee"
      fullWidth
      variant="standard"
      className="rtl-input p-relative grow-1 w-100">
      <InputLabel id="kpi-assignee-select-label">منصوب به</InputLabel>
      <Select
        labelId="kpi-status-select-label"
        id="kpi-assignee"
        value={value}
        label=""
        onChange={(e) => changeHandlred("assignee", { id: e.target.value })}
        className="text-h6 py-1">
        {theUsers.data?.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.fullName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
