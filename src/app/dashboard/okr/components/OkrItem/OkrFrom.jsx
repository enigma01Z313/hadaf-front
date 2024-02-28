import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function OkrFrom({
  value,
  className,
  changeHandler,
  saveCurrentOkr,
}) {
  return (
    <div className={className} style={{ maxWidth: "40px" }}>
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="okr-title"
          label="از"
          variant="standard"
          placeholder=""
          inputProps={{ className: "text-h6 py-0-5" }}
          onChange={(e) => changeHandler("from", e.target.value)}
          value={value}
          onBlur={() => saveCurrentOkr()}
        />
      </FormControl>
    </div>
  );
}
