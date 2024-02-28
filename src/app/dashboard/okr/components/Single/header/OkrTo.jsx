import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function OkrTo({ value, changeHandlred }) {
  return (
    <div className="ml-2">
      <FormControl
        className="rtl-input p-relative grow-1"
        style={{ maxWidth: "100px" }}>
        <TextField
          style={{ width: "100px" }}
          id="okr-from"
          label="به"
          variant="standard"
          inputProps={{ className: "text-h6 py-0-5" }}
          onChange={(e) => changeHandlred("to", e.target.value)}
          value={value}
        />
      </FormControl>
    </div>
  );
}
