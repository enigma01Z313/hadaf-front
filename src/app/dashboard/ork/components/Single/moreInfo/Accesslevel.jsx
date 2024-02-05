import React from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function Accesslevel({ value, changeHandlred }) {
  const accessList = JSON.parse(localStorage.getItem("meta")).access;

  const label = "سطح دسترسی";

  return (
    <div className="grow-1">
      <FormControl
        id="okr-wrap-access-level"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <InputLabel id="okr-access-level-select-label">{label}</InputLabel>
        <Select
          id="ork-stataus"
          value={value}
          onChange={(e) => changeHandlred("access", e.target.value)}
          className="text-h6 py-1">
          {accessList.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
