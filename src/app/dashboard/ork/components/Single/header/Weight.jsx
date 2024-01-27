import React from 'react'

import { FormControl, TextField } from "@mui/material";

export default function Weight({value}) {
  return (
    <div>
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="okr-weight"
          label="وزن"
          variant="standard"
          placeholder="وزن..."
          inputProps={{ className: "text-h6 py-0-5" }}
          //   onChange={(e) => handleChange("title", e.target.value)}
          value={value}
        />
      </FormControl>
    </div>
  )
}
