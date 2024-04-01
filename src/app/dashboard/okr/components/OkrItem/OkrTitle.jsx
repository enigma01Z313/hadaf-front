import React from "react";

import { FormControl, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function OkrTitle({
  value,
  className,
  changeHandler,
  saveCurrentOkr,
  showKrs,
  setShowKrs,
}) {
  return (
    <div
      className={`d-flex align-center ${className} `}
      onClick={() => setShowKrs((state) => !state)}
    >
      {(!showKrs && <AddIcon className="ml-2" />) || (
        <RemoveIcon className="ml-2" />
      )}
      {value}
      {/* <FormControl className="rtl-input p-relative w-100">
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
      </FormControl> */}
    </div>
  );
}
