import React from "react";

import { FormControl, Select, MenuItem } from "@mui/material";

export default function Accesslevel({ value, changeHandlred }) {
  const accessList = JSON.parse(localStorage.getItem("meta")).access;

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
