import React from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function OkrStatus({
  value,
  className,
  changeHandler,
  saveCurrentOkr,
}) {
  const handleChange = (e) => {
    changeHandler("status", { code: +e.target.value });
    saveCurrentOkr({ status: +e.target.value });
  };

  const okrStatuses = JSON.parse(localStorage.getItem("meta")).okrStatus;

  return (
    <div className={className} style={{ maxWidth: "180px" }}>
      <FormControl
        id="okr-wrap-stataus"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <InputLabel id="okr-status-select-label">وضعیت</InputLabel>
        <Select
          labelId="okr-status-select-label"
          id="ork-stataus"
          value={value}
          onChange={handleChange}
          className="text-h6 py-1">
          {okrStatuses.map((okrStatus) => (
            <MenuItem key={okrStatus.code} value={okrStatus.code}>
              {okrStatus.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
