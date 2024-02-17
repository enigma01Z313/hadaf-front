import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function Title({ value, changeHandlred, saveCurrentOkr }) {
  return (
    <div className="ml-2 grow-1">
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="okr-title"
          label="عنوان"
          variant="standard"
          placeholder="عنوان..."
          inputProps={{ className: "text-h6 py-0-5" }}
          onChange={(e) => changeHandlred("title", e.target.value)}
          value={value}
          onBlur={saveCurrentOkr}
        />
      </FormControl>
    </div>
  );
}
