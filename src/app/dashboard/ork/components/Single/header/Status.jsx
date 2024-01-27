import React from 'react'

import { FormControl, Select, MenuItem } from "@mui/material";

export default function Status({okrStatuses, value}) {
  return (
    <div className="ml-2 grow-1">
      <FormControl
        id="okr-wrap-stataus"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <Select
          id="ork-stataus"
          value={value}
          label=""
          // onChange={handleChange}
          className="text-h6 py-1">
          {okrStatuses.map((okrStatus) => (
            <MenuItem key={okrStatus.code} value={okrStatus.code}>
              {okrStatus.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
