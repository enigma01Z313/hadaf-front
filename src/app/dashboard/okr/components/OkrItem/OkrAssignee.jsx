import React, { useContext, useEffect } from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

import workspaceContext from "@/app/context/workspaceContext";
import getUsersList from "@/app/lib/users/list";
import getTeams from "@/app/lib/workspaces/team/list";

export default function OkrAssignee({
  value,
  className,
  changeHandler,
  saveCurrentOkr,
}) {
  const { theUsers, setTheUsers, theTeams, setTheTeams, theWorkspace } =
    useContext(workspaceContext);

  useEffect(() => {
    if ((theUsers?.data?.length ?? 0) === 0) {
      (async function () {
        const users = await getUsersList(theWorkspace);
        const teamsList = await getTeams(theWorkspace);

        setTheUsers(users);
        setTheTeams(teamsList);
      })();
    }
  }, []);

  const handleChange = (e) => {
    changeHandler("assignee", { id: e.target.value });
    saveCurrentOkr({ assignee: e.target.value });
  };

  return (
    <div className={className} style={{ maxWidth: "180px" }}>
      <FormControl
        id="okr-owner-select-wrap"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100"
      >
        <InputLabel id="okr-owner-select-label">منصوب به</InputLabel>
        <Select
          labelId="okr-owner-select-label"
          id="okr-owner-select"
          value={value}
          onChange={handleChange}
          className="text-h6 py-1"
        >
          {theUsers &&
            theUsers?.data?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.fullName}
              </MenuItem>
            ))}
          {theTeams &&
            theTeams?.data?.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                تیم: {team.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
