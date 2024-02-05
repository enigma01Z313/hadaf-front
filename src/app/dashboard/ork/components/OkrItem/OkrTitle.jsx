import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function OkrTitle({
  value,
  className,
  changeHandler,
  saveCurrentOkr,
}) {
  return (
    <div className={className}>
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="okr-title"
          label="عنوان"
          variant="standard"
          placeholder=""
          inputProps={{ className: "text-h6 py-0-5" }}
          onChange={(e) => changeHandler("title", e.target.value)}
          value={value}
          onBlur={() => saveCurrentOkr()}
        />
      </FormControl>
    </div>
  );
}
