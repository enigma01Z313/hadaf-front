import React from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function Direction({
  value,
  changeHandlred,
  directionsList,
  checkThreshHoldsError,
}) {
  return (
    <FormControl
      id="kpi-wrap-direction"
      fullWidth
      variant="standard"
      className="rtl-input p-relative grow-1 d-none">
      <InputLabel id="okr-direction-select-label">جهت</InputLabel>
      <Select
        labelId="okr-status-select-label"
        id="ork-direction"
        value={value}
        label=""
        onChange={(e) => {
          changeHandlred("direction", { code: +e.target.value });
          checkThreshHoldsError(+e.target.value);
        }}
        className="text-h6 py-1">
        {directionsList.map((direction) => (
          <MenuItem key={direction.code} value={direction.code}>
            {direction.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
