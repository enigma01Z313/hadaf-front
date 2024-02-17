import React from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function Calculation({
  value,
  changeHandlred,
  calculationMethods,
}) {
  return (
    <FormControl
      id="kpi-wrap-calculationMethod"
      fullWidth
      variant="standard"
      className="rtl-input p-relative grow-1">
      <InputLabel id="okr-calculationMethod-select-label">نحوه محاسبه</InputLabel>
      <Select
        labelId="okr-status-select-label"
        id="ork-calculationMethod"
        value={value}
        label=""
        onChange={(e) => {
          changeHandlred("calculationMethod", { code: +e.target.value });
        }}
        className="text-h6 py-1">
        {calculationMethods.map((calculationMethod) => (
          <MenuItem key={calculationMethod.code} value={calculationMethod.code}>
            {calculationMethod.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
