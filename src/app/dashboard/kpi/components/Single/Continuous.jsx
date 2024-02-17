import React from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function Continuous({ value, changeHandlred, continuousList }) {
  return (
    <FormControl
      id="kpi-wrap-continuous"
      fullWidth
      variant="standard"
      className="rtl-input p-relative grow-1 ml-2">
      <InputLabel id="okr-continuous-select-label">تواتر</InputLabel>
      <Select
        labelId="okr-continuous-select-label"
        id="ork-continuous"
        value={value}
        label=""
        onChange={(e) =>
          changeHandlred("continuous", { code: +e.target.value })
        }
        className="text-h6 py-1">
        {continuousList.map((continuousItem) => (
          <MenuItem key={continuousItem.code} value={continuousItem.code}>
            {continuousItem.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
