import React, { useContext, useEffect } from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import workspaceContext from "@/app/context/workspaceContext";

export default function UsersSelector({ id, label, value, changeHandlre }) {
  const { theUsers } = useContext(workspaceContext);

  useEffect(() => {
    if (value === "" && theUsers?.[0]?.id) changeHandlre(theUsers?.[0]?.id);
  }, [theUsers]);

  return (
    <FormControl
      id={id}
      variant="standard"
      className="rtl-input p-relative grow-1 ml-1-5"
      style={{width: '110px'}}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="okr-owner-select-label"
        id={`okr-owner-select-${id}`}
        value={value?.id ?? value ?? theUsers?.data?.[0]?.id ?? ""}
        label={label}
        onChange={changeHandlre}
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
