import React, { useContext } from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import workspaceContext from "@/app/context/workspaceContext";

export default function UsersSelector({ id, label, value }) {
  const { theUsers } = useContext(workspaceContext);

  return (
    <FormControl
      id={id}
      variant="standard"
      className="rtl-input p-relative grow-1 ml-1-5">
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="okr-owner-select-label"
        id={`okr-owner-select-${id}`}
        value={value ?? theUsers?.data?.[0]?.id ?? ""}
        label={label}
        // onChange={handleChange}
        className="text-h6 py-1">
        {theUsers?.data &&
          theUsers?.data?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
