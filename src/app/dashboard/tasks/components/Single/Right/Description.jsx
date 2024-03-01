import React from "react";
import { TextField, FormControl } from "@mui/material";

export default function Description({ description, handleDescriptionChange }) {
  return (
    <div className="w-100">
      <FormControl className="rtl-input p-relative grow-1 ml-2 w-100">
        <TextField
          className="w-100"
          multiline
          inputProps={{ className: "w-100" }}
          label="توضیحات"
          placeholder="توصیحات..."
          rows={5}
          value={description ?? ""}
          onChange={handleDescriptionChange}
          variant="standard"
        />
      </FormControl>
    </div>
  );
}
