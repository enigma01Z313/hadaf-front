import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function Description({ value, changeHandlred }) {
  return (
    <FormControl className="rtl-input p-relative w-100">
      <TextField
        id="okr-title"
        label="توضیحات"
        variant="standard"
        placeholder="توضیحات..."
        inputProps={{ className: "text-h6 py-0-5" }}
        onChange={(e) => changeHandlred("description", e.target.value)}
        value={value}
        multiline
      />
    </FormControl>
  );
}
