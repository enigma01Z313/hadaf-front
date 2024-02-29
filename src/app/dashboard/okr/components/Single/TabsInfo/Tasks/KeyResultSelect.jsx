import React, { useEffect } from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function KeyResultSelect({ changeHandlred, keyResults, value }) {
//   useEffect(() => {
//     if (value === "" && keyResults?.[0]?.id)
//       changeHandlred("keyResult", keyResults?.[0]?.id);
//   }, [keyResults]);

  const label = "نتیجه کلیدی";

  return (
    <div className="mx-2 grow-1" style={{width: '250px'}}>
      <FormControl
        id="okr-owner-select-wrap"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <InputLabel id="okr-owner-select-label">{label}</InputLabel>
        <Select
          labelId="okr-owner-select-label"
          id="okr-owner-select"
          value={value}
          onChange={(e) => changeHandlred("assignee", e.target.value)}
          className="text-h6 py-1">
          {keyResults &&
            keyResults?.map((keyResult) => (
              <MenuItem key={keyResult.id} value={keyResult.id}>
                {keyResult.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
