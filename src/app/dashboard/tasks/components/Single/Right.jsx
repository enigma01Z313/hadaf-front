import { TextField } from "@mui/material";
import React from "react";

export default function Right({ description, handleDescriptionChange }) {
  return (
    <aside className="grow-1 pl-2">
      <div className="w-100">
        <TextField
          className="w-100"
          multiline
          inputProps={{ className: "w-100" }}
          placeholder="توصیحات..."
          rows={4}
          value={description??""}
          onChange={handleDescriptionChange}
        />
      </div>
    </aside>
  );
}
