import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function TargetValue({ value, changeHandlred }) {
  return (
    <FormControl className="rtl-input p-relative grow-1 ml-2 w-100">
      <TextField
        id="okr-title"
        label="مقدار هدف"
        variant="standard"
        placeholder="مقدار هدف"
        inputProps={{ className: "text-h6 py-0-5" }}
        onChange={(e) => changeHandlred("targetValue", +e.target.value)}
        value={value}
        rows={2}
      />
    </FormControl>
  );
}
