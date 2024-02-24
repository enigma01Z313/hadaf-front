import React, { useState, useEffect } from "react";

import { FormControl, Select, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export default function Receivers({ workspaceUsers, values, changeHandlred }) {
  const [personName, setPersonName] = useState(values ?? []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const personNames = typeof value === "string" ? value.split(",") : value;

    setPersonName(personNames);
  };

  useEffect(() => {
    setPersonName(values);
  }, [values]);

  useEffect(() => {
    changeHandlred("colleagues", personName);
  }, [personName]);

  return (
    <div className="grow-1 w-100 mt-2">
      <FormControl className="rtl-input w-100" variant="standard">
        <InputLabel id="kpi-colleaguesaaaa-label">{"همکاران"}</InputLabel>
        <Select
          labelId="kpi-colleaguesaaaa-label"
          id="kpi-colleaguesaaaa"
          className=" "
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input className="w-100" label={"همکاران"} />}
          renderValue={(selected) => {
              return selected
                .map((i) => workspaceUsers?.find((v) => v.id === i).fullName)
                .join(", ");
          }}>
          {workspaceUsers.map((user, i) => (
            <MenuItem key={user.id} value={user.id}>
              <Checkbox checked={personName.indexOf(user.id) > -1} />
              <ListItemText primary={user.fullName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
