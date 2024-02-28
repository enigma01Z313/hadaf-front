import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function OkrTo({
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
          label="به"
          variant="standard"
          placeholder=""
          inputProps={{ className: "text-h6 py-0-5" }}
          onChange={(e) => changeHandler("to", e.target.value)}
          value={value}
          onBlur={() => saveCurrentOkr()}
        />
      </FormControl>
    </div>
  );
}
