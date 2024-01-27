import React from 'react'

import { FormControl, Select, MenuItem } from "@mui/material";

export default function Assignee({workspaceUsers, value}) {
  return (
    <div className="ml-2 grow-1">
      <FormControl
        id="okr-owner-select-wrap"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <Select
          labelId="okr-owner-select-label"
          id="okr-owner-select"
          value={value}
          label="منصوب به"
          // onChange={handleChange}
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
  )
}
