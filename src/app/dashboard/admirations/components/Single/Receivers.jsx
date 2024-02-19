import React, { useState, useEffect } from "react";

import { FormControl, Select, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Receivers({
  workspaceUsers,
  values,
  changeHandlred,
}) {
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
    changeHandlred("receivers", personName);
  }, [personName]);

  return (
    <div className="grow-1 w-100 mt-2">
      <FormControl className="rtl-input w-100" variant="standard">
        <InputLabel id="admiration-colleaguesaaaa-label">{"به"}</InputLabel>
        <Select
          labelId="admiration-colleaguesaaaa-label"
          id="admiration-colleaguesaaaa"
          className=" "
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input className="w-100" label={"به"} />}
          renderValue={(selected) => {
            return selected
              .map((i) => workspaceUsers.find((v) => v.id === i).fullName)
              .join(", ");
          }}
          MenuProps={MenuProps}>
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
