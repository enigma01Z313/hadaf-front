import React, { useState, useEffect } from "react";

import { FormControl, Select, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export default function Tags({ workspaceTags, values, changeHandlred }) {
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
    changeHandlred("tags", personName);
  }, [personName]);

  return (
    <div className="grow-1 w-100 mt-2">
      <FormControl className="rtl-input w-100" variant="standard">
        <InputLabel id="kpi-colleaguesaaaa-label">{"برچسب ها"}</InputLabel>
        <Select
          labelId="kpi-colleaguesaaaa-label"
          id="kpi-colleaguesaaaa"
          className=" "
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input className="w-100" label={"برچسب ها"} />}
          renderValue={(selected) => {
            return selected
              .map((i) => workspaceTags?.find((v) => v.id === i)?.name)
              .join(", ");
          }}>
          {workspaceTags.map((tag, i) => (
            <MenuItem key={tag.id} value={tag.id}>
              <Checkbox checked={personName.indexOf(tag.id) > -1} />
              <ListItemText primary={tag.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
