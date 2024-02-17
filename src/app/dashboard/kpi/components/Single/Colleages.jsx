import React, { useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import {
  FormControl,
  Select,
  MenuItem,
  Input,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@mui/material";

export default function Colleages({ theUsers, value }) {
  const { theWorkspace } = useContext(workspaceContext);
  const [personName, setPersonName] = useState(values ?? []);

  return (
    <div className="grow-1 w-100 mt-2">
      <FormControl className="rtl-input w-100" variant="standard">
        <InputLabel id="okr-colleagues-label">همکاران</InputLabel>
        <Select
          labelId="okr-colleagues-label"
          id="okr-colleagues"
          className=" "
          multiple
          value={personName}
          // value={'personName'}
          onChange={handleChange}
          input={<Input className="w-100" label="همکاران" />}
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
