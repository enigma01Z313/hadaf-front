import React from "react";

import { FormControl, TextField } from "@mui/material";

export default function TargetValue({ value, changeHandlred }) {
  return (
    <FormControl className="rtl-input p-relative grow-1 w-100">
      <TextField
        id="okr-title"
        label="مقدار هدف"
        variant="standard"
        placeholder="مقدار هدف"
        inputProps={{ className: "text-h6", style: { paddingTop: "6px", paddingBottom: "6px" } }}
        onChange={(e) => changeHandlred("targetValue", +e.target.value.replace(/\D/g, ""))}
        value={value}
        rows={2}
      />
    </FormControl>
  );
}
