import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function Title({ value, changeHandlred }) {
  return (
    <FormControl className="rtl-input p-relative w-100 mb-2">
      <TextField
        id="okr-title"
        label="عنوان"
        variant="standard"
        placeholder="عنوان..."
        inputProps={{ className: "text-h6 py-0-5" }}
        onChange={(e) => changeHandlred("name", e.target.value)}
        value={value}
        rows={2}
      />
    </FormControl>
  );
}
