import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function OkrWeight({
  value,
  className,
  changeHandler,
  saveCurrentOkr,
}) {
  return (
    <div className={className}>
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="okr-weight"
          label="وزن"
          variant="standard"
          placeholder=""
          inputProps={{ className: "text-h6 py-0-5" }}
          onChange={(e) => changeHandler("weight", e.target.value)}
          value={value}
          style={{ width: "40px" }}
          onBlur={() => saveCurrentOkr()}
        />
      </FormControl>
    </div>
  );
}
